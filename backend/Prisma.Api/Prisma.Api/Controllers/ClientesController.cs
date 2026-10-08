using Microsoft.AspNetCore.Mvc;
using Prisma.Api.Dtos;
using Prisma.Api.Services;

namespace Prisma.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly ClientesService _service;

        public ClientesController(ClientesService service)
        {
            _service = service;
        }

        // GET /api/clientes?estado=activos&buscar=garcia
        [HttpGet]
        public async Task<ActionResult<List<ClienteDto>>> Listar([FromQuery] string? estado, [FromQuery] string? buscar)
        {
            return Ok(await _service.ListarAsync(estado, buscar));
        }

        // GET /api/clientes/3
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ClienteDto>> Obtener(int id)
        {
            var cliente = await _service.ObtenerAsync(id);
            return cliente is null ? NotFound() : Ok(cliente);
        }

        // POST /api/clientes
        [HttpPost]
        public async Task<ActionResult<ClienteDto>> Crear(ClienteGuardarDto dto)
        {
            var creado = await _service.CrearAsync(dto);
            return CreatedAtAction(nameof(Obtener), new { id = creado.Id }, creado);
        }

        // PUT /api/clientes/3
        [HttpPut("{id:int}")]
        public async Task<ActionResult<ClienteDto>> Actualizar(int id, ClienteGuardarDto dto)
        {
            var actualizado = await _service.ActualizarAsync(id, dto);
            return actualizado is null ? NotFound() : Ok(actualizado);
        }

        // DELETE /api/clientes/3  (baja lógica: no borra la fila)
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Desactivar(int id) 
        {
            var ok = await _service.CambiarEstadoAsync(id, false);
            return ok ? NoContent() : NotFound();
        }

        // POST /api/clientes/3/activar
        [HttpPost("{id:int}/activar")]
        public async Task<IActionResult> Activar(int id)
        {
            var ok = await _service.CambiarEstadoAsync(id, true);
            return ok ? NoContent() : NotFound();
        }


    }
}
