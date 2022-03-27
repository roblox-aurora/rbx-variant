export namespace ObjectUtils {
	export function keys<T extends object>(value: T): Array<keyof T> {
		const values = new Array<keyof T>();
		for (const [key] of pairs(value)) {
			values.push(key as keyof T);
		}
		return values;
	}
}

export type Identity<T> = T extends object
	? {} & {
			[P in keyof T]: T[P];
	  }
	: T;

type CleanResult<T, U> = T extends undefined ? U : T extends Callback ? T : T extends object ? U : T;

export type OutVariant<T extends RawVariants> = {
	[P in keyof T & string]: VariantCreator<P, CleanResult<T[P], () => {}>>;
};
export type RawVariants = Record<string, Callback | {}>;

export type Outputs<K, T> = {
	key: K;
	type: T;
};

/**
 * A type representing an object with a single property.
 *  - `Property<K, T>` evaluates to `{ [K: string]: T }`
 */
export declare type Property<K extends string, T> = K extends keyof (infer LitK)
	? {
			[P in keyof LitK]: T;
	  }
	: never;

/**
 * The constructor for one tag of a variant type.
 *
 *  - `T` extends `string` — The literal string used as the type
 *  - `F` extends `(...args: any[]) => {}` = `() => {}` — The function that serves as the variant's *body definition*
 *  - `K` extends `string` = `'type'` — The discriminant
 */
export declare type VariantCreator<
	T extends string,
	F extends (...args: any[]) => {} = () => {},
	K extends string = "type",
> = ((...args: Parameters<F>) => Identity<Property<K, T> & ReturnType<F>>) & Outputs<K, T>;

export function fields<T>(defaults: Partial<T> = {}): (input: T) => Identity<T> {
	return (input: T): Identity<T> => {
		return { ...defaults, ...input } as Identity<T>;
	};
}

function identityFunc<T>(x = {} as T) {
	return x as T extends unknown ? {} : T;
}

export function variantFactory<K extends string>(key: K) {
	// Type fuckery ensues.
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
