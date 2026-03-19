# Projectile Spell

TODO:
note/link of magic projectile entity

Spell subclass for shooting magical projectile entities (which basically are thrown item projectiles), checking things like: position, launch, modifier calculation, velocity scaling and more!

It can be cast by spell caster entities, shooting towards a target, and by location, shooting in the direction of a block face.

You need to use `DefaultProperties.RANGE` for helping the velocity calculation, if you don't apply this property the spell might not work properly.

For setting special data/behavior dynamically based on the cast context you can override `addProjectileExtras()`, which is loaded after creating the projectile.

Most of the time you won't need to create a whole class for the spell, just creating a new projectile spell instance with the projectile entity, including the wanted spell properties.

Example with [Poison Bomb](/main/spell/poison_bomb):

```java
POISON_BOMB = spell("poison_bomb", () -> new ProjectileSpell<>(PoisonBombEntity::new).assignProperties(
        SpellProperties.builder()
                .assignBaseProperties(SpellTiers.APPRENTICE, Elements.EARTH, SpellType.PROJECTILE, SpellAction.POINT, 15, 0, 25)
                .add(DefaultProperties.RANGE, 10f)
                .add(DefaultProperties.DAMAGE, 5f)
                .add(DefaultProperties.EFFECT_RADIUS, 3)
                .add(DefaultProperties.EFFECT_STRENGTH, 1)
                .add(DefaultProperties.EFFECT_DURATION, 150)
                .build()
));
```