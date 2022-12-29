import { ObjectUtils } from "../ObjectUtils";
import { CleanResult, Identity, OutVariant, RawVariants } from "../types";

type FullyFuncRawVariant<V extends RawVariants> = {
	[P in keyof V & string]: CleanResult<V[P], () => {}>;
};

function funcifyRawVariant<V extends RawVariants>(v: V) {
	return ObjectUtils.keys(v).reduce((acc, cur) => {
		return {
			...acc,
			[cur]: typeIs(v[cur], "function") ? v[cur] : () => {},
		};
	}, {}) as FullyFuncRawVariant<V>;
}

export type AugmentedRawVariant<V extends RawVariants, F extends Callback> = {
	[P in keyof V & string]: (
		...args: Parameters<FullyFuncRawVariant<V>[P]>
	) => Identity<ReturnType<F> & ReturnType<FullyFuncRawVariant<V>[P]>>;
};

export function augmented<T extends RawVariants, F extends (x: OutVariant<T>) => any>(f: F, variantDef: T) {
	const funkyDef = funcifyRawVariant(variantDef);
	return ObjectUtils.keys(funkyDef).reduce((acc, key) => {
		return {
			...acc,
			[key]: (...args: Parameters<FullyFuncRawVariant<T>[typeof key]>) => {
				const item = funkyDef[key](...args);
				return {
					...f(item),
					...item,
				};
			},
		};
	}, {}) as AugmentedRawVariant<T, F>;
}
