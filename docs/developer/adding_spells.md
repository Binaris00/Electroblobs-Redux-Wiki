# Adding Spells

## Prerequisites

- Well understanding of Java and OOP
- Knowledge of how to mod loader can manage registries and events
- Understanding of how you can data gen files in your mod loader

## Explaining the Spell system

### Spell class

::: info
By default, spells are processed on the server and mirrored to clients when `requiresPacket()` returns true. Normally you will keep this to true, but if your spell's logic is purely server-side you can override this to return false.
:::

Spell is a basic blueprint which every spell added with EBWR is based on. Providing main entry points to handle different cast contexts (Player casting, NPC casting and block position casting from commands or dispensers), data driven methods to add/call [Spell Properties](/advanced/spell_properties) and simple sound helpers for easy call/registry.

With this system you can create pretty much any spell, even without using EBWR's built-in Spell subclasses, if you translate your new content to the spell caster item logic (or you can create your own casting system to use your own system!).

::: tip
Example: you can stick with the Spell utilities to create a spell to "load and create a fireball to attack enemies", but with a custom cast context to handle multiple entity casting and creating a custom spell cast item you can create a "load and charge a fireball with nearby players to attack enemies".
:::

The basic Spell system comes with some rules for allowing consistency and compatibility with the EBWR environment:

- use SpellProperties! This is made to handle easy config integration for both devs and users, allowing modpack and user configuration for your spells

- Even when using a Spell subclass, you should override `properties()` method to return the actual properties of your spell, with this you can allow easy data gen SpellProperties files and easy config for users. (without this, your spell won't have an [element](/main/extra/element) and [spell tier](/main/extra/spell_tier)!)

- (In case your Spell subclass need this) Override `cast()` method for handling the cast process for players, in case your spell will be able to be casted by other contexts use: `canCastByEntity()` / `canCastByLocation()` and override the specific cast method.

- Use `playSound()` or `playSoundLoop()` for audio. Continuous spells should use `playSoundLoop()` to start the client-side loop at the first tick.

### Spell subclasses

- [Area Effect Spell](/developer/spell/area_effect_spell)
- [Arrow Spell](/developer/spell/arrow_spell)
- [Buff Spell](/developer/spell/buff_spell)
- [Conjure Item Spell](/developer/spell/conjure_item_spell)
- [Construct Range Spell](/developer/spell/construct_range_spell)
- [Construct Spell](/developer/spell/construct_spell)
- [Minion Spell](/developer/spell/minion_spell)
- [Projectile Spell](/developer/spell/projectile_spell)
- [Ray Spell](/developer/spell/ray_spell)