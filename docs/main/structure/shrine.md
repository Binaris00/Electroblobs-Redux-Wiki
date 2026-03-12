# Shrine

*Description in game:*

Due to their great arcane power and significance, not to mention the riches within, these structures are particularly attractive to any aspiring wizard - but be cautious. There are numerous reports of wizards becoming trapped within containment fields and slowly being driven insane, perhaps by claustrophobia. A growing number, however, believe such occurrences to be a deliberate part of the shrine's protective magic, and that the wizards trapped within are in fact being controlled to protect the structure. A chilling prospect, surely, for anyone who dares to venture near...

Shrines are structures which generate at the surface throughout the overworld. Shrines consist of a ring of [runestone](/main/block/runestone) pillars of varying heights, surrounding a central [runestone pedestal](/main/block/runestone_pedestal). An arcane-locked chest containing valuable magical loot sits on top of the pedestal.

TODO:
img of an earth shrine

## Generation

Shrines generate on the surface of the overworld, or whichever dimensions are specified in the config. Their default spawn frequency makes them quite rare, considerably rarer than [wizard towers](/main/structure/wizard_tower). Shrines generate in all biomes. Except the pedestal and chest, shrines are built exclusively of runestone. There are eight different shrine layouts, each with a different arrangement of pillars - however, the central pedestal with loot chest is always the same.

Each shrine is aligned to one of the seven arcane [elements](/main/extra/element), which can easily be seen from the color of the runestone from which it is built. This element also determines the element of the wizards that are spawned. Shrines cannot be aligned to the magic 'element'.

The loot chest found in a shrine is guaranteed to always contain one [artifact](/main/artifacts), with higher-tier artifacts being rarer. Artifacts are found nowhere else. Alongside this, the chest can contain a variety of magical items, including magic crystals and elemental crystals, spell books and scrolls, and wand and armor upgrades, as well as other loot such as books, paper and emeralds.

## Mechanics

When initially generated, shrines are inactivated, and the chest in the center is arcane-locked with no owner, preventing it from being opened or destroyed in survival mode. The shrine is activated when a player moves within 5 blocks of the central pedestal (which roughly corresponds to within the ring of pillars), signified by a sound and red particle effect. This immediately causes 3 [evil wizards](/main/entity/evil_wizard) to spawn which match the shrine's element, and a _containment_ effect to be applied to all players, wizards and evil wizards within 15 blocks of the central pedestal. This effect is refreshed every second as long as the shrine is active, much like that from a beacon, preventing the player and the spawned wizards from escaping.

TODO:
Containment effect link

Once a shrine is active, it may only be deactivated by killing all three evil wizards that were spawned. Upon doing so, a second sound and particle effect signify that the shrine has been conquered, and the arcane lock on the chest is removed, allowing the player to access the loot inside. Once conquered, the containment effect no longer refreshes, and will wear off after 10 seconds, allowing any players inside to escape.

In creative mode, the shrine can also be deactivated by breaking the central runestone pedestal block. This block is unbreakable in survival.