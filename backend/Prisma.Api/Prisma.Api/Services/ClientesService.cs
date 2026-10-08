using Microsoft.EntityFrameworkCore;
using Prisma.Api.Data;
using Prisma.Api.Dtos;
using Prisma.Api.Entities;

namespace Prisma.Api.Services
{
    public class ClientesService
    {
        private readonly AppDbContext _context;

        public ClientesService(AppDbContext context)
        {
            _context = context;
        }

        // estado: "activos" (por defecto), "inactivos" o "todos"
        public async Task<List<ClienteDto>> ListarAsync(string? estado, string? buscar)
        {
            var query = _context.Clientes.AsNoTracking().AsQueryable();

            query = estado?.ToLower() switch
            {
                "inactivos" => query.Where(c => !c.Activo),
                "todos" => query,
                _ => query.Where(c => c.Activo)
            };

            if (!string.IsNullOrWhiteSpace(buscar))
            {
                var texto = buscar.Trim();
                query = query.Where(c => c.Nombre.Contains(texto) || 
                (c.CUIT != null && c.CUIT.Contains(texto)) || 
                (c.DNI != null && c.DNI.Contains(texto)) || 
                (c.Email != null && c.Email.Contains(texto)) );
            }

            var clientes = await query.OrderBy(c => c.Nombre).ToListAsync();
            return clientes.Select(ADto).ToList();
        }

        public async Task<ClienteDto?> ObtenerAsync(int id)
        {
            var cliente = await _context.Clientes.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            return cliente is null ? null : ADto(cliente);
        }

        public async Task<ClienteDto> CrearAsync(ClienteGuardarDto dto)
        {
            var cliente = new Cliente();
            CopiarCampos(cliente, dto);

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return ADto(cliente);
        }

        public async Task<ClienteDto?> ActualizarAsync(int id, ClienteGuardarDto dto)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente is null) return null;

            CopiarCampos( cliente, dto);
            await _context.SaveChangesAsync();

            return ADto(cliente);
        }

        // Baja lógica (activo = false) y reactivación (activo = true)
        public async Task<bool> CambiarEstadoAsync(int id, bool activo)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente is null) return false;

            cliente.Activo = activo;
            await _context.SaveChangesAsync();

            return true;

        }

        private static void CopiarCampos(Cliente cliente, ClienteGuardarDto dto)
        {
            cliente.Nombre = dto.Nombre.Trim();
            cliente.CUIT = dto.CUIT;
            cliente.DNI = dto.DNI;
            cliente.Direccion = dto.Direccion;
            cliente.Localidad = dto.Localidad;
            cliente.Provincia = dto.Provincia;
            cliente.CodigoPostal = dto.CodigoPostal;
            cliente.Telefono = dto.Telefono;
            cliente.Email = dto.Email;
        }

        private static ClienteDto ADto(Cliente c) => new(
            c.Id, c.Nombre, c.CUIT, c.DNI, c.Direccion, c.Localidad, c.Provincia, c.CodigoPostal, c.Telefono, c.Email, c.FechaAlta, c.Activo);
    }
}
