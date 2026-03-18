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
            { text: "Home", link: "/advanced/" },
            { text: "Commands", link: "/advanced/commands" },
            { text: "Datapacks", link: "/advanced/datapacks" },
            {
              text: "Data",
              collapsed: true,
              items: [
                { text: "WizardData", link: "/advanced/data/wizarddata" },
                { text: "SpellData", link: "/advanced/data/spelldata" },
                { text: "CastCommandData", link: "/advanced/data/castcommanddata" }
              ]
            }
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
                { text: "Buff Spell", link: "/developer/spell/buff_spell" }
              ]
            }
          ],
        },
      ],

      "/": [
        {
          text: "User Wiki",
          items: [
            { text: "Home", link: "/" },
            { text: "Getting Started", link: "/getting_started" },
            { text: "Spells", link: "/spells" },
            { text: "Wands", link: "/wands" },
            { text: "Spell Book", link: "/spell_book" },
            { text: "Magic Crystal", link: "/magic_crystal" },
          ],
        },
      ],
    },

    socialLinks: [
      // pon tu repo real aquí cuando quieras
      // { icon: "github", link: "https://github.com/OWNER/REPO" }
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});