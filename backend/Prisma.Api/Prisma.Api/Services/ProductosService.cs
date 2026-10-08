using Microsoft.EntityFrameworkCore;
using Prisma.Api.Data;
using Prisma.Api.Dtos;
using Prisma.Api.Entities;
using Prisma.Api.Exceptions;

namespace Prisma.Api.Services
{
    public class ProductosService
    {
        private readonly AppDbContext _context;

        public ProductosService(AppDbContext context)
        {
            _context = context;
        }

        //estado: "activos" (por defecto), "inactivos" o "todos"
        public async Task<List<ProductoDto>> ListarAsync(string? estado, string? buscar)
        {
            var query = _context.Productos.AsNoTracking().AsQueryable();

            query = estado?.ToLower() switch
            {
                "inactivos" => query.Where(p => !p.Activo),
                "todos" => query,
                _ => query.Where(p => p.Activo)
            };

            if (!string.IsNullOrWhiteSpace(buscar))
            {
                var texto = buscar.Trim();
                query = query.Where(p => p.Codigo.Contains(texto) || 
                 p.Descripcion.Contains(texto));
            }

            var productos = await query.OrderBy(p => p.Descripcion).ToListAsync();
            return productos.Select(ADto).ToList();
        }

        public async Task<ProductoDto?> ObtenerAsync(int id)
        {
            var producto =await _context.Productos.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            return producto is null ? null : ADto(producto);
        }

        public async Task<ProductoDto> CrearAsync(ProductoGuardarDto dto)
        {
            await ValidarCodigoUnicoAsync(dto.Codigo);
            var producto = new Producto();
            CopiarCampos(producto, dto);

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return ADto(producto);
        }

        public async Task<ProductoDto?> ActualizarAsync(int id, ProductoGuardarDto dto)
        {
            await ValidarCodigoUnicoAsync(dto.Codigo, id);
            var producto = await _context.Productos.FindAsync(id);
            if (producto is null) return null;

            CopiarCampos( producto, dto);
            await _context.SaveChangesAsync();

            return ADto( producto);
        }

        //Baja lógica (activo = false) y reactivación (activo = true)
        public async Task<bool> CambiarEstadoAsync(int id, bool activo)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto is null) return false;

            producto.Activo = activo;
            await _context.SaveChangesAsync();

            return true;
        }

        private async Task ValidarCodigoUnicoAsync(string codigo, int? idActual = null)
        {
            var codigoLimpio = codigo.Trim();

            var existe = await _context.Productos.AnyAsync(p => p.Codigo == codigoLimpio && (idActual == null || p.Id != idActual));

            if (existe) 
            {
                throw new ConflictoException($"Ya existe un producto con el código '{codigoLimpio}'.");
            }
        }

        private static void CopiarCampos(Producto producto, ProductoGuardarDto dto)
        {
            producto.Codigo = dto.Codigo.Trim();
            producto.Descripcion = dto.Descripcion;
            producto.Precio = dto.Precio;
            producto.IVA = dto.IVA;

        }

        private static ProductoDto ADto(Producto p) => new( p.Id, p.Codigo, p.Descripcion, p.Precio, p.IVA , p.Activo, p.FechaAlta);
        
    }
}
