import { ProductoEditarScreen } from "@/screens/producto-editar-screen";
import { useLocalSearchParams } from "expo-router";

export default function ProductoEditar() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ProductoEditarScreen id={Number(id)} />;
}
