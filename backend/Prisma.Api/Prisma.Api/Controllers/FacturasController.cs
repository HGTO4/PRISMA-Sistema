using Microsoft.AspNetCore.Mvc;
using Prisma.Api.Dtos;
using Prisma.Api.Services;

namespace Prisma.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacturasController : ControllerBase
    {
        private readonly FacturasService _service;

        public FacturasController(FacturasService service)
        {
            _service = service;
        }

        // GET /api/facturas?estado=activas&buscar=garcia
        [HttpGet]
        public async Task<ActionResult<List<FacturaResumenDto>>> Listar([FromQuery] string? estado, [FromQuery] string? buscar)
        {
            return Ok(await _service.ListarAsync(estado, buscar));
        }

        // GET /api/facturas/3
        [HttpGet("{id:int}")]
        public async Task<ActionResult<FacturaDto>> Obtener(int id)
        {
            var factura = await _service.ObtenerAsync(id);
            return factura is null ? NotFound() : Ok(factura);
        }

        // POST /api/facturas
        [HttpPost]
        public async Task<ActionResult<FacturaDto>> Crear(FacturaCrearDto dto)
        {
            var creada = await _service.CrearAsync(dto);
            return CreatedAtAction(nameof(Obtener), new { id = creada.Id }, creada);
        }

        // POST /api/facturas/3/anular
        [HttpPost("{id:int}/anular")]
        public async Task<IActionResult> Anular(int id)
        {
            var ok = await _service.AnularAsync(id);
            return ok ? NoContent() : NotFound();
        }
    }
}
