import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress/types/default-theme";
const sidebarEngine = (): DefaultTheme.SidebarItem[] => [
  {
    text: "Introduction",
    items: [
      { text: "简介", link: "/engine/introduction" },
      { text: "规范化", link: "/engine/modernize/norm" },
      { text: "模块化", link: "/engine/modernize/module" },
      { text: "组件化", link: "/engine/modernize/component" },
      { text: "自动化", link: "/engine/modernize/auto" },
    ],
    collapsed: false,
  },
  {
    text: "Features",
    items: [
      { text: "技术选型", link: "/engine/technology" },
      {
        text: "统一规范",
        items: [
          { text: "代码规范", link: "/engine/standard/code" },
          { text: "GIT规范", link: "/engine/standard/gitflow" },
        ],
        collapsed: false,
      },
      { text: "前端文档", link: "/engine/docs" },
      { text: "模板项目", link: "/engine/template" },
      { text: "组件库", link: "/engine/components" },
      { text: "工具库", link: "/engine/tools" },
      { text: "自动化工具", link: "/engine/autoTools" },
      { text: "自动化部署(CI/CD)", link: "/engine/devops" },
      { text: "监控埋点", link: "/engine/monitor" },
      { text: "性能优化", link: "/engine/performance" },
      { text: "SSR", link: "/engine/ssr" },
      { text: "微前端", link: "/engine/framework/micro-app" },
      { text: "Monorepo", link: "/engine/framework/monorepo" },
      { text: "其他", link: "/engine/other" },
    ],
    collapsed: false,
  },
];
const sidebarShare = (): DefaultTheme.SidebarItem[] => [
  {
    text: "浏览器",
    items: [{ text: "内存", link: "/share/browser/memory" }],
    collapsed: false,
  },
  {
    text: "http",
    items: [{ text: "简介", link: "/share/browser/memory" }],
    collapsed: false,
  },
  {
    text: "运维",
    items: [
      { text: "nginx", link: "/share/devops/nginx" },
      { text: "docker", link: "/share/devops/docker" },
      { text: "linux", link: "/share/devops/linux" },
    ],
    collapsed: false,
  },
  {
    text: "框架",
    items: [
      { text: "vue", link: "/share/library/vue" },
      { text: "react", link: "/share/library/react" },
    ],
    collapsed: false,
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "学习文档",
  description: "学习文档",
  outDir: "./dist",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "工程化", link: "/engine/introduction" },
      { text: "分享", link: "/share/browser/memory" },
    ],

    sidebar: {
      "/engine/": sidebarEngine(),
      "/share/": sidebarShare(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
