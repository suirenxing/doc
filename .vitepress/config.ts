import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress/types/default-theme";
const sidebarEngine = (): DefaultTheme.SidebarItem[] => [
  {
    text: "Introduction",
    items: [
      { text: "简介", link: "/engine/introduction" },
      { text: "模块化", link: "/engine/modernize/module" },
      { text: "组件化", link: "/engine/modernize/component" },
      { text: "规范化", link: "/engine/modernize/norm" },
      { text: "自动化", link: "/engine/modernize/auto" },
    ],
    collapsed: false,
  },
  {
    text: "Features",
    items: [
      { text: "技术选型", link: "/engine/technology" },
      { text: "统一规范", link: "/engine/standard" },
      { text: "微前端", link: "/engine/framework/micro-app.md" },
    ],
    collapsed: false,
  },
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
      { text: "工程化", link: "/engine/introduction" },
      { text: "技术分享", link: "/technology/index" },
    ],

    sidebar: {
      "/engine/": sidebarEngine(),
      "/reference/": sidebarShare(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
