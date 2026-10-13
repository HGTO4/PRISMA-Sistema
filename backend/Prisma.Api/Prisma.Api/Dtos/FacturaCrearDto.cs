using System.ComponentModel.DataAnnotations;

namespace Prisma.Api.Dtos
{
    public class FacturaCrearDto
    {
        [Range(1, int.MaxValue, ErrorMessage ="Debe indicar un cliente")]
        public int ClienteId { get; set; }

        [Required(ErrorMessage ="El método de pago es obligatorio")]
        public string MetodoPago { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Nota { get; set; }

        [MinLength(1, ErrorMessage = "La factura debe tener al menos un ítem")]
        public List<ItemFacturaDto> Items { get; set; } = new();
    }

    public class ItemFacturaDto
    {
        [Range(1, int.MaxValue, ErrorMessage ="Producto inválido")]
        public int ProductoId { get; set; }

        [Range(0.01, 100000, ErrorMessage ="La cantidad debe ser mayor que 0")]
        public decimal Cantidad { get; set; }
    }
}
