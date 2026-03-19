# Construct Spell

TODO:
note and link for MagicConstructEntity

Spell subclass that spawn magic construct entities (simple static entities with special behaviors), handling positioning, spawn, scaling, calculation of modifiers and lifetime management.

It can be cast by spell caster entities (spawning the construct at the caster's position) and by location (spawning the construct at the exact block position).

Constructs can have infinite duration (lifetime = -1) or temporary by using a `DefaultProperties.DURATION`.

You can make the construct be constrained to require a floor surface to spawn by using the `floor(bool)` flag.

Multiple constructs at the same position can be prevented by using the `overlap(bool)` flag.

TODO:
note and link for scaledconstructentity

If your construct entity implement scaled construct entity it will calculate the size automatically based on the blast upgrade modifiers. The construct's damage is also modified by the potency modifier. (See [Spell Modifiers](/developer/spell_modifiers) for more info)

You can add extra data/values to the construct dynamically using the `addConstructExtras` method.

Example with the [Tornado](/main/spell/tornado) spell, using the Tornado construct with the floor flag (the player needs to be in the floor to cast) and sets a custom speed property.

```java
public class Tornado extends ConstructSpell<TornadoConstruct> {
    public Tornado() {
        super(TornadoConstruct::new, false);
        floor(true);
    }

    @Override
    protected void addConstructExtras(CastContext ctx, TornadoConstruct construct, Direction side) {
        float speed = property(DefaultProperties.SPEED);
        Vec3 direction = ctx.caster() == null ? new Vec3(side.getStepX(), side.getStepY(), side.getStepZ()) : ctx.caster().getLookAngle();
        construct.setHorizontalVelocity((float) (direction.x * speed), (float) (direction.z * speed));
    }

    @Override
    protected @NotNull SpellProperties properties() {
        return SpellProperties.builder()
                .assignBaseProperties(SpellTiers.ADVANCED, Elements.EARTH, SpellType.ATTACK, SpellAction.POINT, 35, 10, 80)
                .add(DefaultProperties.DURATION, 200)
                .add(DefaultProperties.SPEED, 0.33F)
                .add(DefaultProperties.EFFECT_RADIUS, 4)
                .add(DefaultProperties.DAMAGE, 1F)
                .add(DefaultProperties.ACCELERATION, 0.22F)
                .build();
    }
}
```