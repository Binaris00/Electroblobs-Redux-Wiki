# Conjure Item Spell

::: warning
Keep in mind that using this subclass will add the Capability to all the instances of that item, so try to keep the use of this clean.
:::

Spell subclass that let you conjure temporal items for players. It can't be cast by location or by spell caster entities. This creates a temporal item in the player's inventory that will have a specific lifetime by spell properties and modifiers.

When using creating a spell with this subclass you give that item the [Conjure Data](/advanced/conjure_data) capability to save values like lifetime and expire limit.

You need to use the `DefaultProperties.ITEM_LIFETIME` or the temporal item won't have a proper lifetime!

You can change the sparkle particles spawned by default overriding the `spawnParticles()` method.

In case you need to modify the item dynamically (e.g. change item's attack depending on if player is holding an artifact) you can use the `addItemExtras()` method.

Example with the spell [Conjure Sword](/main/spell/conjure_sword), creating a temporal item spell with the "Spectral Sword" item that has a lifetime of 1200 ticks (1 minute):

```java
CONJURE_SWORD = spell("conjure_sword", () -> new ConjureItemSpell(EBItems.SPECTRAL_SWORD.get()).assignProperties(
    SpellProperties.builder()
        .assignBaseProperties(SpellTiers.APPRENTICE, Elements.SORCERY, SpellType.UTILITY, SpellAction.SUMMON, 25, 0, 50)
        .add(DefaultProperties.ITEM_LIFETIME, 1200)
        .build()
));
```