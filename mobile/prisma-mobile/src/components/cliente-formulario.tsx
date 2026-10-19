import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type {
  ClienteForm,
  ClienteGuardar,
  ErroresClienteForm,
} from "@/types/cliente";
import {
  aClienteGuardar,
  LONGITUD_MAXIMA,
  validarFormulario,
} from "@/utils/cliente-formulario";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from "react-native";
import { Boton } from "./boton";
import { CampoTexto } from "./campo-texto";

interface CampoConfig {
  campo: keyof ClienteForm;
  etiqueta: string;
  teclado?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}

const CAMPOS: CampoConfig[] = [
  { campo: "nombre", etiqueta: "Nombre *", autoCapitalize: "words" },
  { campo: "cuit", etiqueta: "CUIT" },
  { campo: "dni", etiqueta: "DNI", teclado: "numeric" },
  { campo: "direccion", etiqueta: "Dirección", autoCapitalize: "sentences" },
  { campo: "localidad", etiqueta: "Localidad", autoCapitalize: "words" },
  { campo: "provincia", etiqueta: "Provincia", autoCapitalize: "words" },
  { campo: "codigoPostal", etiqueta: "Código Postal" },
  { campo: "telefono", etiqueta: "Teléfono", teclado: "phone-pad" },
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
  const theme = useTheme();
  const [valores, setValores] = useState<ClienteForm>(valoresIniciales);
  const [errores, setErrores] = useState<ErroresClienteForm>({});

  const cambiar = (campo: keyof ClienteForm) => (texto: string) => {
    setValores((anterior) => ({ ...anterior, [campo]: texto }));
  };

  const guardar = () => {
    const erroresEncontrados = validarFormulario(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      return;
    }

    onGuardar(aClienteGuardar(valores));
  };

  return (
    <View>
      {CAMPOS.map(({ campo, etiqueta, teclado, autoCapitalize }) => (
        <CampoTexto
          key={campo}
          etiqueta={etiqueta}
          valor={valores[campo]}
          onChangeText={cambiar(campo)}
          error={errores[campo]}
          maxLength={LONGITUD_MAXIMA[campo]}
          teclado={teclado}
          autoCapitalize={autoCapitalize}
        />
      ))}

      {errorServidor ? (
        <Text style={[styles.errorServidor, { color: theme.danger }]}>
          {errorServidor}
        </Text>
      ) : null}

      <View style={styles.botones}>
        <Boton
          titulo={guardando ? "Guardando..." : textoBoton}
          onPress={guardar}
          deshabilitado={guardando}
        />
        <Boton
          titulo="Cancelar"
          onPress={onCancelar}
          variante="secundario"
          deshabilitado={guardando}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorServidor: {
    textAlign: "center",
    marginBottom: Spacing.three,
  },
  botones: {
    gap: Spacing.two,
  },
});
