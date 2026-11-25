import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface PantallaProps {
  titulo: string;
  subtitulo?: string;
  onBack?: () => void;
  children: ReactNode;
}

export function Pantalla({
  titulo,
  subtitulo,
  onBack,
  children,
}: PantallaProps) {
  return (
    <ThemedView style={styles.container}>
      <Header title={titulo} subtitle={subtitulo} onBack={onBack} />

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>{children}</View>
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
});
