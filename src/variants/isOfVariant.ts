import { ObjectUtils } from "../ObjectUtils";
import { Outputs, SumType, VariantModule } from "../types";

export function outputTypes<T extends { [name: string]: Outputs<string, string> }>(
	variantObject: T,
): T[keyof T]["type"][] {
	return ObjectUtils.keys(variantObject).map((key) => variantObject[key].type);
}

type AnyObject = { [P in string]: defined };

export function isOfVariant<T extends VariantModule<K>, K extends string = "type">(
	instance: unknown,
	variant: T,
	typeKey?: K,
): instance is SumType<T, K> {
	return (
		instance !== undefined &&
		outputTypes(variant).some(
			(variantType) => variantType === (instance as AnyObject)[(typeKey as string | undefined) ?? "type"],
		)
	);
}
