import { ClienteFormulario } from "@/components/cliente-formulario";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useCrearCliente } from "@/hooks/use-clientes";
import type { ClienteGuardar } from "@/types/cliente";
import { formularioVacio } from "@/utils/cliente-formulario";
import { volverOIr } from "@/utils/navegacion";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export function ClienteNuevoScreen() {
  const crearCliente = useCrearCliente();

  const guardar = (datos: ClienteGuardar) => {
    crearCliente.mutate(datos, {
      onSuccess: (creado) =>
        router.replace({
          pathname: "/clientes/[id]",
          params: { id: creado.id },
        }),
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Nuevo Cliente"
        subtitle="Completá los datos"
        onBack={() => volverOIr("/clientes")}
      />

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <ClienteFormulario
            valoresIniciales={formularioVacio}
            textoBoton="Guardar Cliente"
            guardando={crearCliente.isPending}
            errorServidor={crearCliente.error?.message ?? null}
            onGuardar={guardar}
            onCancelar={() => volverOIr("/clientes")}
          />
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
