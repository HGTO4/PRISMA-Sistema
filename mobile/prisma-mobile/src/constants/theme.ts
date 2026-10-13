import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1e293b",
    textSecondary: "#64748b",
    background: "#f4f6f9",
    backgroundElement: "#ffffff",
    backgroundSelected: "#e8efff",
    border: "#e5e7eb",
    primary: "#2563eb",
    danger: "#dc2626",
    dangerSoft: "#fee2e2",
  },
  dark: {
    text: "#e2e8f0",
    textSecondary: "#94a3b8",
    background: "#0f172a",
    backgroundElement: "#1e293b",
    backgroundSelected: "#233554",
    border: "#334155",
    primary: "#60a5fa",
    danger: "#f87171",
    dangerSoft: "#3f1d1d",
  },
} as const;

export const AppColors = {
  navy: "#182848",
  navyLight: "#243b55",
  success: "#16a34a",
} as const;

export const AlturaBarraWeb = 80;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1100;
