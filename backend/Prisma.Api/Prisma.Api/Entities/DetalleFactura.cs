namespace Prisma.Api.Entities
{
    public class DetalleFactura
    {
        public int Id { get; set; }
        public int FacturaId { get; set; }
        public Factura? Factura { get; set; }

        public int ProductoId { get; set; }
        public Producto? Producto { get; set; }

        public string Descripcion {  get; set; } = string.Empty;
        public decimal Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal IVA { get; set; }
        public decimal Subtotal { get; set; }
        public decimal ImporteIVA { get; set; }
    }
}
