import { Identity } from "./types";

export function fields<T>(defaults: Partial<T> = {}): (input: T) => Identity<T> {
	return (input: T): Identity<T> => {
		return { ...defaults, ...input } as Identity<T>;
	};
}
