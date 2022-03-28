import { ExtractOfUnion, Property } from "../types";

/**
 * Set a variable's type to a new case of the same variant.
 * @param obj object of concern.
 * @param _type new type tag. Restricted to keys of the variant.
 * @param _typeKey discriminant key.
 */
export function cast<O extends Property<K, string>, T extends O[K], K extends string = "type">(
	obj: O,
	_type: T,
	_typeKey?: K,
) {
	return obj as ExtractOfUnion<O, T, K>;
}
