import { router, type Href } from "expo-router";

// Vuelve a la pantalla anterior. Si no hay (por ejemplo, se abrió un enlace
// directo en la web), va a la ruta de respaldo.
export function volverOIr(rutaDeRespaldo: Href) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(rutaDeRespaldo);
  }
}
