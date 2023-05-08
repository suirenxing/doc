# 微前端

## What

微前端是一种思想，借鉴后端微服务架构，将 Web 应用由单一的单体应用转变为多个小型前端应用，或者把多个独立应用聚合成唯一的应用。有一个基座应用（主应用），来管理各个子应用的加载和卸载。

微前端核心原则：独立运行、独立部署、独立开发

微前端特性、优势

- 技术栈无关：主应用不限制子应用接入的技术栈，每个应用的技术栈选型可以配合业务情景选择。
- 独立开发、独立部署：既可以组合运行，也可以单独运行。
- 环境隔离：引用之间 JS、css 隔离，避免相互影响。
- 消息通信：统一通信方式。
- 依赖复用：解决依赖、公共逻辑需要重复维护的问题。

## why

- 新功能、新需求不断累加，项目过大。
- 老技术、老代码不敢动，新技术、新架构不敢用。
- 敏捷开发中，导致的技术负债，维护难。
- 依赖类库升级成本高。

## how

### [iframe 方案](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

**优点**

使用简单，提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离都能被完美解决。

**缺点**

隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

::: warning

1. 路由状态丢失，刷新一下，iframe 的 url 状态就丢失了
2. dom 割裂严重，弹窗只能在 iframe 内部展示，无法覆盖全局
3. web 应用之间通信非常困难
4. 每次打开白屏时间太长，对于 SPA 应用来说无法接受

:::

### [single-spa 方案](https://zh-hans.single-spa.js.org/docs/getting-started-overview)

Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。

- 预先注册子应用(激活路由、子应用资源、生命周期函数)
- 监听路由的变化，匹配到了激活的路由则加载子应用资源，顺序调用生命周期函数并最终渲染到容器

[乾坤](https://qiankun.umijs.org/zh/guide)微前端架构则进一步对 single-spa 方案进行完善，主要的完善点：

- 子应用资源由 js 列表修改进为一个 url，大大减轻注册子应用的复杂度
- 实现应用隔离，完成 js 隔离方案 （window 工厂） 和 css 隔离方案 （类 vue 的 scoped）
- 增加资源预加载能力，预先子应用 html、js、css 资源缓存下来，加快子应用的打开速度

::: tip 优点

- 监听路由自动的加载、卸载当前路由对应的子应用
- 完备的沙箱方案，js 沙箱做了 SnapshotSandbox、LegacySandbox、ProxySandbox 三套渐进增强方案，css 沙箱做了两套 strictStyleIsolation、experimentalStyleIsolation 两套适用不同场景的方案
- 路由保持，浏览器刷新、前进、后退，都可以作用到子应用
- 应用间通信简单，全局注入

:::

::: warning 不足

- 基于路由匹配，无法同时激活多个子应用，也不支持子应用保活
- 改造成本较大，从 webpack、代码、路由等等都要做一系列的适配
- css 沙箱无法绝对的隔离，js 沙箱在某些场景下执行性能下降严重

:::

### [无界](https://wujie-micro.github.io/doc/guide/)

## 数据平台改造

1. 主应用

2. 子应用

   1. 在 global.d.ts 中添加 window 全局变量

   ```ts
   interface Window {
     // 是否存在无界
     __POWERED_BY_WUJIE__?: boolean;
     // 子应用mount函数
     __WUJIE_MOUNT: () => void;
     // 子应用unmount函数
     __WUJIE_UNMOUNT: () => void;
     // 子应用无界实例
     __WUJIE: { mount: () => void };
     $wujie: {
       bus: EventBus;
       shadowRoot?: ShadowRoot;
       props?: {
         token?: string;
         tenant: {
           tenantId: string | number;
           tenantName: string;
         };
         userInfo: Record;
         [key: string]: any;
       };
       location?: Object;
     };
   }
   ```

   2. 修改 main.ts，判读是否引入 wujie

   ```ts
   async function bootstrap() { // [!code --]
   async function bootstrap(app: VueApp) { // [!code ++]
      const app = createApp(App); // [!code --]
      ...
   }
   if (window.__POWERED_BY_WUJIE__) {
   let instance: any;
   window.__WUJIE_MOUNT = () => {
      instance = createApp(App);
      bootstrap(instance);
   };
   window.__WUJIE_UNMOUNT = () => {
      instance.unmount();
   };
   window.__WUJIE.mount();
   } else {
      bootstrap(createApp(App));
   }
   ```

- 全局参数传递

  1. 在启动子项目时使用 startApp 中的 props 参数

  ```ts
  startApp({
   ...
   props: {token: 'token'}
  })
  ```

  2. 在子项目 main.ts 或者 permissionGuard 中接收

  ```ts
  export function createPermissionGuard(router: Router) {
     ...
     router.beforeEach(async (to, from, next) => {
        ...
        if (window.__POWERED_BY_WUJIE__) {
           const props = window.$wujie?.props;
           // 根据个人项目改造
           const token = props?.token;
           const tenant = props?.tenant as Tenant;
           const userInfo = props?.userInfo;

           await userStore.setToken(token);
           await userStore.setUserInfo(userInfo);
           await userStore.setTenant(tenant);
        }
        ...
     }
  }
  ```

- 设置项目标题

## 遇到问题

- ant-design-vue 弹窗位置、表格下拉框位置
  [参考](https://github.com/Tencent/wujie/issues/499)

  1.  主应用插件中，添加 css-before-loaders 预处理

  ```js
  { cssBeforeLoaders: [{ content: 'html{padding-top: 60px;height: 100%}' }] },
  ```

  2.  在子应用显示区域做负边距抵消

  ```css
  #module-content {
    width: 100%;
    height: 100vh;
    margin-top: -60px;
  }
  ```

  左右布局同理

- 子应用刷新页面（location 是子应用）

  - 使用 window.parent.reload
  - 使用 eventbus 通知主应用

- 打开新 tab 跳转指定路由

  1.  主项目打开子项目

  子项目路由 path 作为参数传递，额外参数作为 props，在启动子项目时传递

  2.  子项目打开其他子项目

      使用 wujie 的 bus 进行同行，主项目监听 tab 事件并接收参数，拼接路由，设置参数为 props
