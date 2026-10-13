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
