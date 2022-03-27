import { identityFunc } from "../identityFunc";
import { ObjectUtils } from "../ObjectUtils";
import { Identity, RawVariants, OutVariant } from "../types";
import { variantFactory } from "../variantFactory";

export const variant = variantFactory("type");

export default function variantModule<TVariants extends RawVariants>(variants: TVariants) {
	return ObjectUtils.keys(variants).reduce((acc, key) => {
		return {
			...acc,
			[key]: variant(
				key as string,
				typeIs(variants[key], "function") ? (variants[key] as Callback) : identityFunc,
			),
		};
	}, {} as Identity<OutVariant<TVariants>>);
}
