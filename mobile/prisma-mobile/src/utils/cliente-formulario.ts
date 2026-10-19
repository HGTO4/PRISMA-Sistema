import type {
  Cliente,
  ClienteForm,
  ClienteGuardar,
  ErroresClienteForm,
} from "@/types/cliente";

export const formularioVacio: ClienteForm = {
  nombre: "",
  cuit: "",
  dni: "",
  direccion: "",
  localidad: "",
  provincia: "",
  codigoPostal: "",
  telefono: "",
  email: "",
};

// Mismos límites que el backend (ClienteGuardarDto)
export const LONGITUD_MAXIMA: Record<keyof ClienteForm, number> = {
  nombre: 150,
  cuit: 13,
  dni: 8,
  direccion: 200,
  localidad: 100,
  provincia: 100,
  codigoPostal: 10,
  telefono: 30,
  email: 150,
};

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarFormulario(form: ClienteForm): ErroresClienteForm {
  const errores: ErroresClienteForm = {};

  if (form.nombre.trim() === "") {
    errores.nombre = "El nombre es obligatorio";
  }

  if (form.email.trim() !== "" && !FORMATO_EMAIL.test(form.email.trim())) {
    errores.email = "El email no es válido";
  }

  return errores;
}

// Un campo vacío se manda como null, no como texto vacío
const textoONulo = (valor: string): string | null => {
  const limpio = valor.trim();
  return limpio === "" ? null : limpio;
};

export function aClienteGuardar(form: ClienteForm): ClienteGuardar {
  return {
    nombre: form.nombre.trim(),
    cuit: textoONulo(form.cuit),
    dni: textoONulo(form.dni),
    direccion: textoONulo(form.direccion),
    localidad: textoONulo(form.localidad),
    provincia: textoONulo(form.provincia),
    codigoPostal: textoONulo(form.codigoPostal),
    telefono: textoONulo(form.telefono),
    email: textoONulo(form.email),
  };
}

export function aFormulario(cliente: Cliente): ClienteForm {
  return {
    nombre: cliente.nombre,
    cuit: cliente.cuit ?? "",
    dni: cliente.dni ?? "",
    direccion: cliente.direccion ?? "",
    localidad: cliente.localidad ?? "",
    provincia: cliente.provincia ?? "",
    codigoPostal: cliente.codigoPostal ?? "",
    telefono: cliente.telefono ?? "",
    email: cliente.email ?? "",
  };
}
