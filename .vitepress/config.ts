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
          { text: "Vue项目", link: "/engine/standard/vue-project" },
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
    items: [
      { text: "内存", link: "/share/browser/memory" },
      { text: "缓存", link: "/share/browser/cache" },
    ],
    collapsed: false,
  },
  {
    text: "TCP",
    items: [
      { text: "TCP", link: "/share/tcp/index" },
      { text: "http", link: "/share/tcp/http" },
    ],
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
  {
    text: "Typescript",
    link: "/share/typescript.md",
  },
  {
    text: "webpack",
    items: [
      { text: "简介", link: "/share/webpack/webpack" },
      { text: "打包实现", link: "/share/webpack/bundle" },
    ],
  },
];

const sidebarBackend = (): DefaultTheme.SidebarItem[] => [
  {
    text: "sql",
    link: "/backend/sql",
  },
  {
    text: "nestjs",
    items: [
      { text: "第一天", link: "/backend/nestjs/first" },
      { text: "second", link: "/backend/nestjs/second" },
    ],
    collapsed: false,
  },
];

const sidebarInterview = (): DefaultTheme.SidebarItem[] => [
  {
    text: "基础",
    items: [
      {
        text: "html",
        link: "/interview/base/html",
      },
      {
        text: "css",
        link: "/interview/base/css",
      },
      {
        text: "js",
        link: "/interview/base/js",
      },
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
      { text: "nestjs", link: "/backend/nestjs/first" },
      { text: "面试", link: "/interview/base/html" },
    ],

    sidebar: {
      "/engine/": sidebarEngine(),
      "/share/": sidebarShare(),
      "/backend/": sidebarBackend(),
      "/interview/": sidebarInterview(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message:
        "备案号：<a href='https://beian.miit.gov.cn/' target='_blank'>豫ICP备2023010027号</a>",
    },
  },
});
