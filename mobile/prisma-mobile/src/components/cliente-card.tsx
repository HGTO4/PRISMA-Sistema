import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Cliente } from "@/types/cliente";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ClienteCardProps {
  cliente: Cliente;
  onPress?: () => void;
}

export function ClienteCard({ cliente, onPress }: ClienteCardProps) {
  const theme = useTheme();

  const documento = cliente.cuit
    ? `CUIT ${cliente.cuit}`
    : cliente.dni
      ? `DNI ${cliente.dni}`
      : "Sin documento";

  const ubicacion = [cliente.localidad, cliente.provincia]
    .filter(Boolean)
    .join(", ");

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
        <Text style={[styles.nombre, { color: theme.text }]} numberOfLines={1}>
          {cliente.nombre}
        </Text>
        {!cliente.activo ? (
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

      <Text style={[styles.detalle, { color: theme.textSecondary }]}>
        {documento}
      </Text>
      {ubicacion !== "" ? (
        <Text style={[styles.detalle, { color: theme.textSecondary }]}>
          {ubicacion}
        </Text>
      ) : null}

      {cliente.email ? (
        <Text style={[styles.detalle, { color: theme.textSecondary }]}>
          {cliente.email}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.three,
    marginBottom: Spacing.three,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nombre: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
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
  detalle: {
    fontSize: 14,
  },
});
