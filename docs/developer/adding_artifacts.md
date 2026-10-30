# Adding Artifacts

Artifacts are passive items that can change aspects in spells or modify the cast values in specific contexts. EBWR splits the work in two parts: `ArtifactItem` (the actual item) and `IArtifactEffect` (the effects of the artifact). The mod listens to the events inside the artifact item when it's equipped, so a new artifact is usually one registered item plus a small effect class.

The good part of using the built-in artifact system is that the mod handles all the work to be compatible with Accessories/Curios/Trinkets/Vanilla hotbar.

## Prerequisites

You need to know how item registration works in your loader and how to read an event listener. You don't need to register artifact events yourself. `EBEventHelper` does that already. For a practical example of how EBWR events are used, see [Adding Spell Cast Items](/developer/adding_cast_items).

These are the classes you'll touch:

- `ArtifactItem`: base item. Stores the effect and builds the tooltip.
- `IArtifactEffect`: the callback interface.
- `ArtifactEffectContext`: gives you the stack that triggered the callback.
- `ArtifactChannel`: creates the item and queries equipped artifacts through the active integration.
- `QuickArtifactEffect`: ready-made effects for common cases.
- `ArtifactUtils`: shared helpers such as wand lookup, melee checks and the lightning effect.

## How Artifacts Work

`ArtifactItem` is a normal `Item` with `stacksTo(1)` and a `Rarity`. The effect is optional. Pass `null` if you only want the automatic compatibility with the artifact integrations and plan to handle the behavior yourself, for example from a spell, a mixin or another system. In that case, check for the item with `ArtifactChannel.isEquipped`.

`ArtifactChannel` handles the integration with the different accessory mods on each loader. It resolves the integration at runtime:

1. Accessories, if it's loaded.
2. Curios on Forge or Trinkets on Fabric, if loaded.
3. The vanilla fallback: hotbar and hands.

The same item then works in an accessory slot on a modded client and in the hotbar on a vanilla one.

### Effect Callbacks

`IArtifactEffect` extends `IEventEffect<ArtifactEffectContext>` and provides default methods. Override only the ones you need:

| Callback | Fires when | Common uses |
|---|---|---|
| `onTick(user, level, context)` | Every tick while the artifact is active | Regeneration, periodic checks, auras |
| `onHurtEntity(user, target, source, amount, canceled, context)` | The player hurts another entity | On-hit rings, extra damage, effects on the target |
| `onUserHurt(user, source, amount, canceled, context)` | The player takes damage | Damage reduction, immunities, retaliation |
| `onKillEntity(user, deadEntity, source, context)` | The player kills an entity | Souls, stacking buffs, drops |
| `onSpellPreCast(event, context)` | Before a spell is cast | Changing `SpellModifiers` (potency, cost, cooldown...) |
| `onSpellPostCast(event, context)` | After a spell is cast | Healing nearby allies, extra effects |

::: warning
These callbacks can fire on both sides depending on the case. If your artifact spawns entities, changes blocks or runs any server-side logic, guard it with `if (level.isClientSide) return;`.
:::

## Creating an Effect

Implement `IArtifactEffect` and override only the hooks you need. `context.getArtifact()` returns the stack that fired the callback.

### Passive tick effect

```java
public class VitalityCharmEffect implements IArtifactEffect {
    private static final int INTERVAL = 40;

    @Override
    public void onTick(LivingEntity user, Level level, ArtifactEffectContext context) {
        if (level.isClientSide || user.tickCount % INTERVAL != 0) return;
        if (!(user instanceof Player player)) return;
        if (player.getHealth() >= player.getMaxHealth()) return;

        player.heal(1.0F);
    }
}
```

### Spell modifier effect

```java
public class StormCharmEffect implements IArtifactEffect {
    @Override
    public void onSpellPreCast(SpellCastEvent.Pre event, ArtifactEffectContext context) {
        if (event.getSpell().getElement() != Elements.LIGHTNING) return;

        event.getModifiers().multiply(SpellModifiers.POTENCY, 1.25F);
    }
}
```

### Damage hook

`onHurtEntity` and `onUserHurt` receive the damage amount as an `AtomicDouble` and the cancellation flag as an `AtomicBoolean`. Both are mutable:

```java
public class WardingAmuletEffect implements IArtifactEffect {
    @Override
    public void onUserHurt(LivingEntity user, DamageSource source, AtomicDouble amount, AtomicBoolean canceled, ArtifactEffectContext context) {
        if (EBDamageSources.isMagic(source)) {
            amount.set(amount.get() * 0.8F);
        }
    }
}
```

## Registering the Item

::: warning
Create artifacts with `ArtifactChannel.createArtifact(rarity, effect)`, not `new ArtifactItem(...)`. A plain `ArtifactItem` still works from the hotbar, but Accessories, Curios and Trinkets won't recognize it in their slots.
:::

Apart from that, artifacts register like any other item.

```java
// Forge
public static final RegistryObject<Item> RING_OF_ECHOES = ITEMS.register("ring_of_echoes",
        () -> ArtifactChannel.createArtifact(Rarity.RARE, new EchoRingEffect()));

// Fabric
public static final Item RING_OF_ECHOES = Registry.register(
        Registries.ITEM,
        new ResourceLocation(MyMod.MOD_ID, "ring_of_echoes"),
        ArtifactChannel.createArtifact(Rarity.RARE, new EchoRingEffect())
);
```

## Before finishing

### Item Tags

You need to add your item to the tags used by the integrations you want to support.

| Type | Accessories | Curios | Trinkets |
|---|---|---|---|
| Ring | `accessories:ring` | `curios:ring` | `trinkets:hand/ring` |
| Necklace | `accessories:necklace` | `curios:necklace` | `trinkets:chest/necklace` |
| Charm | `accessories:charm` | `curios:charm` | `trinkets:hand/glove` |


### Quick Effects

`QuickArtifactEffect` is a very useful utility class with the common artifact patterns used in the mod. Some of them are:

| Method | Effect |
|---|---|
| `changeModifiers(key, value, operation)` | Modifies a `SpellModifiers` key on every cast |
| `changeModifiersIfCasting(spell, key, value, operation)` | Modifies a key only when a specific spell is cast |
| `changeModifiersIfCastingType(type, key, value, operation)` | Modifies a key only for a spell type (minion, projectile...) |
| `changeDamageIfSource(damageType, value, operation)` | Changes incoming damage of a specific damage type |

Each of these returns a valid `IArtifactEffect` that you can use when registering the artifact item.

### Tooltip and Translations

`ArtifactItem.appendHoverText` adds a gray line using `<descriptionId>.desc`, so add that translation key to keep a quick description of what your artifact does.

```json
{
  "item.mymod.ring_of_echoes": "Ring of Echoes",
  "item.mymod.ring_of_echoes.desc": "Spells of the lightning element are 25% more potent"
}
```