import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { db, GRUPO_EVENTOS, TABLA_EVENTOS_FCI, TABLA_INSCRIPCIONES_FCI } from '../datos/dynamo.mjs';
import { handleRequest, json } from './peticion.mjs';

export function handler(event) {
  return handleRequest(event, getPass);
}

async function getPass(key) {
  // Fase Lectura: consulta el evento y la inscripción.
  return json(501, { message: 'Lectura por construir' });
}
