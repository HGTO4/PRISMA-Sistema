import { useState } from "react";

type Errores<Form> = Partial<Record<keyof Form, string>>;

interface OpcionesFormulario<Form, Datos> {
  valoresIniciales: Form;
  validar: (valores: Form) => Errores<Form>;
  convertir: (valores: Form) => Datos;
}

export function useFormulario<Form extends Record<string, string>, Datos>({
  valoresIniciales,
  validar,
  convertir,
}: OpcionesFormulario<Form, Datos>) {
  const [valores, setValores] = useState<Form>(valoresIniciales);
  const [errores, setErrores] = useState<Errores<Form>>({});

  const cambiar = (campo: keyof Form) => (texto: string) => {
    setValores((anterior) => ({ ...anterior, [campo]: texto }));
  };

  const enviar = (onEnviar: (datos: Datos) => void) => {
    const erroresEncontrados = validar(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      return;
    }

    onEnviar(convertir(valores));
  };

  return { valores, errores, cambiar, enviar };
}
