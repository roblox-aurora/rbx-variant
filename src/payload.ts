/**
 * Take a single variable of type T and store as 'payload'
 */
export function payload<T>(_example?: T) {
	return (payload: T) => ({ payload });
}
