import { ExtractOfUnion, Property } from "../types";

/**
 *
 * @param obj object of concern.
 * @param typeId new type. Restricted to keys of the variant.
 * @param typeKey discriminant key.
 */
export function narrow<O extends Property<K, string>, T extends O[K], K extends string = "type">(
	obj: O,
	typeId: T,
	typeKey?: K,
) {
	const typeString = obj[(typeKey as string | undefined) ?? ("type" as K)];
	return typeString === typeId ? (obj as ExtractOfUnion<O, T, K>) : undefined;
}
