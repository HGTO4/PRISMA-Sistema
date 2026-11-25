import {
  CamposDeFormulario,
  type CampoConfig,
} from "@/components/campo-de-formulario";
import { PieDeFormulario } from "@/components/pie-de-formulario";
import { useFormulario } from "@/hooks/use-formulario";
import type { ProductoForm, ProductoGuardar } from "@/types/producto";
import {
  aProductoGuardar,
  LONGITUD_MAXIMA_PRODUCTO,
  validarFormularioProducto,
} from "@/utils/producto-formulario";

const CAMPOS: CampoConfig<ProductoForm>[] = [
  { campo: "codigo", etiqueta: "Código *", autoCapitalize: "characters" },
  {
    campo: "descripcion",
    etiqueta: "Descripción *",
    autoCapitalize: "sentences",
  },
  { campo: "precio", etiqueta: "Precio *" },
  {
    campo: "iva",
    etiqueta: "IVA (%) *",
    teclado: "decimal-pad",
  },
];

interface ProductoFormularioProps {
  valoresIniciales: ProductoForm;
  textoBoton: string;
  guardando: boolean;
  errorServidor: string | null;
  onGuardar: (datos: ProductoGuardar) => void;
  onCancelar: () => void;
}

export function ProductoFormulario({
  valoresIniciales,
  textoBoton,
  guardando,
  errorServidor,
  onGuardar,
  onCancelar,
}: ProductoFormularioProps) {
  const { valores, errores, cambiar, enviar } = useFormulario({
    valoresIniciales,
    validar: validarFormularioProducto,
    convertir: aProductoGuardar,
  });

  return (
    <>
      <CamposDeFormulario
        campos={CAMPOS}
        valores={valores}
        errores={errores}
        longitudMaxima={LONGITUD_MAXIMA_PRODUCTO}
        onCambiar={cambiar}
      />
      <PieDeFormulario
        textoBoton={textoBoton}
        guardando={guardando}
        errorServidor={errorServidor}
        onGuardar={() => enviar(onGuardar)}
        onCancelar={onCancelar}
      />
    </>
  );
}
