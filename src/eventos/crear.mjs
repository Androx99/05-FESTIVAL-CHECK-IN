import { PutCommand } from '@aws-sdk/lib-dynamodb';
import {
  db, GRUPO_EVENTOS, MAX_INTENTOS_ID, TABLA_EVENTOS_FCI, obtenerSiguienteIdGuardado
} from '../datos/dynamo.mjs';

export async function handler({ title } = {}) {
  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Indica el título del evento');
  }
  const titulo = title.trim();

  for (let intento = 0; intento < MAX_INTENTOS_ID; intento++) {
    const eventId = await obtenerSiguienteIdGuardado(GRUPO_EVENTOS);
    try {
      await db.send(new PutCommand({
        TableName: TABLA_EVENTOS_FCI,
        Item: { TIPO_REGISTRO: GRUPO_EVENTOS, EVENT_ID: eventId, TITLE: titulo },
        ConditionExpression: 'attribute_not_exists(EVENT_ID)'
      }));
      return { eventId: eventId.toString(), title: titulo };
    } catch (error) {
      if (error.name !== 'ConditionalCheckFailedException') throw error;
    }
  }

  throw new Error('No se pudo asignar un número de evento. Vuelve a intentarlo.');
}
