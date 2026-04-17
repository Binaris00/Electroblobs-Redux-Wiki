# Creating Cast Items

Spell Cast items are items that implement the `ICastItem` interface, integrating and developing a new way to interact with the whole EBWR spell casting. Here you can check how to create a basic implementation of this and checkout some important notes about what you can do.


## Prerequisites

Make sure you are familiar with:

- Integrating EBWR to your project: [IDE Installation](/developer/installation)
- Proper understanding of how item's works and how NBT data is saved/used in `ItemStack`
- EBWR Spell structure: [Spell Properties](/advanced/spell_properties) and [Adding Spells (Explaining Spells structure)](/developer/adding_spells)
- EBWR Event system 


You'll also want to have a look at the following utility classes:

- `CastItemUtils` — Handle most common casting calculations, event firing, cooldown, and more
- `CastItemDataHelper` — NBT reading/writing for spells, cooldowns, upgrades, and progression

## How the Casting System Works

The casting pipeline is split into several distinct phases, all being how the item executes and interacts with the `ICastItem` interface:

### 1. Initiation (`use`) (item)

The spell needs to have an order to start, for this case you normally use `use` when the player right-clicks with the item in hand. In this step you check all your casting conditions (check if the cooldown, mana and any other) and if everything is correct you fire the spell instantly or begin the tick item use (for charging spells and/or continuous)

### 2. Tick Loop (`onUseTick`) (item)

If the item is still being used, `onUseTick` fires every tick. Handling the charging time or continuous spell effect.

### 3. Verification (`canCast`) (spell casting)

For checking and interacting with all the infrastructure of the mod we use `canCast` method to put all the verifications before casting. 

- Is the spell event canceled? (`SpellCastEvent.Pre` / `SpellCastEvent.Tick`)
- Does the item have enough mana?
- Is the cooldown over?
- Is the spell tier compatible with this item?

### 4. Execution (`cast`) (spell casting)

After the verification is made and everything seems to be okay you execute `cast` to handle the spells effect. Normally using `CastItemUtils.executeSpellCast` that already sends the necessary networking packets.

### 5. Release (`releaseUsing` / `finishUsingItem`) (spell casting)

After finishing using the spell you need to fire the `SpellCastEvent.Finish`, call `spell.endCast(...)`, implemented the mana reduction and the cooldown.

```
use()
 ├─ instant spell? ──► canCast() ──► cast() ──► done
 └─ charge/continuous? ──► startUsingItem()
                              │
                         onUseTick() [every tick]
                              ├─ canCast()
                              └─ cast()
                                   │
                              releaseUsing()
                                   └─ spell.endCast()
```


## Basic Implementation Example

In this basic example we have an item that contains a single spell (no need to handle slot system or spell movement), it doesn't have mana cost and can execute instant and continuous spells. Similar to how `ScrollItem` works.

```java
public class BasicCastItem extends Item implements ICastItem {
    public static final int COOLDOWN_FORFEIT_TICKS = 60;
    public static final int MAX_USE_DURATION = 72000;

    private Spell boundSpell;

    public BasicCastItem(Spell spell) {
        super(new Properties().stacksTo(1));
        this.boundSpell = spell;
    }

    @Override
    public @NotNull InteractionResultHolder<ItemStack> use(@NotNull Level level, Player player, @NotNull InteractionHand hand) {
        ItemStack stack = player.getItemInHand(hand);
        Spell spell = getCurrentSpell(stack);
    
        // Safety
        if (spell == Spells.NONE) return InteractionResultHolder.fail(stack);

        SpellModifiers modifiers = new SpellModifiers();
        PlayerCastContext ctx = new PlayerCastContext(level, player, hand, 0, modifiers);

        if (!canCast(stack, spell, ctx)) return InteractionResultHolder.fail(stack);

        if (!spell.isInstantCast()) {
            // Begin continuous/charged use
            Services.OBJECT_DATA.getWizardData(player).setSpellModifiers(modifiers);
            player.startUsingItem(hand);
            return InteractionResultHolder.consume(stack);
        }

        // Instant spell
        if (cast(stack, spell, ctx)) {
            return InteractionResultHolder.success(stack);
        }
        return InteractionResultHolder.fail(stack);
    }

    @Override
    public void onUseTick(@NotNull Level level, @NotNull LivingEntity entity, @NotNull ItemStack stack, int timeLeft) {
        if (!(entity instanceof Player player)) return;

        Spell spell = getCurrentSpell(stack);
        int castingTick = stack.getUseDuration() - timeLeft - 1;

        SpellModifiers modifiers = Services.OBJECT_DATA.getWizardData(player).getSpellModifiers();
        PlayerCastContext ctx = new PlayerCastContext(level, player, player.getUsedItemHand(), castingTick, modifiers);

        if (!spell.isInstantCast()) {
            if (canCast(stack, spell, ctx)) {
                cast(stack, spell, ctx);
            } else {
                entity.stopUsingItem();
            }
        }
    }

    @Override
    public void releaseUsing(@NotNull ItemStack stack, @NotNull Level level, @NotNull LivingEntity entity, int timeCharged) {
        if (!(entity instanceof Player player)) return;
        Spell spell = getCurrentSpell(stack);
        if (spell.isInstantCast()) return;

        int castingTick = stack.getUseDuration() - timeCharged;
        SpellModifiers modifiers = Services.OBJECT_DATA.getWizardData(player).getSpellModifiers();

        WizardryEventBus.getInstance().fire(
            new SpellCastEvent.Finish(SpellCastEvent.Source.SCROLL, spell, entity, modifiers, castingTick)
        );
        spell.endCast(new CastContext(level, entity, castingTick, modifiers));
    }

    // --- ICastItem ---

    @Override
    public boolean canCast(ItemStack stack, Spell spell, PlayerCastContext ctx) {
        // Fire the pre-cast / tick-cast event; if canceled, apply a forfeit cooldown
        if (CastItemUtils.fireSpellCastEvent(SpellCastEvent.Source.SCROLL, spell, ctx)) {
            CastItemUtils.applyCooldownForfeit(ctx.caster(), COOLDOWN_FORFEIT_TICKS);
            return false;
        }
        return true;
    }

    @Override
    public boolean cast(ItemStack stack, Spell spell, PlayerCastContext ctx) {
        if (!CastItemUtils.executeSpellCast(SpellCastEvent.Source.SCROLL, spell, ctx)) return false;
        CastItemUtils.trackSpellUsage(ctx.caster(), spell);
        return true;
    }

    @Override
    public @NotNull Spell getCurrentSpell(ItemStack stack) {
        return boundSpell;
    }

    @Override
    public boolean showSpellHUD(Player player, ItemStack stack) {
        return true;
    }

    @Override
    public int getUseDuration(@NotNull ItemStack stack) {
        return MAX_USE_DURATION;
    }
}
```

