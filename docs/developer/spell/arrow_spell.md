# Arrow Spell

Represents a spell that launches a `MagicArrowEntity` projectile. Abstracting the logic of creating, aiming, velocity and launch of this projectile.

Most of the time you won't need to create a whole new class for the spell! Normally you need to declare the `ArrowSpell` with the wanted projectile, assign the properties and then the logic can be handled inside the projectile entity.

This can be cast by spell caster entities launched the projectile base on the view of that entity and by location cast.

You can make changes to the arrows inside the spell cast (for example, dynamically change arrow damage base on cast status).

When using this you need to define `DefaultProperties.RANGE`, or it might not work properly!

Example with [Magic Missile](/main/spell/magic_missile).

```java
// Magic missile spell is just launching the magic missile projectile to the view pos, so we don't need a whole class for it
MAGIC_MISSILE = spell("magic_missile", () -> new ArrowSpell<>(MagicMissileEntity::new).assignProperties(
        SpellProperties.builder()
                .assignBaseProperties(SpellTiers.NOVICE, Elements.MAGIC, SpellType.PROJECTILE, SpellAction.POINT, 5, 0, 5)
                .add(DefaultProperties.RANGE, 18f)
                .add(DefaultProperties.DAMAGE, 3f)
                .build()
));
```