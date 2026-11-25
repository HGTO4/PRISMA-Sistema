const formatoMoneda = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

export function formatearMoneda(valor: number): string {
  return formatoMoneda.format(valor);
}