## Important Data Additions (NBT)

Once you want your item to hold spells dynamically, track cooldowns, or store upgrades, you'll use `CastItemDataHelper`.

### Storing and reading spells

```java
// Write a list of spells to NBT
CastItemDataHelper.setSpells(stack, List.of(spell1, spell2, Spells.NONE));

// Read the spell list back
List<Spell> spells = CastItemDataHelper.getSpells(stack);

// Get/set the currently selected spell index
CastItemDataHelper.setCurrentSpell(stack, index);
Spell current = CastItemDataHelper.getCurrentSpell(stack);

// Cycle through spells
CastItemDataHelper.selectNextSpell(stack);
CastItemDataHelper.selectPreviousSpell(stack);
```

### Cooldowns

Cooldowns are stored as a pair: the remaining ticks and the game time at which the cooldown was set, so they survive inventory save/load correctly.

```java
// Set a cooldown (duration in ticks, gameTime from level.getGameTime())
CastItemDataHelper.setCurrentCooldown(stack, durationTicks, gameTime);

// Read the remaining cooldown
int remaining = CastItemDataHelper.getCurrentCooldown(stack, gameTime);

// Read the maximum cooldown (the full duration that was set)
int max = CastItemDataHelper.getCurrentMaxCooldown(stack);
```

::: tip
You should check `getCurrentCooldown(...) == 0` (or allow creative players to bypass it) before allowing a cast.
:::

### Progression

Progression is used to track how close a wand (or any cast item that supports tiers) is to leveling up.

```java
// Add progression points after a successful cast
int points = CastItemUtils.calcCastProgression(spell, modifiers);
CastItemDataHelper.addProgression(stack, points);

// Read the current progression value
int progress = CastItemDataHelper.getProgression(stack);

// Directly set progression (e.g. after a tier upgrade)
CastItemDataHelper.setProgression(stack, newValue);
```

### Upgrades

If your item supports upgrades (like storage or attunement):

```java
// Get the level of a specific upgrade on this stack
int level = CastItemDataHelper.getUpgradeLevel(stack, EBItems.STORAGE_UPGRADE.get());

// Apply an upgrade (increments its level in NBT)
CastItemDataHelper.applyUpgrade(stack, upgradeItem);

// Get the total number of upgrades applied
int total = CastItemDataHelper.getTotalUpgrades(stack);
```

::: note
You're responsible for checking the upgrades saved in your item and applying them depending on your needs, if you need a reference check `WandItem`
:::

## Extra Things You May Want to Do

### Supporting the Arcane Workbench

Implementing `IWorkbenchItem` will allow your item to be used in the [Arcane Workbench](/main/block/arcane_workbench) for spell binding, recharging mana, applying upgrades or anything else. Some examples on how to do so are:

```java
@Override
public boolean onApplyButtonPressed(Player player, Slot centre, Slot crystals, Slot upgrade, Slot[] spellBooks) {
    boolean changed = WorkbenchUtils.applySpellBooks(centre, spellBooks, SpellContext.WANDS);
    changed |= WorkbenchUtils.rechargeManaFromCrystals(centre, crystals);
    return changed;
}

@Override
public void onClearButtonPressed(Player player, Slot centre, Slot crystals, Slot upgrade, Slot[] spellBooks) {
    // Reset your spell slots here if needed
}
```

### Adding Mana (`IManaItem`)

If you want your item to use mana implement `IManaItem`. The most common approach is to store mana as item damage (like `WandItem` does), so it renders as a durability bar normally:

```java
@Override
public int getMana(ItemStack stack) {
    return getManaCapacity(stack) - stack.getDamageValue();
}

@Override
public int getManaCapacity(ItemStack stack) {
    return stack.getMaxDamage();
}

@Override
public void setMana(ItemStack stack, int mana) {
    stack.setDamageValue(getManaCapacity(stack) - mana);
}
```

Then consume mana after a successful cast:

```java
int cost = CastItemUtils.calcCastCost(spell, modifiers);
consumeMana(stack, cost, player); // from IManaItem default or your own impl
```

::: tip
Use `ICustomDamageItem` interface in your item to implement a custom way to set damage, this is used to avoid wand destruction when reaching 0 mana.
:::