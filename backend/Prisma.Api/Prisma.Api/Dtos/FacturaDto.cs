namespace Prisma.Api.Dtos
{
    public record DetalleFacturaDto
        (
        int Id,
        int ProductoId,
        string Descripcion,
        decimal Cantidad,
        decimal PrecioUnitario,
        decimal IVA,
        decimal Subtotal,
        decimal ImporteIVA
        );

    public record FacturaDto
        (
        int Id,
        string Numero,
        int ClienteId,
        string ClienteNombre,
        DateTime FechaEmision,
        decimal Subtotal, 
        decimal TotalIVA,
        decimal Total,
        string? Nota,
        string MetodoPago,
        bool Activa,
        List<DetalleFacturaDto> Detalles
        );

    public record FacturaResumenDto
        (
        int Id,
        string Numero,
        string ClienteNombre,
        DateTime FechaEmision,
        decimal Total,
        string MetodoPago,
        bool Activa
        );
}
