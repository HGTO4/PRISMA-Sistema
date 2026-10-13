import { useQuery } from "@tanstack/react-query";

import { clienteService } from "@/services/clientes-service";
import type { EstadoFiltro } from "@/types/cliente";

export function useClientes(estado: EstadoFiltro = "activos", buscar = "") {
  return useQuery({
    queryKey: ["clientes", estado, buscar],
    queryFn: () => clienteService.listar(estado, buscar),
  });
}
