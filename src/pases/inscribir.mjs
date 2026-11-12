import { handleRequest, json } from './peticion.mjs';

export function handler(event) {
  return handleRequest(event, register);
}

async function register(key) {
  // Fase Inscripción: crea un registro con una condición.
  return json(501, { message: 'Inscripción por construir' });
}
