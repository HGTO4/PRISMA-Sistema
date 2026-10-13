using Microsoft.EntityFrameworkCore;
using Prisma.Api.Constants;
using Prisma.Api.Data;
using Prisma.Api.Dtos;
using Prisma.Api.Entities;
using Prisma.Api.Exceptions;

namespace Prisma.Api.Services
{
    public class FacturasService
    {
        private readonly AppDbContext _context;

        public FacturasService(AppDbContext context)
        {
            _context = context;
        }

        // estado: "activas" (por defecto), "anuladas" o "todas"
        public async Task<List<FacturaResumenDto>> ListarAsync(string? estado, string? buscar)
        {
            var query = _context.Facturas.AsNoTracking().Include(f => f.Cliente).AsQueryable();

            query = estado?.ToLower() switch
            {
                "anuladas" => query.Where(f => !f.Activa),
                "todas" => query,
                _ => query.Where(f => f.Activa)
            };

            if (!string.IsNullOrWhiteSpace(buscar))
            {
                var texto = buscar.Trim();
                query = query.Where(f => f.Numero.Contains(texto) || f.Cliente!.Nombre.Contains(texto));
            }

            var facturas = await query
                .OrderByDescending (f => f.FechaEmision)
                .ThenByDescending(f => f.Id)
                .ToListAsync();

            return facturas
                .Select(f => new FacturaResumenDto(
                    f.Id, f.Numero, f.Cliente!.Nombre, f.FechaEmision, f.Total, f.MetodoPago, f.Activa))
                .ToList();
        }

        public async Task<FacturaDto?> ObtenerAsync(int id)
        {
            var factura = await _context.Facturas
                .AsNoTracking()
                .Include(f => f.Cliente)
                .Include(f => f.Detalles)
                .FirstOrDefaultAsync(f => f.Id == id);

            return factura is null ? null : ADto(factura);
        }

        public async Task<FacturaDto> CrearAsync(FacturaCrearDto dto)
        {
            // 1. Validar método de pago
            var metodoPago = MetodoPago.Validos.FirstOrDefault(m =>
            string.Equals(m, dto.MetodoPago.Trim(), StringComparison.OrdinalIgnoreCase));

            if(metodoPago is null)
            {
                throw new ReglaDeNegocioException($"Método de pago inválido. Opciones: {string.Join(", ", MetodoPago.Validos)}.");
            }

            //2. Validar Cliente
            var cliente = await _context.Clientes.FindAsync(dto.ClienteId);
            
            if(cliente is null)
            {
                throw new ReglaDeNegocioException("El cliente indicado no existe.");
            }

            if (!cliente.Activo)
            {
                throw new ReglaDeNegocioException("El cliente está dado de baja.");
            }

            //3. Si un producto viene repetido, se suman las cantidades
            var items = dto.Items
                .GroupBy(i => i.ProductoId)
                .Select(g => new {ProductoId = g.Key, Cantidad = g.Sum(i => i.Cantidad)})
                .ToList();

            //4. Buscar todos los productos de una sola vez
            var ids = items.Select(i => i.ProductoId).ToList();
            var productos = await _context.Productos
                .AsNoTracking()
                .Where(p => ids.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            var factura = new Factura
            {
                ClienteId = cliente.Id,
                MetodoPago = metodoPago,
                Nota = string.IsNullOrWhiteSpace(dto.Nota) ? null : dto.Nota.Trim(),
                Numero = "PENDIENTE"
            };

            //5. Armar los detalles con el precio y el IVA ACTUALES de la base
            foreach (var item in items) 
            {
                if(!productos.TryGetValue(item.ProductoId, out var producto))
                {
                    throw new ReglaDeNegocioException($"El producto {item.ProductoId} no existe.");
                }
                if (!producto.Activo)
                {
                    throw new ReglaDeNegocioException($"El producto '{producto.Descripcion}' está dado de baja.");
                }

                var subtotal = Redondear(item.Cantidad * producto.Precio);
                var importeIva = Redondear(subtotal * producto.IVA / 100m);

                factura.Detalles.Add(new DetalleFactura
                {
                    ProductoId = producto.Id,
                    Descripcion = producto.Descripcion,
                    Cantidad = item.Cantidad,
                    PrecioUnitario = producto.Precio,
                    IVA = producto.IVA,
                    Subtotal = subtotal,
                    ImporteIVA = importeIva
                });

            }

            //6. Totales
            factura.Subtotal = factura.Detalles.Sum(d => d.Subtotal);
            factura.TotalIVA = factura.Detalles.Sum(d => d.ImporteIVA);
            factura.Total = factura.Subtotal + factura.TotalIVA;


            //7. Guardar en una transaccion: se guardan los dos pasos o ninguno
            await using var transaccion = await _context.Database.BeginTransactionAsync();

            _context.Facturas.Add(factura);
            await _context.SaveChangesAsync();

            factura.Numero = factura.Id.ToString("D8");
            await _context.SaveChangesAsync();

            await transaccion.CommitAsync();

            factura.Cliente = cliente;
            return ADto(factura);
        }

        // Devuelve false si la factura no existe. Si ya estaba anulada, lanza un conflicto.
        public async Task<bool> AnularAsync(int id)
        {
            var factura = await _context.Facturas.FindAsync(id);
            if (factura is null) return false;

            if (!factura.Activa)
            {
                throw new ConflictoException($"La factura {factura.Numero} ya está anulada");
            }

            factura.Activa = false;
            await _context.SaveChangesAsync();

            return true;
        }

        private static decimal Redondear(decimal valor) => Math.Round(valor, 2, MidpointRounding.AwayFromZero);

        private static FacturaDto ADto(Factura f) => new(
            f.Id,
            f.Numero,
            f.ClienteId,
            f.Cliente?.Nombre ?? string.Empty,
            f.FechaEmision,
            f.Subtotal,
            f.TotalIVA,
            f.Total,
            f.Nota,
            f.MetodoPago,
            f.Activa,
            f.Detalles
            .Select(d => new DetalleFacturaDto(
                d.Id, d.ProductoId, d.Descripcion, d.Cantidad, d.PrecioUnitario, d.IVA, d.Subtotal, d.ImporteIVA))
            .ToList()
            );
    }
}
