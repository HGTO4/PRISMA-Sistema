import type {
  ErroresProductoForm,
  Producto,
  ProductoForm,
  ProductoGuardar,
} from "@/types/producto";

export const formularioProductoVacio: ProductoForm = {
  codigo: "",
  descripcion: "",
  precio: "",
  iva: "21",
};

// Mismos límites que el backend (ProductoGuardarDto)
export const LONGITUD_MAXIMA_PRODUCTO: Record<keyof ProductoForm, number> = {
  codigo: 20,
  descripcion: 200,
  precio: 15,
  iva: 6,
};

// Acepta coma o punto como separador decimal: "1500,50" y "1500.50" valen lo mismo
export function aNumero(texto: string): number {
  return Number(texto.trim().replace(",", "."));
}

export function validarFormularioProducto(
  form: ProductoForm,
): ErroresProductoForm {
  const errores: ErroresProductoForm = {};

  if (form.codigo.trim() === "") {
    errores.codigo = "El código es obligatorio";
  }

  if (form.descripcion.trim() === "") {
    errores.descripcion = "La descripción es obligatoria";
  }

  const precio = aNumero(form.precio);
  if (form.precio.trim() === "" || Number.isNaN(precio) || precio < 0.01) {
    errores.precio = "El precio debe ser un número mayor a 0";
  }

  const iva = aNumero(form.iva);
  if (form.iva.trim() === "" || Number.isNaN(iva) || iva < 0 || iva > 100) {
    errores.iva = "El IVA debe estar entre 0 y 100";
  }

  return errores;
}

export function aProductoGuardar(form: ProductoForm): ProductoGuardar {
  return {
    codigo: form.codigo.trim(),
    descripcion: form.descripcion.trim(),
    precio: aNumero(form.precio),
    iva: aNumero(form.iva),
  };
}

// Convierte un producto de la API en los textos del formulario (para editar)
export function aFormularioProducto(producto: Producto): ProductoForm {
  return {
    codigo: producto.codigo,
    descripcion: producto.descripcion,
    precio: String(producto.precio).replace(".", ","),
    iva: String(producto.iva).replace(".", ","),
  };
}
