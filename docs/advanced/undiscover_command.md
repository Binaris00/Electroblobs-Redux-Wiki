# Undiscover Command

## Overview

The `/undiscover` command allows revoking spell discovery from any player. This can be made for individual or all the discovered spells.

## Command Structure

The command has two main subcommands:

### Undiscover Spell

`/undiscover <player> <spell>` - Revokes the specified player's discovery of a single spell.

### Undiscover All

`/undiscover <player> all` - Revokes all spell discoveries from the specified player.

> **Note:** Both subcommands require permission level 2 (operator).

## Examples

`/undiscover Steve ebwizardry:fireball` - Revokes Steve's discovery of the fireball spell

`/undiscover Alex all` - Revokes all spells Alex has discovered