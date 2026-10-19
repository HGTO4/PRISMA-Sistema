import { ScrollView, StyleSheet, View } from "react-native";

import { ClienteFormulario } from "@/components/cliente-formulario";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useActualizarCliente, useCliente } from "@/hooks/use-clientes";
import type { ClienteGuardar } from "@/types/cliente";
import { aFormulario } from "@/utils/cliente-formulario";
import { volverOIr } from "@/utils/navegacion";

interface ClienteEditarScreenProps {
  id: number;
}

export function ClienteEditarScreen({ id }: ClienteEditarScreenProps) {
  const { data: cliente, isPending, error, refetch } = useCliente(id);
  const actualizarCliente = useActualizarCliente(id);

  const volverAlDetalle = () =>
    volverOIr({ pathname: "/clientes/[id]", params: { id } });

  const guardar = (datos: ClienteGuardar) => {
    actualizarCliente.mutate(datos, { onSuccess: volverAlDetalle });
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Editar cliente"
        subtitle={cliente?.nombre}
        onBack={volverAlDetalle}
      />

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <EstadoDeCarga
            cargando={isPending}
            error={error}
            onReintentar={() => refetch()}
          />

          {cliente ? (
            <ClienteFormulario
              valoresIniciales={aFormulario(cliente)}
              textoBoton="Guardar cambios"
              guardando={actualizarCliente.isPending}
              errorServidor={actualizarCliente.error?.message ?? null}
              onGuardar={guardar}
              onCancelar={volverAlDetalle}
            />
          ) : null}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
  },
});
