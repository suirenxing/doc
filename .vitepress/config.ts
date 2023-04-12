import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress/types/default-theme";
const sidebarGuide = (): DefaultTheme.SidebarItem[] => [
  {
    text: "前端工程化",
    items: [
      { text: "简介", link: "/guide/introduction" },
      { text: "模块化", link: "/guide/module" },
      { text: "组件化", link: "/guide/component" },
      { text: "自动化", link: "/guide/auto" },
    ],
    collapsed: false,
  },
  { text: "技术选型", link: "/guide/technology" },
  { text: "统一规范", link: "/guide/standard" },
];
const sidebarShare = (): DefaultTheme.SidebarItem[] => [
  {
    text: "技术分享",
    items: [
      { text: "npm", link: "/technology/index" },
      { text: "webpack", link: "/monorepo/index" },
    ],
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "学习文档",
  description: "学习文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "工程化", link: "/guide/introduction" },
      { text: "技术分享", link: "/technology/index" },
    ],

    sidebar: {
      "/guide/": sidebarGuide(),
      "/reference/": sidebarShare(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
