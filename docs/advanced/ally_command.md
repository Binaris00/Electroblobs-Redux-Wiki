# Ally Command

## Overview

The `/ally` command allows players to manage their ally relationships in the game. Players can add or remove other players as allies, which affects how they interact within the wizardry system.

## Command Structure

The command has two main subcommands:

### Add Ally

`/ally add <ally>` - Adds the specified player as an ally for the command executor.
`/ally add <origin> <ally>` - Adds `<ally>` to `<origin>`'s ally list. Requires permission level 2 (operator).

### Remove Ally

`/ally remove <ally></ally>` - Removes the specified player from the command executor's ally list.

`/ally remove <origin> <ally>`- Removes `<ally>` from `<origin>`'s ally list. Requires permission level 2 (operator).

## Examples

`/ally add Steve` - Adds Steve as one of your allies

`/ally remove Alex` - Removes Alex from your allies

`/ally add Steve Alex` - Makes Steve have Alex as an ally

`/ally remove Steve Alex` - Removes Alex from Steve allies