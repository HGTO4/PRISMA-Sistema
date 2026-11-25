import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productoService } from "@/services/productos-service";
import type { EstadoFiltro } from "@/types/comun";
import type { ProductoGuardar } from "@/types/producto";

export function useProductos(estado: EstadoFiltro = "activos", buscar = "") {
  return useQuery({
    queryKey: ["productos", estado, buscar],
    queryFn: () => productoService.listar(estado, buscar),
  });
}

export function useProducto(id: number) {
  return useQuery({
    queryKey: ["productos", "detalle", id],
    queryFn: () => productoService.obtener(id),
  });
}

function useInvalidarProductos() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["productos"] });
}

export function useCrearProducto() {
  const invalidar = useInvalidarProductos();

  return useMutation({
    mutationFn: (datos: ProductoGuardar) => productoService.crear(datos),
    onSuccess: invalidar,
  });
}

export function useActualizarProducto(id: number) {
  const invalidar = useInvalidarProductos();

  return useMutation({
    mutationFn: (datos: ProductoGuardar) =>
      productoService.actualizar(id, datos),
    onSuccess: invalidar,
  });
}

export function useCambiarEstadoProducto() {
  const invalidar = useInvalidarProductos();

  return useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      activo ? productoService.activar(id) : productoService.desactivar(id),
    onSuccess: invalidar,
  });
}
