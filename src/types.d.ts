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
