namespace Prisma.Api.Dtos
{
    public record ClienteDto
    (
        int Id,
        string Nombre,
        string? CUIT,
        string? DNI,
        string? Direccion,
        string? Localidad,
        string? Provincia,
        string? CodigoPostal,
        string? Telefono,
        string? Email,
        DateTime FechaAlta,
        bool Activo
    );
    
}
