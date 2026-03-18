# Area Effect Spell

Used for spell that affects (in any form) entities within a specific area. Handling finding targets, range calculation and [SpellModifiers](/developer/spell_modifiers).

Can be cast by entities (targeting around themselves or a specific target) and by block location (calculating the around that position).

When extending you need to define `DefaultProperties.EFFECT_RADIUS`, or it might not work properly!

Handle particle spawn in a circular pattern around the cast position. For customize this we use `particleDensity()` (for modifying the particle density) and `spawnParticle()` for spawning a particle in the given position. By default, it doesn't spawn particles.

You can also modify if the spell should target allies or if the spell should always succeed even if it doesn't find targets overriding these methods in your own spell.

Example using a similar functionality of [Font of Mana](/main/spell/font_of_mana).

```java
public class FontOfMana extends AreaEffectSpell {

    public FontOfMana() {
        this.targetAllies(true); // this is a beneficial effect for allies!
        this.alwaysSucceed(true); // still will apply cooldown/cast cost without any found target
    }

    @Override
    protected boolean affectEntity(CastContext ctx, Vec3 origin, LivingEntity target, int targetCount) {
        if (!(target instanceof Player)) return true;

        int duration = property(DefaultProperties.EFFECT_DURATION)
        int strength = property(DefaultProperties.EFFECT_STRENGTH)

        if (!ctx.world().isClientSide) {
            target.addEffect(new MobEffectInstance(EBMobEffects.FONT_OF_MANA.get(), duration, strength));
        }
        return true;
    }

    @Override
    protected void spawnParticle(Level world, double x, double y, double z) {
        ParticleBuilder.create(EBParticles.SPARKLE).pos(x, y, z).time(50).color(1f, 1f, 0.6f).spawn(world);
    }

    @Override
    protected @NotNull SpellProperties properties() {
        return SpellProperties.builder()
                .assignBaseProperties(SpellTiers.MASTER, Elements.HEALING, SpellType.UTILITY, SpellAction.POINT_UP, 100, 15, 250)
                .add(DefaultProperties.EFFECT_RADIUS, 5)
                .add(DefaultProperties.EFFECT_DURATION, 600)
                .add(DefaultProperties.EFFECT_STRENGTH, 0)
                .build();
    }
}
```