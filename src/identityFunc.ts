export function identityFunc<T>(x = {} as T) {
	return x as T extends unknown ? {} : T;
}
