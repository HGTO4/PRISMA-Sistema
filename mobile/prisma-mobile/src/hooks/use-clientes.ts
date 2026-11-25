import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { clienteService } from "@/services/clientes-service";
import type { ClienteGuardar } from "@/types/cliente";
import type { EstadoFiltro } from "@/types/comun";

export function useClientes(estado: EstadoFiltro = "activos", buscar = "") {
  return useQuery({
    queryKey: ["clientes", estado, buscar],
    queryFn: () => clienteService.listar(estado, buscar),
  });
}

export function useCliente(id: number) {
  return useQuery({
    queryKey: ["clientes", "detalle", id],
    queryFn: () => clienteService.obtener(id),
  });
}

function useInvalidarClientes() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["clientes"] });
}

export function useCrearCliente() {
  const invalidar = useInvalidarClientes();

  return useMutation({
    mutationFn: (datos: ClienteGuardar) => clienteService.crear(datos),
    onSuccess: invalidar,
  });
}

export function useActualizarCliente(id: number) {
  const invalidar = useInvalidarClientes();

  return useMutation({
    mutationFn: (datos: ClienteGuardar) => clienteService.actualizar(id, datos),
    onSuccess: invalidar,
  });
}

export function useCambiarEstadoCliente() {
  const invalidar = useInvalidarClientes();

  return useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      activo ? clienteService.activar(id) : clienteService.desactivar(id),
    onSuccess: invalidar,
  });
}
