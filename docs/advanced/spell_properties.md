# Spell Properties

Every [spell](/main/spells) in Electroblob's Wizardry Redux has a JSON file specifying various properties of the spell. These files are located in `assets/ebwizardry/spells` in the mod jar, and are loaded on startup. Spells from other mods are located under `assets/[modid]/spells` in their respective mod jars.

You can see the spell properties for each spell in the [GitHub repository](https://github.com/Binaris00/ElectroblobsWizardryRedux), also you could check the [Spells documentation](/main/spells), each spell containing their specific properties.

## Structure

Spell properties files all contain the following tags:

- **enabled**: A list of _contexts_ in which the spell is enabled. There are currently 9 contexts:
  - **book**: True to enable the [spell book](/main/item/spell_book) for this spell, false to disable it. If disabled, the spell book will be unobtainable (in survival) and will not bind to [wands](/main/item/wands).
  - **scroll**: True to enable the [scroll](/main/item/scroll) for this spell, false to disable it. If disabled, the scroll will be unobtainable (in survival) and will not work when right-clicked.
  - **wands**: True to allow wands to cast this spell, false to prevent it. If disabled, the spell will not bind to wands and wands it is already bound to will not be able to cast it.
  - **npcs**: True to allow NPCs to cast this spell, false to prevent it. If disabled, [wizards](/main/entity/wizard) and other spell casting mobs/NPCs will not spawn with this spell equipped, and those that already have it will not be able to cast it. It will also be excluded from the [wizard_spell loot function](/advanced/loot/wizard_spell_loot_function), so evil wizards will not drop it.
  - **dispensers**: **THIS IS NOT ADDED, so enabling or disabling won't do anything**
  - **commands**: True to allow this spell to be cast using commands, false to prevent it. If disabled, the `/cast` command will always fail for this spell.
  - **treasure**: True to include this spell in loot chests, false to exclude it. If disabled, the spell will be excluded from the [random_spell loot function](/advanced/loot/random_spell_loot_function) when used in chest loot tables.
  - **trades**: True to allow this spell to be sold by wizards, false to prevent it. If disabled, newly-spawned wizards will not offer the spell's book in any of their trades, and existing wizards will not offer it in newly unlocked trades.
  - **looting**: True to include this spell's book in rare mob drops, false to exclude it. If disabled, the spell will be excluded from the [random_spell loot function](/advanced/loot/random_spell_loot_function) when used in entity loot tables.
- **tier**: Determines the spell's [tier](/main/extra/spell_tier). Valid tiers are `"ebwizardry:novice"`, `"ebwizardry:apprentice"`, `"ebwizardry:advanced"` and `"ebwizardry:master"`. (Including spell tiers added by add-ons)
- **element**: Determines the spell's [element](/main/extra/element). Valid elements are `"ebwizardry:magic"`, `"ebwizardry:fire"`, `"ebwizardry:ice"`, `"ebwizardry:lightning"`, `"ebwizardry:necromancy"`, `"ebwizardry:earth"`, `"ebwizardry:sorcery"` and `"ebwizardry:healing"`. (Including spell tiers added by add-ons)
- **type**: Determines the spell's [type](/main/extra/spell_type). Valid types are `"attack"`, `"defence"`, `"utility"`, `"minion"`, `"buff"`, `"construct"`, `"projectile"` and `"alteration"`.
- **cost**: Determines the mana cost of the spell.
- **chargeup**: Time required to cast the spell in ticks, 0 means it won't need any charge time
- **cooldown**: Determines the cooldown time of the spell, in ticks (20 ticks = 1 second).
- **spell_action**: Determines the [animation](/main/extra/spell_action) made when casting the spell
- **base_properties**: A list of _spell-specific_ properties. Different spells will have different properties depending on what they do, and a few will have none at all. Property names are normally fairly self-explanatory.
  - **[property name]**: Determines the numeric value of a particular property.
  - ...

As an example, here is the spell properties file for [[magic missile]]:

```json
{
  "type": "projectile",
  "base_properties": {
    "damage": 3.0,
    "range": 18.0
  },
  "chargeup": 0,
  "cooldown": 5,
  "cost": 5,
  "element": "ebwizardry:magic",
  "enabled": {
    "book": true,
    "commands": true,
    "dispensers": true,
    "looting": true,
    "npcs": true,
    "scroll": true,
    "trades": true,
    "treasure": true,
    "wands": true
  },
  "spell_action": "ebwizardry:point",
  "tier": "ebwizardry:novice"
}
```

Here, the `"damage"` tag specifies the damage dealt when a magic missile hits a player or mob, and the `"range"` tag determines how far it will fly before vanishing.

> The spell-specific properties listed in a spell's JSON file are the only ones available for that spell. Removing any of them will crash the game with a `JSONSyntaxException`, and adding others will do nothing. For example, adding a `"blast_radius"` tag to a spell that doesn't already have it will not make it cause explosions, as this would have to be implemented in-code first.

## Modifying spell properties

TODO:
im lazy, pls explain how to use datapacks to modify spell properties... later