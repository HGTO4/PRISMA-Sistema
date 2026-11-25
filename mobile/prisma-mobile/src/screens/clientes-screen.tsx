import { Boton } from "@/components/boton";
import { ClienteCard } from "@/components/cliente-card";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Pantalla } from "@/components/pantalla";
import { Spacing } from "@/constants/theme";
import { useClientes } from "@/hooks/use-clientes";
import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function ClientesScreen() {
  const theme = useTheme();
  const [buscar, setBuscar] = useState("");
  const { data, isPending, error, refetch } = useClientes("activos", buscar);

  return (
    <Pantalla titulo="Clientes" subtitulo="Tus clientes activos">
      <View style={styles.acciones}>
        <Boton
          titulo="+ Nuevo cliente"
          onPress={() => router.push("/clientes/nuevo")}
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
        placeholder="Buscar por nombre, CUIT, DNI o email"
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
          No hay clientes para mostrar.
        </Text>
      ) : null}

      {data?.map((cliente) => (
        <ClienteCard
          key={cliente.id}
          cliente={cliente}
          onPress={() =>
            router.push({
              pathname: "/clientes/[id]",
              params: { id: cliente.id },
            })
          }
        />
      ))}
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
    marginBottom: Spacing.four,
  },
  vacio: { textAlign: "center", marginTop: Spacing.four },
  acciones: {
    alignItems: "flex-end",
    marginBottom: Spacing.three,
  },
});
