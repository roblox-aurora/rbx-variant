import { ObjectUtils } from "../ObjectUtils";
import { KeyMap, VariantModule } from "../types";

/**
 * A variant module does not *necessarily* have a 1-1 mapping from
 * the key used to refer to the object (Animal.bird) and the key generated
 * by the variant (ANIMAL_BIRD, @animal/bird, etc.).
 * @param v
 */
export function keymap<T extends VariantModule<K>, K extends string = "type">(v: T): KeyMap<T, K> {
	return ObjectUtils.keys(v).reduce((acc, key) => {
		return {
			...acc,
			[key]: v[key].type,
		};
	}, {} as KeyMap<T, K>);
}
