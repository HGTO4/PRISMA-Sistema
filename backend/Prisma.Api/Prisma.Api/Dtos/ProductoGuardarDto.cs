using System.ComponentModel.DataAnnotations;

namespace Prisma.Api.Dtos
{
    public class ProductoGuardarDto
    {
        [Required(ErrorMessage ="El código es obligatorio")]
        [StringLength(20)]
        public string Codigo { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripción es obligatoria")]
        [StringLength(200)]
        public string Descripcion { get; set; } = string.Empty;

        [Range(0.01, 999999999.99, ErrorMessage = "El precio debe ser mayor que 0")]
        public decimal Precio { get; set; }

        [Range(0, 100, ErrorMessage ="El IVA debe estar entre 0 y 100")]
        public decimal IVA { get; set; } = 21;
    }
}
