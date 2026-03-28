# Magic Attribute Command

## Overview

::: warning
Only use EBWR attributes with this. Normal attributes won't read these spell conditions.
Compatible add-ons with wizardry attributes can work too.
:::

::: warning
You can still use `/attribute` and normal attribute ways to set/add EBWR attributes! This is just a more specific way to handle it to give more possibilities, but the base system is still there.
:::

The `/magic_attribute` command provides advanced attribute inspection and manipulation on living entities via conditional attribute modifiers. It is intended for add-on and dev use, and useful for debugging or scripted gameplay adjustments.

> **Note:** The command requires permission level 2 (operator).

## Command Structure

`/magic_attribute <target> <attribute> ...`

- `<target>`: Entity selector (player or mob). Must resolve to a living entity.
- `<attribute>`: Attribute resource identifier (e.g. `cast.potency`, `cast.cooldown`).
- `condition`: Spell condition from `SpellConditionArgument`
- `uuid`: UUID for the modifier instance.
- `name`: Arbitrary text name for the modifier.
- `value`: Numeric value. Interpretation depends on modifier operation.
- `scale`: Numeric multiplier for returned values in `get`.

### get

`/magic_attribute <target> <attribute> get <condition> <scale>`

- Calculates active attribute modifiers on `<target>` matching `<condition>` for `<attribute>`. (This reads subsets too)
- Sends success message with the computed value.
- Returns `(int value)(value * scale)` just like the vanilla `/attribute` command.

### add

`/magic_attribute <target> <attribute> add <uuid> <name> <value> <condition>`

- Adds a permanent `ADDITION` attribute modifier with given UUID, name, value, and condition.
- Fails if the modifier is already present for the same UUID + attribute.

### multiply_base

`/magic_attribute <target> <attribute> multiply_base <uuid> <name> <value> <condition>`

- Adds a permanent `MULTIPLY_BASE` attribute modifier.

### multiply_total

`/magic_attribute <target> <attribute> multiply_total <uuid> <name> <value> <condition>`

- Adds a permanent `MULTIPLY_TOTAL` attribute modifier.

## Examples

`/magic_attribute @s cast.potency get element=ebwizardry:fire 1.0`
- Query the cast potency modifier value when casting fire spells.

`/magic_attribute @s cast.cooldown add 00000000-0000-0000-0000-000000000001 buff -2.0 element=ice,spelltype=minion`
- Reduces the cast cooldown by 2 for ice spells that summon minions

`/magic_attribute @s cast.chargeup multiply_base 00000000-0000-0000-0000-000000000002 increaseCharge 1.3 element=earth`
- Increase the charge duration by 30% for earth spells


## Calculation Example

For understanding the subset / equals calculation we have this example. Here we are checking a player that has these spells conditions for loading the `cast.potency`

```
1. element=fire ADD 1.0
2. element=ice,spelltype=defense ADD 2.0
3. element=fire,spelltype=attack ADD -3.0
4. element=fire,spelltype=summon ADD 2.0
```

Now if the player cast a spell, or we use `/magic_attribute ... get` to check:

Query: `element=fire,spelltype=summon` the cast potency will be increased by 3.0 (loading 1 and 4) 

Query: `element=fire` the cast potency will be increased by 1.0 (loading 1)
