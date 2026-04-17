# Wizard Armor

Wizard armor items are magic armors which can handle mana instead of normal durability, full set effects, [Spell Modifiers](/advanced/spell_modifiers) when casting spells, and more. Here's a basic explanation to know how to create your own.

## Prerequisites

- A registered `WizardArmorType` entry (or reuse an existing one like `WizardArmorType.WIZARD`)
- Registered `WizardArmorItem` instances for all four slots (HEAD, CHEST, LEGS, FEET)
- Basic familiarity with Minecraft's `ArmorItem` registration flow

## Basic Implementation

Extend `WizardArmorItem` and pass your `WizardArmorType` and `Element` to the super constructor:

```java
public class MyArmorItem extends WizardArmorItem {
    public MyArmorItem(Type type, Element element) {
        super(WizardArmorType.MY_TYPE, type, element);
    }
}
```

From there, override the hooks you need:

### `effectTick` - passive full-set effect

Called every inventory tick when the player is wearing the full armor set and all pieces have mana. Here we have a basic implementation of a speed mob effect.

```java
@Override
public void effectTick(ItemStack stack, LivingEntity entity, Level level) {
    if (level.getGameTime() % 40 != 0) return;
    if (getEquipmentSlot() != EquipmentSlot.HEAD) return;
    entity.addEffect(new MobEffectInstance(MobEffects.MOVEMENT_SPEED, 80, 0, false, false, false));
}
```

### `applyModifiers` - spell modifier bonuses

Called during `SpellCastEvent.Pre` when the full set is worn and all pieces have mana. Modify the provided `SpellModifiers` in place:

```java
@Override
public void applyModifiers(LivingEntity entity, SpellModifiers modifiers, WizardArmorItem armor, Spell spell) {
    if (armor.getElement() != spell.getElement() && getEquipmentSlot() == EquipmentSlot.HEAD) {
        modifiers.set(SpellModifiers.COST, 1 - MY_COST_REDUCTION);
    }
}
```

::: note
The base class already handles elemental cost/cooldown reduction from your `WizardArmorType`, this is specially for creating additional bonuses on top of those.
::: 

### `appendHoverText` - tooltip

Always call `super` first to keep the base elemental cost/cooldown lines, then add your own, this helps players to know what your armor does!

```java
@Override
public void appendHoverText(ItemStack stack, Level world, List<Component> tooltip, TooltipFlag advanced) {
    super.appendHoverText(stack, world, tooltip, advanced);
    tooltip.add(Component.translatable("item.modid.wizard_armor.full_set").withStyle(ChatFormatting.AQUA));
    tooltip.add(Component.translatable("item.modid.my_armor.full_set_bonus").withStyle(ChatFormatting.AQUA));
}
```

## Extra Things

### Defining a `WizardArmorType`

`WizardArmorType` is an enum implementing `ArmorMaterial` with elemental cost reduction and cooldown reduction. For custom wizard armors is recommended to always create a new type:

```java
MY_TYPE(
    "my_type",                  // name
    EBItems.MY_UPGRADE_ITEM,    // upgrade item supplier
    15,                         // durability multiplier
    0.1f,                       // elemental cost reduction (per piece)
    0.05f,                      // cooldown reduction (per piece, 0 to disable)
    MyMod.MY_EQUIP_SOUND,       // equip sound
    new int[]{2, 5, 6, 3},      // protection: head, chest, legs, feet
    15,                         // enchantability
    "hat", "robe", "leggings", "boots" // piece name suffixes (exactly 4)
)
```