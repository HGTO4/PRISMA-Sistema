import { AppColors, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, StyleSheet, Text } from "react-native";

interface BotonProps {
  titulo: string;
  onPress: () => void;
  variante?: "principal" | "secundario" | "peligro";
  deshabilitado?: boolean;
}

export function Boton({
  titulo,
  onPress,
  variante = "principal",
  deshabilitado = false,
}: BotonProps) {
  const theme = useTheme();

  const estilosPorVariante = {
    principal: { backgroundColor: AppColors.success },
    peligro: { backgroundColor: AppColors.danger },
    secundario: { borderWidth: 1, borderColor: theme.border },
  };
  const colorTexto = variante === "secundario" ? theme.text : "#FFFFFF";

  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        styles.boton,
        estilosPorVariante[variante],
        (pressed || deshabilitado) && styles.atenuado,
      ]}
    >
      <Text style={[styles.texto, { color: colorTexto }]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    alignItems: "center",
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
  },
  texto: {
    fontSize: 16,
    fontWeight: "600",
  },
  atenuado: {
    opacity: 0.6,
  },
});
