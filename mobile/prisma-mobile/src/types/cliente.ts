export interface Cliente {
  id: number;
  nombre: string;
  cuit: string | null;
  dni: string | null;
  direccion: string | null;
  localidad: string | null;
  provincia: string | null;
  codigoPostal: string | null;
  telefono: string | null;
  email: string | null;
  fechaAlta: string;
  activo: boolean;
}

export type ClienteGuardar = Omit<Cliente, "id" | "fechaAlta" | "activo">;
export type EstadoFiltro = "activos" | "inactivos" | "todos";

// Formulario
// Los campos del formulario son siempre texto: lo que escribe el usuario
export type ClienteForm = { [Campo in keyof ClienteGuardar]: string }; // un objeto con las mismas claves que ClienteGuardar, pero todas de tipo texto
export type ErroresClienteForm = Partial<Record<keyof ClienteForm, string>>; // un objeto que puede tener un mensaje de error por cada campo, pero no hace falta que los tenga todos
