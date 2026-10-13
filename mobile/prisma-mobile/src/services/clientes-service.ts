import type { Cliente, ClienteGuardar, EstadoFiltro } from "@/types/cliente";
import { api } from "./api-client";

export const clienteService = {
  listar: (estado: EstadoFiltro = "activos", buscar = "") => {
    const params = new URLSearchParams({ estado });
    if (buscar.trim()) {
      params.set("buscar", buscar.trim());
    }
    return api.get<Cliente[]>(`/api/clientes?${params.toString()}`);
  },

  obtener: (id: number) => api.get<Cliente>(`/api/clientes/${id}`),

  crear: (datos: ClienteGuardar) => api.post<Cliente>("/api/clientes", datos),

  actualizar: (id: number, datos: ClienteGuardar) =>
    api.put<Cliente>(`/api/clientes/${id}`, datos),

  desactivar: (id: number) => api.delete<void>(`/api/clientes/${id}`),

  activar: (id: number) => api.post<void>(`/api/clientes/${id}/activar`),
};
