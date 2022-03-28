import { KeysOf, VariantModule } from "../types";
import { outputTypes } from "./isOfVariant";

/**
 * Utility function to create a K:V from a list of strings
 *
 * Taken from: https://basarat.gitbook.io/typescript/type-system/literal-types#string-based-enums
 * */
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
	return o.reduce((res, key) => {
		res[key] = key;
		return res;
	}, {} as { [K in T]: K });
}

/**
 * Return an object cache (`{[P]: P}`) of the keys.
 *
 * An object cache is more useful than an array because you can do
 * constant time checks and you can still reduce to a well-typed
 * array with Object.keys
 * @param variantDef
 */
export function keys<T extends VariantModule>(variantDef: T): { [P in KeysOf<T>]: P } {
	return strEnum(outputTypes(variantDef)) as { [P in KeysOf<T>]: P };
}
