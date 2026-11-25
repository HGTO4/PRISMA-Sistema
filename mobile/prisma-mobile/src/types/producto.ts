export interface Producto {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  iva: number;
  activo: boolean;
  fechaAlta: string;
}

export type ProductoGuardar = Omit<Producto, "id" | "activo" | "fechaAlta">;

// Los campos del formulario son siempre texto: lo que escribe el usuario.
// Mismas claves que ProductoGuardar, pero todas de tipo texto.
export type ProductoForm = { [Campo in keyof ProductoGuardar]: string };

export type ErroresProductoForm = Partial<Record<keyof ProductoForm, string>>;
