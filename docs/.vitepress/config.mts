import { defineConfig } from "vitepress";

export default defineConfig({
  title: "EB Wizardry Redux Wiki",
  description: "Magic mod for Minecraft",

  head: [["link", { rel: "icon", href: "/resources/wizard_handbook.svg" }]],

  themeConfig: {
    

   logo: {
      src: "/resources/wizard_handbook.svg",
      width: 24,
      height: 24,
    },

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
                { text: "Magic Attribute Command", link: "/advanced/command/magic_attribute" },
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
            },
            { text: "Spell Vars", link: "/developer/spell_vars"},
            { text: "Adding Spell Cast Items", link: "/developer/adding_cast_items"},
            { text: "Adding Wizard Armors", link: "/developer/adding_wizard_armors"},
          ],
        },
      ],

      "/": [
        {
          text: "User Wiki",
          items: [
            {
              text: "Getting Started",
              collapsed: false,
              items: [
                { text: "Getting Started", link: "/getting_started" },
                { text: "Spells (Overview)", link: "/main/spells" },
                { text: "Elements", link: "/main/extra/element" },
                { text: "Wands", link: "/main/item/wands" },
              ],
            },

            {
              text: "Core Systems",
              collapsed: false,
              items: [
                { text: "Magic Crystal", link: "/main/item/magic_crystal" },
                { text: "Imbuement Altar", link: "/main/block/imbuement_altar" },
                { text: "Arcane Workbench", link: "/main/block/arcane_workbench" },
                { text: "Receptacle", link: "/main/block/receptacle" },
              ],
            },

            {
              text: "Progression (exploration)",
              collapsed: false,
              items: [
                { text: "Wizard Tower (early)", link: "/main/structure/wizard_tower" },
                { text: "Library Ruins", link: "/main/structure/library_ruins" },
                { text: "Obelisk", link: "/main/structure/obelisk" },
              ],
            },

            {
              text: "Content",
              collapsed: true,
              items: [
                {
                  text: "Items",
                  collapsed: true,
                  items: [
                    { text: "Wands", link: "/main/item/wands" },
                    { text: "Wand Upgrades", link: "/main/item/wand_upgrades" },
                    { text: "Wizard Armors", link: "/main/item/wizard_armors" },
                    { text: "Spell Book", link: "/main/item/spell_book" },
                    { text: "Ruined Spell Book", link: "/main/item/ruined_spell_book" },
                    { text: "Scroll", link: "/main/item/scroll" },
                    { text: "Scroll of Identification", link: "/main/item/scroll_of_identification" },
                    { text: "Mana Flask", link: "/main/item/mana_flask" },
                    { text: "Purifying Elixir", link: "/main/item/purifying_elixir" },
                    { text: "Magical Silk", link: "/main/item/magical_silk" },
                    { text: "Spectral Dust", link: "/main/item/spectral_dust" },
                    { text: "Tomes of Arcana", link: "/main/item/tomes_of_arcana" },
                    { text: "Firebomb", link: "/main/item/firebomb" },
                    { text: "Poison Bomb", link: "/main/item/poison_bomb" },
                    { text: "Smoke Bomb", link: "/main/item/smoke_bomb" },
                  ],
                },

                {
                  text: "Blocks",
                  collapsed: true,
                  items: [
                    { text: "Arcane Workbench", link: "/main/block/arcane_workbench" },
                    { text: "Imbuement Altar", link: "/main/block/imbuement_altar" },
                    { text: "Crystal Ore", link: "/main/block/crystal_ore" },
                    { text: "Crystal Blocks", link: "/main/block/crystal_block" },
                    { text: "Crystal Flower", link: "/main/block/crystal_flower" },
                    { text: "Runestone", link: "/main/block/runestone" },
                    { text: "Runestone Pedestal", link: "/main/block/runestone_pedestal" },
                    { text: "Receptacle", link: "/main/block/receptacle" },
                  ],
                },

                {
                  text: "Entities",
                  collapsed: true,
                  items: [
                    { text: "Wizard", link: "/main/entity/wizard" },
                    { text: "Evil Wizard", link: "/main/entity/evil_wizard" },
                    { text: "Remnant", link: "/main/entity/remnant" },
                  ],
                },

                {
                  text: "Structures",
                  collapsed: true,
                  items: [
                    { text: "Wizard Tower", link: "/main/structure/wizard_tower" },
                    { text: "Library Ruins", link: "/main/structure/library_ruins" },
                    { text: "Obelisk", link: "/main/structure/obelisk" },
                    { text: "Shrine", link: "/main/structure/shrine" },
                  ],
                },

                {
                  text: "Status Effects",
                  collapsed: true,
                  items: [
                    { text: "Arcane Jammer", link: "/main/mob_effect/arcane_jammer" },
                    { text: "Containment", link: "/main/mob_effect/containment" },
                    { text: "Curse of Enfeeblement", link: "/main/mob_effect/curse_of_enfeeblement" },
                    { text: "Curse of Soulbinding", link: "/main/mob_effect/curse_of_soulbinding" },
                    { text: "Curse of Undeath", link: "/main/mob_effect/curse_of_undeath" },
                    { text: "Decay", link: "/main/mob_effect/decay" },
                    { text: "Fireskin", link: "/main/mob_effect/fireskin" },
                    { text: "Font of Mana", link: "/main/mob_effect/font_of_mana" },
                    { text: "Frostbite", link: "/main/mob_effect/frostbite" },
                    { text: "Oakflesh", link: "/main/mob_effect/oakflesh" },
                    { text: "Paralysis", link: "/main/mob_effect/paralysis" },
                    { text: "Static Aura", link: "/main/mob_effect/static_aura" },
                    { text: "Ward", link: "/main/mob_effect/ward" },
                  ],
                },
              ],
            },

            {
              text: "Reference",
              collapsed: true,
              items: [
                { text: "Spell Types", link: "/main/extra/spell_type" },
                { text: "Spell Tiers", link: "/main/extra/spell_tier" },
                { text: "Spell Actions", link: "/main/extra/spell_action" },
              ],
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