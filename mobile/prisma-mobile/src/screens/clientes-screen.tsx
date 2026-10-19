import { Boton } from "@/components/boton";
import { ClienteCard } from "@/components/cliente-card";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useClientes } from "@/hooks/use-clientes";
import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export function ClientesScreen() {
  const theme = useTheme();
  const [buscar, setBuscar] = useState("");
  const { data, isPending, error, refetch } = useClientes("activos", buscar);

  return (
    <ThemedView style={styles.container}>
      <Header title="Clientes" subtitle="Tus clientes activos" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.acciones}>
            <Boton
              titulo="+ Nuevo Cliente"
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
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
  },
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
