# Ray Spell

::: warning
You should understand how ray casting works before using this subclass.
:::

Spell subclass that lets you create magic effects base on a ray trace from the caster's look view. 

When cast by a spell caster entity it takes the look view of that entity and shoot the ray cast base on it, for locations it takes the direction of the block and translate into a position, shooting the ray cast to it.

When overriding this you will have 3 main methods, `onEntityHit` for handling any entity hit by the ray cast, `onBlockHit` is when the ray cast hits a block and `onMiss`, normally when your spell didn't fulfill a specific goal, or it just didn't reach any entity or block. Returning `true/false` in any of these methods will determinate the spell cast result depending on the hit result.

For particles, you can override the `spawnParticleRay` in case you want to create a new logic for spawning the particles of your spell. For each particle spawn you can use `spawnParticle`. In case you just want to change quick parts of your particle spawn you can use `particleSpacing`, `particleJitter` and `particleVelocity`

You can adjust the aim assistance with the `aimAssist(float)` flag. (e.g.value of 1 would mean the ray can adjust its direction by up to 1 block towards a target)

The spell can ignore uncollidable blocks if you use `ignoreUncollidable(bool)` flag.

In case of block hit you can enable hit liquids by using the `hitLiquids(bool)` flag.

You need to use `DefaultProperties.RANGE` for the range calculation in the ray cast, if you don't apply this property the spell might not work properly.

A great example of how to use this class is the [Flame Ray](/main/spell/flame_ray) spell. Creating a ray of fire particles to visualize the ray cast and damage the living entities that reach the spell.

```java
// This is a simplified version of Flame ray!
public class FlameRay extends RaySpell {
    public FlameRay() {
        this.particleVelocity(1);
        this.particleSpacing(0.5);
        this.soundValues(2.5f, 1, 0);
    }

    @Override
    protected boolean onEntityHit(CastContext ctx, EntityHitResult entityHit, Vec3 origin) {
        if (entityHit.getEntity() instanceof LivingEntity target) {
            // ... damage the living entity target
        }

        return true;
    }


    @Override
    protected boolean onMiss(CastContext ctx, Vec3 origin, Vec3 direction) {
        return true;
    }

    @Override
    protected boolean onBlockHit(CastContext ctx, BlockHitResult blockHit, Vec3 origin) {
        return false;
    }

    @Override
    public boolean isInstantCast() {
        return false;
    }

    @Override
    protected void spawnParticle(CastContext ctx, double x, double y, double z, double vx, double vy, double vz) {
        ParticleBuilder.create(EBParticles.MAGIC_FIRE).pos(x, y, z).velocity(vx, vy, vz).collide(true).spawn(ctx.world());
    }

    @Override
    protected @NotNull SpellProperties properties() {
        return SpellProperties.builder()
                .assignBaseProperties(SpellTiers.APPRENTICE, Elements.FIRE, SpellType.ATTACK, SpellAction.POINT, 5, 0, 0)
                .add(DefaultProperties.RANGE, 10F)
                .add(DefaultProperties.DAMAGE, 3F)
                .add(DefaultProperties.EFFECT_DURATION, 10)
                .build();
    }
}
```