import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlturaBarraWeb, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export function Header({ title, subtitle, onBack }: HeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const espacioBarra = Platform.OS === "web" ? AlturaBarraWeb : 0;

  return (
    <View style={{ paddingTop: insets.top + espacioBarra + Spacing.four }}>
      <View style={styles.interior}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={8} style={styles.volver}>
            <Text style={[styles.volverTexto, { color: theme.primary }]}>
              ‹ Volver
            </Text>
          </Pressable>
        ) : null}
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interior: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: Spacing.one,
    fontSize: 15,
  },
  volver: {
    marginBottom: Spacing.two,
  },
  volverTexto: {
    fontSize: 15,
    fontWeight: "600",
  },
});
