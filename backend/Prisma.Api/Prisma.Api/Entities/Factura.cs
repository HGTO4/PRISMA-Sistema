namespace Prisma.Api.Entities
{
    public class Factura
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }

        public DateTime FechaEmision { get; set; } = DateTime.Now;
        public string Numero {  get; set; } = string.Empty;

        public decimal Subtotal {  get; set; }
        public decimal TotalIVA { get; set; }
        public decimal Total { get; set; }

        public string? Nota { get; set; }
        public string MetodoPago { get; set; } = string.Empty;
        public bool Activa { get; set; } = true;

        public List<DetalleFactura> Detalles { get; set; } = new();

    }
}
