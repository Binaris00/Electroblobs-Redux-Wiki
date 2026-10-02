# Imbuement Altar Recipes

Check [the Imbuement Altar](/main/block/imbuement_altar) to know how the mechanic works in the game. The Imbuement altar recipes have two different ways to define recipes depending on the needs of the developer: elemental recipes (the original and default one) and the poll one.

## Elemental recipes

These recipes require all four receptacles to be filled with the specified element in their recipes; it could be an item tag (by default it should be an elemental tag) or a specific item. After filling all the receptacles, it will produce a fixed and guaranteed result.

Some examples inside the mod:

| Center item | All four receptacles | Result |
| --- | --- | --- |
| Any [wizard armor](/main/item/wizard_armors) piece | Elemental tags | Elemental armor piece of that element |
| A [magic crystal](/main/item/magic_crystal) | Elemental tags | Elemental crystal of that element |

The format should be something like this:

```json
{
  "type": "ebwizardry:imbuement_altar",
  "center": {
    "item": "ebwizardry:wizard_hat"
  },
  "receptacles": [
    { "tag": "ebwizardry:fire_elemental_dust" },
    { "tag": "ebwizardry:fire_elemental_dust" },
    { "tag": "ebwizardry:fire_elemental_dust" },
    { "tag": "ebwizardry:fire_elemental_dust" }
  ],
  "result": {
    "count": 1,
    "item": "ebwizardry:wizard_hat_fire"
  }
}
```

> It's important to note that the mod sets all the receptacles to be of the same element, but you can put whatever you want in these, you don't need to follow the "same element rule" for every recipe.

## Poll recipes

The best example for understanding this is the one and only implementation for this, fixing a [ruined spell book](/main/item/ruined_spell_book). Placing a ruined spellbook in the center repairs it into a usable spellbook. Unlike the elemental recipes, this one accepts any combination of spectral dust elements in the four receptacles based on a "poll" table inside the recipe.

We set a poll of valid items/item tags, then the mod will randomly select the most possible one based on the options put in the receptacles; for example, using 2 of healing dust, 1 of lightning dust, and 1 of fire dust will give the probabilities of 50% / 25% / 25% for each element. 

This is the format for this kind of recipe:

```json
{
  "type": "ebwizardry:imbuement_altar",
  "center": {
    "item": "ebwizardry:ruined_spell_book"
  },
  "poll": [
    { "tag": "ebwizardry:earth_elemental_dust" },
    { "tag": "ebwizardry:fire_elemental_dust" },
    { "tag": "ebwizardry:healing_elemental_dust" },
    { "tag": "ebwizardry:ice_elemental_dust" },
    { "tag": "ebwizardry:lightning_elemental_dust" },
    { "tag": "ebwizardry:necromancy_elemental_dust" },
    { "tag": "ebwizardry:sorcery_elemental_dust" }
  ],
  "results": [
    {
      "count": 1,
      "item": "ebwizardry:random_spell_book",
      "key": "ebwizardry:earth_elemental_dust",
      "nbt": "{LootTable:\"ebwizardry:gameplay/imbuement/ruined_spell_book_earth\"}"
    }

    /// and so on and so on, you would keep adding results based on your poll
  ]
}
```

## Important things to point out

1. You can use the `"nbt"` inside `"result"`/`"results"` to define a custom nbt for the result item; this helps to create custom spellbooks that contain the id of spells internally in their nbt, for example.
2. Inside `"poll"` or `"receptacles"` you can use `"tag"` to define a whole item tag or `"item"` in case you want to limit it to one.
3. Just like any other recipe. Place your file at `data/<namespace>/recipes/imbuement/<name>.json`