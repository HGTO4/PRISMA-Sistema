using System.ComponentModel.DataAnnotations;

namespace Prisma.Api.Dtos
{
    public class ClienteGuardarDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(150)]
        public string Nombre { get; set; } = string.Empty;

        [StringLength(13)]
        public string? CUIT {  get; set; }

        [StringLength(8)]
        public string? DNI { get; set; }

        [StringLength(200)]
        public string? Direccion { get; set; }

        [StringLength(100)]
        public string? Localidad { get; set; }

        [StringLength(100)]
        public string? Provincia { get; set; }

        [StringLength(10)]
        public string? CodigoPostal { get; set; }

        [StringLength(30)]
        public string? Telefono { get; set; }

        [EmailAddress(ErrorMessage = "El mail no es válido")]
        [StringLength(150)]
        public string? Email { get; set; }
    }
}
