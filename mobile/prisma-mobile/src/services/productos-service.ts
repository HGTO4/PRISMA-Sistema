import type { EstadoFiltro } from "@/types/comun";
import type { Producto, ProductoGuardar } from "@/types/producto";
import { api } from "./api-client";

export const productoService = {
  listar: (estado: EstadoFiltro = "activos", buscar = "") => {
    const params = new URLSearchParams({ estado });
    if (buscar.trim()) {
      params.set("buscar", buscar.trim());
    }
    return api.get<Producto[]>(`/api/productos?${params.toString()}`);
  },

  obtener: (id: number) => api.get<Producto>(`/api/productos/${id}`),

  crear: (datos: ProductoGuardar) =>
    api.post<Producto>("/api/productos", datos),

  actualizar: (id: number, datos: ProductoGuardar) =>
    api.put<Producto>(`/api/productos/${id}`, datos),

  desactivar: (id: number) => api.delete<void>(`/api/productos/${id}`),

  activar: (id: number) => api.post<void>(`/api/productos/${id}/activar`),
};
