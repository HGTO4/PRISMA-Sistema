import {
  CamposDeFormulario,
  type CampoConfig,
} from "@/components/campo-de-formulario";
import { PieDeFormulario } from "@/components/pie-de-formulario";
import { useFormulario } from "@/hooks/use-formulario";
import type { ClienteForm, ClienteGuardar } from "@/types/cliente";
import {
  aClienteGuardar,
  LONGITUD_MAXIMA,
  validarFormulario,
} from "@/utils/cliente-formulario";

const CAMPOS: CampoConfig<ClienteForm>[] = [
  { campo: "nombre", etiqueta: "Nombre *", autoCapitalize: "words" },
  { campo: "cuit", etiqueta: "CUIT" },
  { campo: "dni", etiqueta: "DNI", teclado: "numeric" },
  { campo: "direccion", etiqueta: "Dirección", autoCapitalize: "sentences" },
  { campo: "localidad", etiqueta: "Localidad", autoCapitalize: "words" },
  { campo: "provincia", etiqueta: "Provincia", autoCapitalize: "words" },
  { campo: "codigoPostal", etiqueta: "Código postal" },
  {
    campo: "telefono",
    etiqueta: "Teléfono",
    teclado: "phone-pad",
  },
  {
    campo: "email",
    etiqueta: "Email",
    teclado: "email-address",
    autoCapitalize: "none",
  },
];

interface ClienteFormularioProps {
  valoresIniciales: ClienteForm;
  textoBoton: string;
  guardando: boolean;
  errorServidor: string | null;
  onGuardar: (datos: ClienteGuardar) => void;
  onCancelar: () => void;
}

export function ClienteFormulario({
  valoresIniciales,
  textoBoton,
  guardando,
  errorServidor,
  onGuardar,
  onCancelar,
}: ClienteFormularioProps) {
  const { valores, errores, cambiar, enviar } = useFormulario({
    valoresIniciales,
    validar: validarFormulario,
    convertir: aClienteGuardar,
  });

  return (
    <>
      <CamposDeFormulario
        campos={CAMPOS}
        valores={valores}
        errores={errores}
        longitudMaxima={LONGITUD_MAXIMA}
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
