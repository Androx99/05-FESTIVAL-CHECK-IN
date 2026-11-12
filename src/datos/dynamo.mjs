import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

export const MAX_ID_LONG = 9223372036854775807n;
export const MAX_INTENTOS_ID = 5;
export const GRUPO_EVENTOS = 'EVENTO';
export const GRUPO_NUMEROS_INSCRIPCION = 'NUMERO_INSCRIPCION';

export const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
export const TABLA_EVENTOS_FCI = process.env.FCI_TABLA_EVENTOS;
export const TABLA_INSCRIPCIONES_FCI = process.env.FCI_TABLA_INSCRIPCIONES;

export async function obtenerSiguienteIdGuardado(grupo) {
  const { Items = [] } = await db.send(new QueryCommand({
    TableName: TABLA_EVENTOS_FCI,
    KeyConditionExpression: 'TIPO_REGISTRO = :grupo',
    ExpressionAttributeValues: { ':grupo': grupo },
    ScanIndexForward: false,
    Limit: 1,
    ConsistentRead: true
  }));

  const maximo = BigInt(Items[0]?.EVENT_ID ?? 0);
  if (maximo >= MAX_ID_LONG) throw new Error('Se alcanzó el máximo del identificador');
  return maximo + 1n;
}