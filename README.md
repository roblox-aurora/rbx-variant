<div align="center">
    <img src="https://i.imgur.com/N4HT9Gj.png" width="200"/>
    <h1>Variant (<i>for Roblox</i>)</h1>
    <p>This is a roblox typescript variant (heh, pun) of <a href="https://github.com/paarthenon/variant">Variant</a>. See the <a href="https://paarthenon.github.io/variant/docs/intro">Variant documentation</a> on how to use Variant.</p>
</div>


> [A variant type](https://reasonml.github.io/docs/en/variant) is like an enum but each case can hold some extra data.

```bash
npm i --save @rbxts/variant
```

As per the [original repo](https://github.com/paarthenon/variant) description - Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

## [Documentation](https://paarthenon.github.io/variant/)

## Example usage
```ts
import { variantModule, TypeNames, VariantOf, fields, match } from "@rbxts/variant";

export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, furnitureDamaged: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});

export type Animal<T extends TypeNames<typeof Animal> = undefined>
    = VariantOf<typeof Animal, T>;

const aDog = Animal.dog({name: "Wally"}); // will result in a discriminate value of { type: "dog", name: "Wally" }
const aCat = Animal.cat({name: "Whiskers", furnitureDamaged: true}); // will result in a discriminate value of { type: "cat", name: "Whiskers", 
const aSnake = Animal.snake("Nyx", "dotted")

const describeAnimal = (animal: Animal) => match(animal, {
    cat: ({name}) => `${name} is sleeping on a sunlit window sill.`,
    dog: ({name, favoriteBall}) => [
        `${name} is on the rug`,
        favoriteBall ? `nuzzling a ${favoriteBall} ball.` : '.' 
    ].join(' '),
    snake: s => `${s.name} is enjoying the heat of the lamp on his ${s.pattern} skin`,
});

print(describeAnimal(aDog)) //  Wally is on the rug
print(describeAnimal(aCat)) // Whiskers is sleeping on a sunlit window sill.
print(describeAnimal(aSnake)) // Nyx is enjoying the heat of the lamp on his spotted skin
```

## Supports
Functions
- [x] `cast`
- [x] `isOfVariant`
- [x] `keys`
- [x] `keymap`
- [x] `lookup`
- [x] `match`
- ~~`matchElse`~~ (deprecated in main lib, so not included)
- [x] `narrow`
- [x] `outputTypes`
- [x] `partialLookup`
- ~~`partialMatch`~~ (deprecated in main lib, so not included)

Variant Creation
- [x] `variant`
- [x] `fields`
- [x] `payload`
- [x] `variantFactory`
- [x] `variantList`
- [x] `variantModule`

Types
- [x] `Flags<T>`
- [x] `Handler<T>`
- [x] `KeysOf<T>`
- [x] `Lookup<T, U>`
- [x] `Matrix<T>`
- [x] `TypeNames<T>`
- [x] `VariantCreator<T, F, K?>`
- [x] `VariantModule<K>`
- [x] `VariantOf<T>`
- [x] `TypeExt<K, T>`
- ~~`WithProperty<K, T>`~~ (deprecated in main lib, so not included)

## Credits
Thanks to [Paarth](https://github.com/paarthenon) for creating this awesome library for vanilla TypeScript, without their awesome work this would not exist.