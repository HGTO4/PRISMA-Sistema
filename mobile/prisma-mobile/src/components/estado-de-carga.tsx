import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface EstadoDeCargaProps {
  cargando: boolean;
  error: Error | null;
  onReintentar: () => void;
}

export function EstadoDeCarga({
  cargando,
  error,
  onReintentar,
}: EstadoDeCargaProps) {
  const theme = useTheme();

  if (cargando) {
    return <ActivityIndicator color={theme.primary} style={styles.estado} />;
  }

  if (error) {
    return (
      <View style={styles.estado}>
        <Text style={{ color: theme.danger, textAlign: "center" }}>
          {error.message}
        </Text>
        <Pressable onPress={onReintentar}>
          <Text style={{ color: theme.primary, fontWeight: "600" }}>
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  estado: {
    alignItems: "center",
    gap: Spacing.two,
    marginVertical: Spacing.four,
  },
});
