import { ClienteFormulario } from "@/components/cliente-formulario";
import { Pantalla } from "@/components/pantalla";
import { useCrearCliente } from "@/hooks/use-clientes";
import type { ClienteGuardar } from "@/types/cliente";
import { formularioVacio } from "@/utils/cliente-formulario";
import { volverOIr } from "@/utils/navegacion";
import { router } from "expo-router";

export function ClienteNuevoScreen() {
  const crearCliente = useCrearCliente();

  const guardar = (datos: ClienteGuardar) => {
    crearCliente.mutate(datos, {
      onSuccess: (creado) =>
        router.replace({
          pathname: "/clientes/[id]",
          params: { id: creado.id },
        }),
    });
  };

  return (
    <Pantalla
      titulo="Nuevo cliente"
      subtitulo="Completá los datos"
      onBack={() => volverOIr("/clientes")}
    >
      <ClienteFormulario
        valoresIniciales={formularioVacio}
        textoBoton="Guardar cliente"
        guardando={crearCliente.isPending}
        errorServidor={crearCliente.error?.message ?? null}
        onGuardar={guardar}
        onCancelar={() => volverOIr("/clientes")}
      />
    </Pantalla>
  );
}
