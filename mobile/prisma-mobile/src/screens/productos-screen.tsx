import { Boton } from "@/components/boton";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Pantalla } from "@/components/pantalla";
import { ProductoCard } from "@/components/producto-card";
import { Spacing } from "@/constants/theme";
import { useProductos } from "@/hooks/use-productos";
import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function ProductosScreen() {
  const theme = useTheme();
  const [buscar, setBuscar] = useState("");
  const { data, isPending, error, refetch } = useProductos("activos", buscar);

  return (
    <Pantalla titulo="Productos" subtitulo="Tu catálogo activo">
      <View style={styles.acciones}>
        <Boton
          titulo="+ Nuevo producto"
          onPress={() => router.push("/productos/nuevo")}
        />
      </View>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Buscar por código o descripción"
        placeholderTextColor={theme.textSecondary}
        value={buscar}
        onChangeText={setBuscar}
        autoCapitalize="none"
      />

      <EstadoDeCarga
        cargando={isPending}
        error={error}
        onReintentar={() => refetch()}
      />

      {data && data.length === 0 ? (
        <Text style={[styles.vacio, { color: theme.textSecondary }]}>
          No hay productos para mostrar.
        </Text>
      ) : null}

      {data?.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          onPress={() =>
            router.push({
              pathname: "/productos/[id]",
              params: { id: producto.id },
            })
          }
        />
      ))}
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  acciones: {
    alignItems: "flex-end",
    marginBottom: Spacing.three,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
    marginBottom: Spacing.four,
  },
  vacio: {
    textAlign: "center",
    marginTop: Spacing.four,
  },
});
