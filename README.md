<div align="center">
    <img src="https://i.imgur.com/N4HT9Gj.png" width="200"/>
    <h1>Variant (<i>for Roblox</i>) [WIP]</h1>
    <p>This is a roblox typescript variant (heh, pun) of <a href="https://github.com/paarthenon/variant">Variant</a>. See the <a href="https://paarthenon.github.io/variant/docs/intro">Variant documentation</a> on how to use Variant.</p>
</div>

Over time features may be added from the original library, and roblox-specific features may be added.


## Example usage
```ts
import { variantModule } from "@rbxts/variant";

export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, furnitureDamaged: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});

const aDog = Animal.dog({name: "Wally"}); // will result in a discriminate value of { type: "dog", name: "Wally" }
const aCat = Animal.cat({name: "Whiskers", furnitureDamaged: true}); // will result in a discriminate value of { type: "cat", name: "Whiskers", furnitureDamaged: true }
```

## Supports
Functions
- [ ] `cast`
- [ ] `isOfVariant`
- [ ] `keys`
- [ ] `keymap`
- [ ] `lookup`
- [ ] `match`
- [ ] `matchElse`
- [ ] `narrow`
- [ ] `outputTypes`
- [ ] `partialLookup`
- [ ] `partialMatch`

Variant Creation
- [x] `variant`
- [x] `fields`
- [ ] `payload`
- [x] `variantFactory`
- [ ] `variantList`
- [x] `variantModule`

Types
- [ ] `Flags<T>`
- [ ] `Handler<T>`
- [ ] `KeysOf<T>`
- [ ] `Lookup<T, U>`
- [ ] `Matrix<T>`
- [ ] `TypeNames<T>`
- [x] `VariantCreator<T, F, K?>`
- [ ] `VariantModule<K>`
- [ ] `VariantOf<T>`
- [ ] `TypeExt<K, T>`
- [ ] `WithProperty<K, T>`

## TODO:
- [ ] Luau Coverage/unit testing (using Luau-CLI)
