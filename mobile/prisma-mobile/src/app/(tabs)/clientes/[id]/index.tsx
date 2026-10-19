import { ClienteDetalleScreen } from "@/screens/cliente-detalle-screen";
import { useLocalSearchParams } from "expo-router";

export default function ClienteDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ClienteDetalleScreen id={Number(id)} />;
}
