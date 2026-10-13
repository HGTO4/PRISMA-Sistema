import { useSyncExternalStore } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

const noSuscribirse = () => () => {};
/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const yaHidratado = useSyncExternalStore(
    noSuscribirse,
    () => true,
    () => false,
  );

  const colorScheme = useRNColorScheme();

  return yaHidratado ? colorScheme : "light";
}
