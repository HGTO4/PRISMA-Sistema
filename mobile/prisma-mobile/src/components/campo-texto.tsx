import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from "react-native";

interface CampoTextoProps {
  etiqueta: string;
  valor: string;
  onChangeText: (texto: string) => void;
  error?: string;
  maxLength: number;
  teclado?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"]; //el mismo tipo que usa TextInput para esa propiedad, sin copiar a mano la lista de valores
}

export function CampoTexto({
  etiqueta,
  valor,
  onChangeText,
  error,
  maxLength,
  teclado,
  autoCapitalize,
}: CampoTextoProps) {
  const theme = useTheme();

  return (
    <View style={styles.campo}>
      <Text style={[styles.etiqueta, { color: theme.text }]}>{etiqueta}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: error ? theme.danger : theme.border,
            color: theme.text,
          },
        ]}
        value={valor}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={teclado}
        autoCapitalize={autoCapitalize}
      />
      {error ? (
        <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  campo: {
    gap: Spacing.one,
    marginBottom: Spacing.three,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
  },
});
