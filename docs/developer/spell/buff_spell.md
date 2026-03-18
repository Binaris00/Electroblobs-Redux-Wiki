# Buff Spell

Applies any mob effect(s) to the caster. You can define the mob effect(s) in the construct, also defining the color of the particle effects made by the spell.

Most of the time you won't need to create a whole new class for this!

Can be cast by spell caster entities applying the effect to themselves, and can be cast by location, applying the spell effect to the nearest entity.

For properties, we don't need any special one by default. But I recommend to any set the mob effect values with the utility methods `getEffectDurationProperty()` and `getEffectStrengthProperty`

You have a group of sparkle particles and a buff particle spawned by default when affecting to an entity by default, but you can change this if need it (the color, the particle logic and the particle count, each one separately).

Example with [Agility](/main/spell/agility) spell. This one has 2 mob effects (Speed and jump) and assign properties to let users modify its values in the spell properties system

```java
AGILITY = spell("agility", () -> new BuffSpell(0.4f, 1.0f, 0.8f, () -> MobEffects.MOVEMENT_SPEED, () -> MobEffects.JUMP).assignProperties(
        SpellProperties.builder()
                .assignBaseProperties(SpellTiers.APPRENTICE, Elements.SORCERY, SpellType.BUFF, SpellAction.POINT_UP, 20, 0, 40)
                .add(BuffSpell.getEffectDurationProperty(MobEffects.MOVEMENT_SPEED), 600)
                .add(BuffSpell.getEffectStrengthProperty(MobEffects.MOVEMENT_SPEED), 1)
                .add(BuffSpell.getEffectDurationProperty(MobEffects.JUMP), 600)
                .add(BuffSpell.getEffectStrengthProperty(MobEffects.JUMP), 1)
                .build()
));
```