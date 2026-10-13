import { LinearGradient } from "expo-linear-gradient";
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AlturaBarraWeb,
  AppColors,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: "100%" }} />

      <TabList asChild>
        <BarraNavegacion>
          <TabTrigger name="index" href="/" asChild>
            <TabButton>Inicio</TabButton>
          </TabTrigger>

          <TabTrigger name="clientes" href="/clientes" asChild>
            <TabButton>Clientes</TabButton>
          </TabTrigger>
        </BarraNavegacion>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.enlace,
        isFocused && styles.enlaceActivo,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.textoEnlace, isFocused && styles.textoEnlaceActivo]}>
        {children}
      </Text>
    </Pressable>
  );
}

export function BarraNavegacion(props: TabListProps) {
  return (
    <View {...props} style={styles.contenedor}>
      <LinearGradient
        colors={[AppColors.navy, AppColors.navyLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.barra}
      >
        <View style={styles.interior}>
          <Text style={styles.marca}>PRISMA</Text>
          {props.children}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  barra: {
    height: AlturaBarraWeb,
    justifyContent: "center",
  },
  interior: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
  },
  marca: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: Spacing.four,
  },
  enlace: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
  },
  enlaceActivo: {
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  textoEnlace: {
    fontSize: 15,
    color: "rgba(255,255,255,0.78)",
  },
  textoEnlaceActivo: {
    color: "#FFFFFF",
  },
  pressed: {
    opacity: 0.7,
  },
});
