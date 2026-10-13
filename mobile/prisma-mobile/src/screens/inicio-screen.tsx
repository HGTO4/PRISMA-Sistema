import { StyleSheet, View } from "react-native";

import { Header } from "@/components/header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export function InicioScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header
        title="Panel de control"
        subtitle="Resumen general del sistema de facturación"
      />
      <View style={styles.body}>
        <ThemedText themeColor="textSecondary">
          El resumen del negocio llega más adelante.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { padding: Spacing.three, alignItems: "center" },
});
