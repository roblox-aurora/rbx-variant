export type Identity<T> = T extends object
	? {} & {
			[P in keyof T]: T[P];
	  }
	: T;

/**
 * Given a union of types all of which meet the contract {[K]: string}
 * extract the type that is specifically {[K]: TType}
 */
export type ExtractOfUnion<T, TType extends string, K extends string = "type"> = T extends Property<K, TType>
	? T
	: never;

/**
 * Extract the key literals of a variant.
 */
export type KeysOf<T extends VariantModule<K>, K extends string = "type"> = KeyMap<T, K>[keyof T];

export type VariantOf<
	T extends VariantModule<K>,
	TType = undefined,
	K extends string = "type",
> = TType extends undefined
	? SumType<T, K>
	: TType extends KeysOf<T, K>
	? ExtractOfUnion<SumType<T, K>, TType, K>
	: SumType<T, K>;

export type KeyMap<T extends VariantModule<K>, K extends string = "type"> = {
	[Label in keyof T]: T[Label] extends VariantCreator<infer TypeStr, Callback, K> ? TypeStr : never;
};

/**
 * A variant module definition. Literally an object to group together
 * a set of variant constructors.
 */
export type VariantModule<K extends string = "type"> = {
	[name: string]: VariantCreator<string, (...args: any[]) => any, K>;
};

type CleanResult<T, U> = T extends undefined ? U : T extends Callback ? T : T extends object ? U : T;

export type OutVariant<T extends RawVariants> = {
	[P in keyof T & string]: VariantCreator<P, CleanResult<T[P], () => {}>>;
};
export type RawVariants = Record<string, Callback | {}>;

export type Outputs<K, T> = {
	key: K;
	type: T;
};

export type Creators<VM extends VariantModule<K>, K extends string = "type"> = {
	[P in keyof VM]: VM[P] extends VariantCreator<string, Callback, K> ? VM[P] : never;
};

/**
 * Extract the data type from a function, whether it returns the
 * object directly or does so with a promise.
 */
export type GetDataType<T extends VariantModule<K>, K extends string = "type"> = {
	[P in keyof T]: ReturnType<T[P]> extends PromiseLike<infer R>
		? R extends Property<K, string>
			? R
			: never
		: ReturnType<T[P]>;
};

type InternalVariantsOf<VM extends VariantModule<K>, K extends string = "type"> = GetDataType<Creators<VM, K>, K>;

export type SumType<T extends VariantModule<K>, K extends string = "type"> = InternalVariantsOf<T, K>[keyof T];

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
