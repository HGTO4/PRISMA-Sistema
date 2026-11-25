import { Boton } from "@/components/boton";
import { DatoFila } from "@/components/dato-fila";
import { EstadoDeCarga } from "@/components/estado-de-carga";
import { Pantalla } from "@/components/pantalla";
import { Spacing } from "@/constants/theme";
import { useCambiarEstadoProducto, useProducto } from "@/hooks/use-productos";
import { useTheme } from "@/hooks/use-theme";
import { confirmar } from "@/utils/confirmar";
import { formatearMoneda } from "@/utils/formato";
import { volverOIr } from "@/utils/navegacion";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface ProductoDetalleScreenProps {
  id: number;
}

export function ProductoDetalleScreen({ id }: ProductoDetalleScreenProps) {
  const theme = useTheme();
  const { data: producto, isPending, error, refetch } = useProducto(id);
  const cambiarEstado = useCambiarEstadoProducto();

  const alternarEstado = () => {
    if (!producto) return;

    if (producto.activo) {
      confirmar(
        "Dar de baja",
        `¿Querés dar de baja "${producto.descripcion}"? Lo podés reactivar después.`,
        "Dar de baja",
        () => cambiarEstado.mutate({ id, activo: false }),
      );
    } else {
      cambiarEstado.mutate({ id, activo: true });
    }
  };

  const subtitulo = producto
    ? producto.activo
      ? "Producto activo"
      : "Producto inactivo"
    : undefined;

  return (
    <Pantalla
      titulo={producto?.descripcion ?? "Producto"}
      subtitulo={subtitulo}
      onBack={() => volverOIr("/productos")}
    >
      <EstadoDeCarga
        cargando={isPending}
        error={error}
        onReintentar={() => refetch()}
      />

      {producto ? (
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
            <DatoFila etiqueta="Código" valor={producto.codigo} />
            <DatoFila etiqueta="Descripción" valor={producto.descripcion} />
            <DatoFila
              etiqueta="Precio"
              valor={formatearMoneda(producto.precio)}
            />
            <DatoFila etiqueta="IVA" valor={`${producto.iva}%`} />
            <DatoFila
              etiqueta="Fecha de alta"
              valor={new Date(producto.fechaAlta).toLocaleDateString("es-AR")}
            />
          </View>

          <View style={styles.acciones}>
            <Boton
              titulo="Editar"
              variante="secundario"
              onPress={() =>
                router.push({
                  pathname: "/productos/[id]/editar",
                  params: { id: producto.id },
                })
              }
            />
            <Boton
              titulo={producto.activo ? "Dar de baja" : "Reactivar"}
              variante={producto.activo ? "peligro" : "principal"}
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
