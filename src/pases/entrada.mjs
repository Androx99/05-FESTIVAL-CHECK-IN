import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { db, TABLA_INSCRIPCIONES_FCI } from '../datos/dynamo.mjs';
import { handleRequest, json } from './peticion.mjs';

export function handler(event) {
  return handleRequest(event, checkIn);
}

async function checkIn(key) {
  // Fase Entrada: actualiza una inscripción existente.
  return json(501, { message: 'Entrada por construir' });
}
