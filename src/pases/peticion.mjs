export function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body, (_name, value) =>
      typeof value === 'bigint' ? value.toString() : value)
  };
}

export async function handleRequest(event, operation) {
  try {
    const { eventId: routeId, userId } = event.pathParameters;
    const eventId = BigInt(routeId);
    return await operation({ eventId, userId });
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return json(409, { message: 'La operación no se puede aplicar a este estado' });
    }
    console.error(error.name, error.message);
    return json(500, { message: 'Revisa los logs de la función' });
  }
}
