# 微前端

## What

微前端是一种思想，借鉴后端微服务架构，将 Web 应用由单一的单体应用转变为多个小型前段应用，聚合成唯一的应用。
微前端特性：独立运行、独立部署、独立开发
微前端核心原则：

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

# wujie

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
