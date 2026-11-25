import { Boton } from "@/components/boton";
import { DatoFila } from "@/components/dato-fila";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Pantalla } from "@/components/pantalla";
import { Spacing } from "@/constants/theme";
import { useCambiarEstadoCliente, useCliente } from "@/hooks/use-clientes";
import { useTheme } from "@/hooks/use-theme";
import { confirmar } from "@/utils/confirmar";
import { volverOIr } from "@/utils/navegacion";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface ClienteDetalleScreenProps {
  id: number;
}

export function ClienteDetalleScreen({ id }: ClienteDetalleScreenProps) {
  const theme = useTheme();
  const { data: cliente, isPending, error, refetch } = useCliente(id);

  const cambiarEstado = useCambiarEstadoCliente();

  const alternarEstado = () => {
    if (!cliente) return;

    if (cliente.activo) {
      confirmar(
        "Dar de baja",
        `¿Querés dar de baja a ${cliente.nombre}? Lo podés reactivar después.`,
        "Dar de baja",
        () => cambiarEstado.mutate({ id, activo: false }),
      );
    } else {
      cambiarEstado.mutate({ id, activo: true });
    }
  };

  const subtitulo = cliente
    ? cliente.activo
      ? "Cliente activo"
      : "Cliente inactivo"
    : undefined;

  return (
    <Pantalla
      titulo={cliente?.nombre ?? "Cliente"}
      subtitulo={subtitulo}
      onBack={() => volverOIr("/clientes")}
    >
      <EstadoDeCarga
        cargando={isPending}
        error={error}
        onReintentar={() => refetch()}
      />

      {cliente ? (
        <>
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
          >
            <DatoFila etiqueta="CUIT" valor={cliente.cuit} />
            <DatoFila etiqueta="DNI" valor={cliente.dni} />
            <DatoFila etiqueta="Dirección" valor={cliente.direccion} />
            <DatoFila etiqueta="Localidad" valor={cliente.localidad} />
            <DatoFila etiqueta="Provincia" valor={cliente.provincia} />
            <DatoFila etiqueta="Código postal" valor={cliente.codigoPostal} />
            <DatoFila etiqueta="Teléfono" valor={cliente.telefono} />
            <DatoFila etiqueta="Email" valor={cliente.email} />
            <DatoFila
              etiqueta="Fecha de alta"
              valor={new Date(cliente.fechaAlta).toLocaleDateString("es-AR")}
            />
          </View>

          <View style={styles.acciones}>
            <Boton
              titulo="Editar"
              variante="secundario"
              onPress={() =>
                router.push({
                  pathname: "/clientes/[id]/editar",
                  params: { id: cliente.id },
                })
              }
            />
            <Boton
              titulo={cliente.activo ? "Dar de baja" : "Reactivar"}
              variante={cliente.activo ? "peligro" : "principal"}
              deshabilitado={cambiarEstado.isPending}
              onPress={alternarEstado}
            />
            {cambiarEstado.error ? (
              <Text style={[styles.errorAccion, { color: theme.danger }]}>
                {cambiarEstado.error.message}
              </Text>
            ) : null}
          </View>
        </>
      ) : null}
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  acciones: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  errorAccion: {
    textAlign: "center",
  },
});
