import { ClienteCard } from "@/components/cliente-card";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useClientes } from "@/hooks/use-clientes";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export function ClientesScreen() {
  const theme = useTheme();
  const [buscar, setBuscar] = useState("");
  const { data, isPending, isError, error, refetch } = useClientes(
    "activos",
    buscar,
  );

  return (
    <ThemedView style={styles.container}>
      <Header title="Clientes" subtitle="Tus clientes activos" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
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

          {isPending ? (
            <ActivityIndicator color={theme.primary} style={styles.estado} />
          ) : null}

          {isError ? (
            <View style={styles.estado}>
              <Text style={{ color: theme.danger, textAlign: "center" }}>
                {error.message}
              </Text>
              <Pressable onPress={() => refetch()}>
                <Text style={{ color: theme.primary, fontWeight: "600" }}>
                  Reintentar
                </Text>
              </Pressable>
            </View>
          ) : null}

          {data && data.length === 0 ? (
            <Text style={[styles.vacio, { color: theme.textSecondary }]}>
              No hay clientes para mostrar.
            </Text>
          ) : null}

          {data?.map((cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
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
  estado: {
    alignItems: "center",
    gap: Spacing.two,
    marginVertical: Spacing.four,
  },
  vacio: { textAlign: "center", marginTop: Spacing.four },
});
