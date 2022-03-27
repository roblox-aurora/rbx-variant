import { identityFunc } from "./identityFunc";
import { VariantCreator } from "./types";

export function variantFactory<K extends string>(key: K) {
	/**
	 * Define a case of a variant type.
	 * @param tag the name of this case. Also known as the tag, label, or discriminant.
	 * @returns a function `() => {type: tag}`.
	 */
	function variantFunc<T extends string>(tag: T): VariantCreator<T, () => {}, K>;
	/**
	 * Define a case of a variant type with some body.
	 * @param tag the name of this case. Also known as the tag, label, or discriminant.
	 * @param func The constructor function for the variant.
	 * @returns a function `(...args: Parameters<typeof func>) => {type: tag} & ReturnType<typeof func>`.
	 */
	function variantFunc<T extends string, F extends Callback>(tag: T, func: F): VariantCreator<T, F, K>;
	function variantFunc<T extends string, F extends Callback>(tag: T, func?: F) {
		return setmetatable<object>(
			{
				key,
				type: tag,
			},
			{
				__call: (_, ...args) => {
					const returned = ((func as Callback) ?? identityFunc)(...(args as unknown[]));
					return {
						[key]: tag,
						...returned,
					};
				},
			},
		) as VariantCreator<T, F, K>;
	}

	return variantFunc;
}
