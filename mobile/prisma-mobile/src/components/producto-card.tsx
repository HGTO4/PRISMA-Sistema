import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Producto } from "@/types/producto";
import { formatearMoneda } from "@/utils/formato";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProductoCardProps {
  producto: Producto;
  onPress?: () => void;
}

export function ProductoCard({ producto, onPress }: ProductoCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.fila}>
        <Text
          style={[styles.descripcion, { color: theme.text }]}
          numberOfLines={1}
        >
          {producto.descripcion}
        </Text>
        <Text style={[styles.precio, { color: theme.text }]}>
          {formatearMoneda(producto.precio)}
        </Text>
      </View>

      <View style={styles.fila}>
        <Text style={[styles.detalle, { color: theme.textSecondary }]}>
          {producto.codigo} · IVA {producto.iva}%
        </Text>
        {!producto.activo ? (
          <Text
            style={[
              styles.badge,
              { color: theme.danger, backgroundColor: theme.dangerSoft },
            ]}
          >
            Inactivo
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.three,
    marginBottom: Spacing.three,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descripcion: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
  },
  precio: {
    marginLeft: Spacing.two,
    fontSize: 17,
    fontWeight: "700",
  },
  detalle: {
    fontSize: 14,
  },
  badge: {
    marginLeft: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.three,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "600",
  },
});
