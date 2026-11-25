import { ClienteFormulario } from "@/components/cliente-formulario";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Pantalla } from "@/components/pantalla";
import { useActualizarCliente, useCliente } from "@/hooks/use-clientes";
import type { ClienteGuardar } from "@/types/cliente";
import { aFormulario } from "@/utils/cliente-formulario";
import { volverOIr } from "@/utils/navegacion";

interface ClienteEditarScreenProps {
  id: number;
}

export function ClienteEditarScreen({ id }: ClienteEditarScreenProps) {
  const { data: cliente, isPending, error, refetch } = useCliente(id);
  const actualizarCliente = useActualizarCliente(id);

  const volverAlDetalle = () =>
    volverOIr({ pathname: "/clientes/[id]", params: { id } });

  const guardar = (datos: ClienteGuardar) => {
    actualizarCliente.mutate(datos, { onSuccess: volverAlDetalle });
  };

  return (
    <Pantalla
      titulo="Editar cliente"
      subtitulo={cliente?.nombre}
      onBack={volverAlDetalle}
    >
      <EstadoDeCarga
        cargando={isPending}
        error={error}
        onReintentar={() => refetch()}
      />

      {cliente ? (
        <ClienteFormulario
          valoresIniciales={aFormulario(cliente)}
          textoBoton="Guardar cambios"
          guardando={actualizarCliente.isPending}
          errorServidor={actualizarCliente.error?.message ?? null}
          onGuardar={guardar}
          onCancelar={volverAlDetalle}
        />
      ) : null}
    </Pantalla>
  );
}
