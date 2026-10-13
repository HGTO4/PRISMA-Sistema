const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5237";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// Forma de los errores que devuelve la API
interface ErrorDeApi {
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

async function leerMensajeDeError(response: Response): Promise<string> {
  const porDefecto = `Error ${response.status}`;
  try {
    const body: ErrorDeApi = await response.json();

    //Errores de regla de negocio: {title, detail}
    if (body.detail) return body.detail;

    //Errores de validacion automatica: {errors: {Campo: ["mensaje"]}}
    const primerError = Object.values(body.errors ?? {})[0]?.[0];
    if (primerError) return primerError;

    return body.title ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-type": "application/json", ...options.headers },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await leerMensajeDeError(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
