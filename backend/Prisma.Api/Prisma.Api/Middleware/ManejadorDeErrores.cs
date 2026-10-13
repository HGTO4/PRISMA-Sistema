using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Prisma.Api.Exceptions;

namespace Prisma.Api.Middleware
{
    public class ManejadorDeErrores : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var (status, titulo) = exception switch
            {
                ConflictoException => (StatusCodes.Status409Conflict, "Conflicto"),
                ReglaDeNegocioException => (StatusCodes.Status400BadRequest, "Solicitud inválida"),
                _ => (0, string.Empty)
            };
            if (status == 0)
            {
                return false;
            }

            httpContext.Response.StatusCode = status;
            await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Status = status,
                Title = titulo,
                Detail = exception.Message
            }, cancellationToken);

            return true;
        }
    }
}
