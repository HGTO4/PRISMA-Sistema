import { ProductoDetalleScreen } from "@/screens/producto-detalle-screen";
import { useLocalSearchParams } from "expo-router";

export default function ProductoDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ProductoDetalleScreen id={Number(id)} />;
}
