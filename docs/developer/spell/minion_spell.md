# Minion Spell

Spell subclass that lets you create minions based on a specific mob. Passing the minion type (mob) to the constructor.

This spell subclass is heavily simplified thanks to [Minion Data System](/advanced/data/minion_data), check this to know more info about how the system works.

By default, minions spawn on ground, but you can use the `flying(bool)` to spawn minions in the air instead.

If you want to add extra conditions for the use of the spell you can use the `extraConditions()` method to add your new conditions, changing the return result based on your conditions.

Need to define the `DefaultProperties.MINION_COUNT`(normally set to 1, but if you want a group of minions you can use this!), and `DefaultProperties.SUMMON_RADIUS` to define the max radius for minion's spawn. If you don't define these properties the spell might not work properly.

::: tip
Minion Spells are the one of the few spells that doesn't need sending packets to the client! At least in normal cases
:::

If you want to add custom data to these minions dynamically (like adding armor/artifacts depending on cast context) you can use `addMinionExtras()`.

Example using the [Summon Skeleton](/main/spell/summon_skeleton) spell. Setting `AbstractSkeleton` - `EntityType.SKELETON` as their minion, giving the possibility to use Skeleton subclasses. Creating a Stray or a normal Skeleton depending on if the player has a specific artifact and spawning with a bow in main hand.

```java
public class SummonSkeleton extends MinionSpell<AbstractSkeleton> {
    public SummonSkeleton() {
        super((l) -> new Skeleton(EntityType.SKELETON, l));
    }

    @Override
    protected AbstractSkeleton createMinion(Level world, @Nullable LivingEntity caster, SpellModifiers modifiers) {
        if (caster instanceof Player player && EBAccessoriesIntegration.isEquipped(player, EBItems.CHARM_MINION_VARIANTS.get())) {
            return new Stray(EntityType.STRAY, world);
        } else {
            return super.createMinion(world, caster, modifiers);
        }
    }

    @Override
    protected void addMinionExtras(AbstractSkeleton minion, CastContext ctx, int alreadySpawned) {
        minion.setItemSlot(EquipmentSlot.MAINHAND, new ItemStack(Items.BOW));
        minion.setDropChance(EquipmentSlot.MAINHAND, 0.0f);
    }
}
```