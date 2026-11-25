import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Pantalla } from "@/components/pantalla";
import { ProductoFormulario } from "@/components/producto-formulario";
import { useActualizarProducto, useProducto } from "@/hooks/use-productos";
import type { ProductoGuardar } from "@/types/producto";
import { volverOIr } from "@/utils/navegacion";
import { aFormularioProducto } from "@/utils/producto-formulario";

interface ProductoEditarScreenProps {
  id: number;
}

export function ProductoEditarScreen({ id }: ProductoEditarScreenProps) {
  const { data: producto, isPending, error, refetch } = useProducto(id);
  const actualizarProducto = useActualizarProducto(id);

  const volverAlDetalle = () =>
    volverOIr({ pathname: "/productos/[id]", params: { id } });

  const guardar = (datos: ProductoGuardar) => {
    actualizarProducto.mutate(datos, { onSuccess: volverAlDetalle });
  };

  return (
    <Pantalla
      titulo="Editar producto"
      subtitulo={producto?.descripcion}
      onBack={volverAlDetalle}
    >
      <EstadoDeCarga
        cargando={isPending}
        error={error}
        onReintentar={() => refetch()}
      />

      {producto ? (
        <ProductoFormulario
          valoresIniciales={aFormularioProducto(producto)}
          textoBoton="Guardar cambios"
          guardando={actualizarProducto.isPending}
          errorServidor={actualizarProducto.error?.message ?? null}
          onGuardar={guardar}
          onCancelar={volverAlDetalle}
        />
      ) : null}
    </Pantalla>
  );
}
