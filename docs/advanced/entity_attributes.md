# Entity Attributes (EBAttributes)

Electroblob's Wizardry Redux provides a set of attributes under the `cast.*` namespace. These attributes interact directly with the [Spell Modifiers](/advanced/spell_modifiers) to modify the spell cast values.

These are limits and values are shared between all these attributes.

- default value: `0`
- minimum: `-100`
- maximum: `100`
- synchronized to clients

Some attributes may not work with some spells because they aren't compatible, in that case you won't see any change when applying the modifiers, for example, modifying cast range won't have any effect in most buff spells (spells that gives the caster a set of status effects). Some spells may interact differently with these attributes between each other, for example, modifying cast range can have an increase/decrease of projectile range or/and projectile speed. 

## Attributes

- `cast.potency`: how strong a spell effect is. (mayor values tend to be more damage and minor values less damage)
- `cast.cost`: mana cost modifier for casting. (mayor values are more cast cost and minor values less cast cost)
- `cast.chargeup`: cast charge-up time modifier. (mayor values are more cast charge up and minor values less cast charge up)
- `cast.progression`: progression or scaling modifier for spells. (mayor values increase wand's level progression and minor values less progression)
- `cast.duration`: duration modifier for timed spells. (mayor values tend to increase time duration and minor values decrease time duration)
- `cast.blast`: area/impact radius modifier. (mayor/minor values tend to affect area range of some spells)
- `cast.range`: reach/range modifier for spells. (mayor values tend to increase the spell's range and minor values decrease spell's range)
- `cast.cooldown`: cooldown modifier after casting. (mayor/minor values modify the cast cooldown after casting the spell)

## Conditions

These attributes are compatible with the custom attribute modifier system for adding spell conditions, for more info, check [Magic Attribute Command](/advanced/command/magic_attribute)