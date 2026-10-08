using Microsoft.AspNetCore.Mvc;
using Prisma.Api.Dtos;
using Prisma.Api.Services;

namespace Prisma.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly ProductosService _service;

        public ProductosController(ProductosService service) 
        {
            _service = service;
        }

        // GET /api/productos?estado=activos&buscar=mouse
        [HttpGet]
        public async Task<ActionResult<List<ProductoDto>>> Listar([FromQuery] string? estado, [FromQuery] string? buscar)
        {
            return Ok(await _service.ListarAsync(estado, buscar));
        }

        // GET /api/productos/3
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductoDto>> Obtener(int id)
        {
            var producto = await _service.ObtenerAsync(id);
            return producto is null ? NotFound() : Ok(producto);
        }

        // POST /api/productos
        [HttpPost]
        public async Task<ActionResult<ProductoDto>> Crear(ProductoGuardarDto dto) 
        {
            var creado = await _service.CrearAsync(dto);
            return CreatedAtAction(nameof(Obtener), new { id = creado.Id }, creado);
        }

        // PUT /api/productos/3
        [HttpPut("{id:int}")]
        public async Task<ActionResult<ProductoDto>> Actualizar(int id, ProductoGuardarDto dto)
        {
            var actualizado = await _service.ActualizarAsync(id, dto);
            return actualizado is null ? NotFound() : Ok(actualizado);
        }

        // DELETE /api/productos/3 (baja lógica: no borra la fila)
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Desactivar(int id)
        {
            var ok = await _service.CambiarEstadoAsync(id, false);
            return ok ? NoContent() : NotFound();
        }

        // POST /api/productos/3/activar
        [HttpPost("{id:int}/activar")]
        public async Task<IActionResult> Activar(int id)
        {
            var ok = await _service.CambiarEstadoAsync(id, true);
            return ok ? NoContent() : NotFound();
        }
    }
}
