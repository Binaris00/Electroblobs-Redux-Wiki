# Containment

_This page is about the status effect. For the spell, see [Containment](/main/spell/containment)._

TODO:
img of the containment effect

## Description

Containment is a negative potion effect which traps players and mobs within a cube-shaped zone. A player or mob under the containment effect will be prevented from leaving this zone through any means, whether by walking, flying, teleporting or otherwise. Players will also see an animated magical barrier when close to the edges of the containment field, similar in appearance to the world border.

The higher the level of containment, the smaller the containment field, with the distance from the center determined using the formula `15 - 4 x level` (where containment I is level 0). The following table details the exact size of the containment field at each level of effect:

| Effect level | Containment field width |
| --- | --- |
| Containment I | 30 blocks |
| Containment II | 22 blocks |
| Containment III | 14 blocks |
| Containment IV | 6 blocks |

## Sources

All players, [wizards](/main/entity/wizard) and [evil wizards](/main/entity/evil_wizard) within 15 blocks of an activated [shrine](/main/structure/shrine) will receive containment I every second, with a duration of 10 seconds. This effectively makes the effect permanent until the shrine is conquered, or the pedestal destroyed (in creative). In addition, the containment spell inflicts containment III on its target for 20 seconds without modifiers. The effect may also be obtained via commands.