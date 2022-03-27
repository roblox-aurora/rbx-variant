import { variant } from ".";
import { VariantCreator } from "../types";

/**
 * Reduce an object to just elements that are `VariantCreator`s
 */
type FilterVariants<T, Type extends string, K extends string = any> = T extends VariantCreator<Type, Callback, K>
	? T
	: never;

/**
 * Convert entries for a `variantList` to the same type.
 */
type Variantify<T extends validListType> = T extends string ? VariantCreator<T> : T;

/**
 * A valid entry for `variantList`
 */
type validListType = VariantCreator<any, Callback, any> | string;

export type VariantModuleFromList<T extends validListType> = {
	[P in Variantify<T>["type"]]: FilterVariants<Variantify<T>, P>;
};

/**
 * Create a variant module based on a list of variants.
 *
 * @remarks
 * Best way to create groups of pre-existing variants.
 *
 * @param variants a list of variant creators and `string`s for tags that have no body
 */
export function variantList<T extends validListType>(variants: Array<T>): VariantModuleFromList<T> {
	return variants
		.map((v): VariantCreator<string> => {
			if (typeIs(v, "string")) {
				return variant(v);
			} else {
				return v as VariantCreator<string>;
			}
		})
		.reduce(
			(o, v) => ({
				...o,
				[v.type]: v,
			}),
			{} as VariantModuleFromList<T>,
		);
}
