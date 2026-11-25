import { CampoTexto } from "@/components/campo-texto";
import type { KeyboardTypeOptions, TextInputProps } from "react-native";

export interface CampoConfig<Form> {
  campo: keyof Form;
  etiqueta: string;
  teclado?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}

interface CamposDeFormularioProps<Form extends Record<string, string>> {
  campos: CampoConfig<Form>[];
  valores: Form;
  errores: Partial<Record<keyof Form, string>>;
  longitudMaxima: Record<keyof Form, number>;
  onCambiar: (campo: keyof Form) => (texto: string) => void;
}

export function CamposDeFormulario<Form extends Record<string, string>>({
  campos,
  valores,
  errores,
  longitudMaxima,
  onCambiar,
}: CamposDeFormularioProps<Form>) {
  return (
    <>
      {campos.map(({ campo, etiqueta, teclado, autoCapitalize }) => (
        <CampoTexto
          key={String(campo)}
          etiqueta={etiqueta}
          valor={valores[campo]}
          onChangeText={onCambiar(campo)}
          error={errores[campo]}
          maxLength={longitudMaxima[campo]}
          teclado={teclado}
          autoCapitalize={autoCapitalize}
        />
      ))}
    </>
  );
}
