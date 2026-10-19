import { Alert, Platform } from "react-native";

export function confirmar(
  titulo: string,
  mensaje: string,
  textoConfirmar: string,
  onConfirmar: () => void,
) {
  if (Platform.OS === "web") {
    if (window.confirm(`${titulo}\n\n${mensaje}`)) {
      onConfirmar();
    }
    return;
  }

  Alert.alert(titulo, mensaje, [
    { text: "Cancelar", style: "cancel" },
    { text: textoConfirmar, style: "destructive", onPress: onConfirmar },
  ]);
}
