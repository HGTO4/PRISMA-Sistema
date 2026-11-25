import { Pantalla } from "@/components/pantalla";
import { ProductoFormulario } from "@/components/producto-formulario";
import { useCrearProducto } from "@/hooks/use-productos";
import type { ProductoGuardar } from "@/types/producto";
import { volverOIr } from "@/utils/navegacion";
import { formularioProductoVacio } from "@/utils/producto-formulario";
import { router } from "expo-router";

export function ProductoNuevoScreen() {
  const crearProducto = useCrearProducto();

  const guardar = (datos: ProductoGuardar) => {
    crearProducto.mutate(datos, {
      onSuccess: (creado) =>
        router.replace({
          pathname: "/productos/[id]",
          params: { id: creado.id },
        }),
    });
  };

  return (
    <Pantalla
      titulo="Nuevo producto"
      subtitulo="Completá los datos"
      onBack={() => volverOIr("/productos")}
    >
      <ProductoFormulario
        valoresIniciales={formularioProductoVacio}
        textoBoton="Guardar producto"
        guardando={crearProducto.isPending}
        errorServidor={crearProducto.error?.message ?? null}
        onGuardar={guardar}
        onCancelar={() => volverOIr("/productos")}
      />
    </Pantalla>
  );
}
