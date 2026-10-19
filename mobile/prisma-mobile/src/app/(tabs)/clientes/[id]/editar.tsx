import { ClienteEditarScreen } from "@/screens/cliente-editar-screen";
import { useLocalSearchParams } from "expo-router";

export default function ClienteEditar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ClienteEditarScreen id={Number(id)} />;
}
