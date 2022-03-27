export namespace ObjectUtils {
	export function keys<T extends object>(value: T): Array<keyof T> {
		const values = new Array<keyof T>();
		for (const [key] of pairs(value)) {
			values.push(key as keyof T);
		}
		return values;
	}
}
