import { defineConfig } from "vitepress";

export default defineConfig({
  title: "EB Wizardry Redux Wiki",
  description: "Magic mod for Minecraft",

  themeConfig: {
    nav: [
      { text: "User", link: "/" },
      { text: "Advanced", link: "/advanced/" },
      { text: "Developer", link: "/developer/" },
    ],

    sidebar: {
      "/advanced/": [
        {
          text: "Advanced Wiki",
          items: [
            { text: "Advanced Home", link: "/advanced/" },
            { text: "Ally System", link: "/advanced/ally_system" },
            { text: "Spell Modifiers", link: "/advanced/spell_modifiers" },
            { text: "Spell Properties", link: "/advanced/spell_properties" },
            {
              text: "Commands",
              collapsed: false,
              items: [
                { text: "Ally Command", link: "/advanced/command/ally_command" },
                { text: "Discover Command", link: "/advanced/command/discover_command" },
                { text: "Undiscover Command", link: "/advanced/command/undiscover_command" },
              ]
            },
            {
              text: "Data",
              collapsed: false,
              items: [
                { text: "Conjure Data", link: "/advanced/data/conjure_data" },
                { text: "Minion Data", link: "/advanced/data/minion_data" },
              ]
            },
            {
              text: "Loot Functions",
              collapsed: false,
              items: [
                { text: "Random Spell", link: "/advanced/loot/random_spell_loot_function" },
                { text: "Wizard Spell", link: "/advanced/loot/wizard_spell_loot_function" },
              ]
            },
          ],
        },
      ],

      "/developer/": [
        {
          text: "Developer Wiki",
          items: [
            { text: "Dev Home", link: "/developer/" },
            { text: "Installation", link: "/developer/installation"},
            {
              text: "Adding Spells",
              link: "/developer/adding_spells",
              collapsed: true,
              items: [
                { text: "Area Effect Spell", link: "/developer/spell/area_effect_spell" },
                { text: "Arrow Spell", link: "/developer/spell/arrow_spell" },
                { text: "Buff Spell", link: "/developer/spell/buff_spell" },
                { text: "Conjure Item Spell", link: "/developer/spell/conjure_item_spell" },
                { text: "Construct Spell", link: "/developer/spell/construct_spell" },
                { text: "Construct Range Spell", link: "/developer/spell/construct_range_spell" },
                { text: "Minion Spell", link: "/developer/spell/minion_spell" },
                { text: "Projectile Spell", link: "/developer/spell/projectile_spell" },
                { text: "Ray Spell", link: "/developer/spell/ray_spell" }
              ]
            }
          ],
        },
      ],

      "/": [
        {
          text: "User Wiki",
          items: [

            {
              text: "Introduction",
              collapsed: false,
              items: [
                { text: "Getting Started", link: "/getting_started" },
                { text: "Wands", link: "/main/item/wands" },
                { text: "Magic Crystal", link: "/main/item/magic_crystal" },
                { text: "Spells", link: "/main/spells" },
                { text: "Wizard Tower", link: "/main/structure/wizard_tower" },
                { text: "Imbuement Altar", link: "/main/block/imbuement_altar" },
              ]
            },
            {
              text: "Blocks",
              collapsed: false,
              items: [
                { text: "Arcane Workbench", link: "/main/block/arcane_workbench" },
                { text: "Crystal Blocks", link: "/main/block/crystal_block" },
                { text: "Crystal Flower", link: "/main/block/crystal_flower" },
                { text: "Crystal Ore", link: "/main/block/crystal_ore" },
                { text: "Imbuement Altar", link: "/main/block/imbuement_altar" },
                { text: "Receptacle", link: "/main/block/receptacle" },
                { text: "Runestone Pedestal", link: "/main/block/runestone_pedestal" },
                { text: "Runestone", link: "/main/block/runestone" },
              ]
            },

            {
              text: "Entities",
              collapsed: false,
              items: [
                { text: "Evil Wizard", link: "/main/entity/evil_wizard" },
                { text: "Ice Giant", link: "/main/entity/ice_giant" },
                { text: "Ice Wraith", link: "/main/entity/ice_wraith" },
                { text: "Lightning Wraith", link: "/main/entity/lightning_wraith" },
                { text: "Remnant", link: "/main/entity/remnant" },
                { text: "Shadow Wraith", link: "/main/entity/shadow_wraith" },
                { text: "Storm Elemental", link: "/main/entity/storm_elemental" },
                { text: "Wizard", link: "/main/entity/wizard" },
              ]
            },

            {
              text: "Items",
              collapsed: false,
              items: [
                { text: "Firebomb", link: "/main/item/firebomb" },
                { text: "Frost Axe", link: "/main/item/frost_axe" },
                { text: "Magic Crystal", link: "/main/item/magic_crystal" },
                { text: "Magical Silk", link: "/main/item/magical_silk" },
                { text: "Mana Flask", link: "/main/item/mana_flask" },
                { text: "Poison Bomb", link: "/main/item/poison_bomb" },
                { text: "Purifying Elixir", link: "/main/item/purifying_elixir" },
                { text: "Ruined Spell Book", link: "/main/item/ruined_spell_book" },
                { text: "Scroll of Identification", link: "/main/item/scroll_of_identification" },
                { text: "Scroll", link: "/main/item/scroll" },
                { text: "Smoke Bomb", link: "/main/item/smoke_bomb" },
                { text: "Spectral Dust", link: "/main/item/spectral_dust" },
                { text: "Spell Book", link: "/main/item/spell_book" },
                { text: "Tomes of Arcana", link: "/main/item/tomes_of_arcana" },
                { text: "Wand Upgrades", link: "/main/item/wand_upgrades" },
                { text: "Wands", link: "/main/item/wands" },
                { text: "Wizard Armors", link: "/main/item/wizard_armors" },
                { text: "Wizard's Handbook", link: "/main/item/wizards_handbook" },
              ]
            },

            {
              text: "Status Effects",
              collapsed: false,
              items: [
                { text: "Arcane Jammer", link: "/main/mob_effect/arcane_jammer" },
                { text: "Containment", link: "/main/mob_effect/containment" },
                { text: "Curse of Enfeeblement", link: "/main/mob_effect/curse_of_enfeeblement" },
                { text: "Curse of Soulbinding", link: "/main/mob_effect/curse_of_soulbinding" },
                { text: "Curse of Undeath", link: "/main/mob_effect/curse_of_undeath"},
                { text: "Decay", link: "/main/mob_effect/decay" },
                { text: "Fireskin", link: "/main/mob_effect/fireskin" },
                { text: "Font of Mana", link: "/main/mob_effect/font_of_mana" },
                { text: "Frostbite", link: "/main/mob_effect/frostbite" },
                { text: "Oakflesh", link: "/main/mob_effect/oakflesh" },
                { text: "Paralysis", link: "/main/mob_effect/paralysis" },
                { text: "Static Aura", link: "/main/mob_effect/static_aura" },
                { text: "Ward", link: "/main/mob_effect/ward" },

              ]
            },

            {
              text: "Structures",
              collapsed: false,
              items: [
                { text: "Library Ruins", link: "/main/structure/library_ruins" },
                { text: "Obelisk", link: "/main/structure/obelisk" },
                { text: "Shrine", link: "/main/structure/shrine" },
                { text: "Wizard Tower", link: "/main/structure/wizard_tower" },
              ]
            },

            {
              text: "Extras",
              collapsed: false,
              items: [
                { text: "Elements", link: "/main/extra/element" },
                { text: "Spell Actions", link: "/main/extra/spell_action" },
                { text: "Spell Tiers", link: "/main/extra/spell_tier" },
                { text: "Spell Types", link: "/main/extra/spell_type" },
              ]
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Binaris00/ElectroblobsWizardryRedux" },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>'
        },
        link: 'https://discord.gg/9R3nw3uQTu',
      }
    ],
  },
});