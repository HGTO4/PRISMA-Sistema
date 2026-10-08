namespace Prisma.Api.Dtos
{
    public record ProductoDto
        (
            int Id,
            string Codigo,
            string Descripcion,
            decimal Precio,
            decimal IVA,
            bool Activo,
            DateTime FechaAlta
        );
}
