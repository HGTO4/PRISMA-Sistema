import { Boton } from "@/components/boton";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

interface PieDeFormularioProps {
  textoBoton: string;
  guardando: boolean;
  errorServidor: string | null;
  onGuardar: () => void;
  onCancelar: () => void;
}

export function PieDeFormulario({
  textoBoton,
  guardando,
  errorServidor,
  onGuardar,
  onCancelar,
}: PieDeFormularioProps) {
  const theme = useTheme();

  return (
    <>
      {errorServidor ? (
        <Text style={[styles.errorServidor, { color: theme.danger }]}>
          {errorServidor}
        </Text>
      ) : null}

      <View style={styles.botones}>
        <Boton
          titulo={guardando ? "Guardando..." : textoBoton}
          onPress={onGuardar}
          deshabilitado={guardando}
        />
        <Boton
          titulo="Cancelar"
          onPress={onCancelar}
          variante="secundario"
          deshabilitado={guardando}
        />
      </View>
    </>
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
