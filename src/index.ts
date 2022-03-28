import { fields } from "./fields";
import { Lookup, lookup, partialLookup } from "./lookup";
import { Handler, match } from "./match";
import { payload } from "./payload";
import { Flags, KeysOf, Matrix, TypeExt, TypeNames, VariantCreator, VariantModule, VariantOf } from "./types";
import { variantFactory } from "./variantFactory";
import variantModule, { variant } from "./variants";
import { cast } from "./variants/cast";
import { isOfVariant, outputTypes } from "./variants/isOfVariant";
import { keymap } from "./variants/keymap";
import { keys } from "./variants/keys";
import { narrow } from "./variants/narrow";

export type { Handler, KeysOf, TypeNames, VariantCreator, VariantModule, VariantOf, TypeExt, Lookup, Matrix, Flags };

export {
	fields,
	lookup,
	partialLookup,
	match,
	variantFactory,
	variantModule,
	variant,
	cast,
	isOfVariant,
	outputTypes,
	narrow,
	keys,
	keymap,
	payload,
};

export default variantModule;
