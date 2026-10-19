import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

interface DatoFilaProps {
  etiqueta: string;
  valor: string | null;
}

export function DatoFila({ etiqueta, valor }: DatoFilaProps) {
  const theme = useTheme();

  return (
    <View style={styles.fila}>
      <Text style={[styles.etiqueta, { color: theme.textSecondary }]}>
        {etiqueta}
      </Text>
      <Text style={[styles.valor, { color: theme.text }]}>{valor || "—"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    gap: Spacing.half,
    paddingVertical: Spacing.two,
  },
  etiqueta: {
    fontSize: 13,
  },
  valor: {
    fontSize: 16,
    fontWeight: "500",
  },
});
