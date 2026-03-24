# Construct Range Spell

::: info
Check the [Construct Spell](/developer/spell/construct_spell) logic first before using this! Most of its properties and system are still used here.
:::

Spell subclass that extends Construct Spell that spawns the construct entity at a distance from the caster base on it's looking view.

The range of the look view distance that can spawn a construct is determined by the `DefaultProperties.RANGE` and can be modified by range upgrades.

When cast by a player, the construct is spawned at the point where the player's look direction intersects with a block surface or at maximum range if no block is hit and `requiresFloor(bool)` flag is false. When cast by an entity, the construct is spawned at the target entity's position if it is within range and not obstructed by blocks. When cast by location, the construct is spawned along the direction specified by the block face, at the point where the look view is.

You can change if the spell should hit liquids by the `hitLiquids(bool)` flag.

It could ignore uncollidable blocks by calling `ignoreUncollidables(bool)` flag, this is in case you want to avoid blocks like grass or some crops.

TODO:
well example for this...