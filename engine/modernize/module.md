# 模块化

模块化用来分割，组织和打包软件。每个模块完成一个特定的子功能，所有的模块按某种方法组装起来，成为一个整体，完成整个系统所要求的功能。

模块化是前端工程化的重中之重。它在前端工程化中具体表现为：在文件层面上对代码与资源实现拆分与组装，将一个大文件拆分为互相依赖的小文件，再统一拼装与加载。

## 项目模块

**常规**

项目模块拆分的体现在按在功能特性指定目录结构，对于文件存放位置具有指导作用，查找起来方便快捷。具体可分为业务模块、页面、静态资源等。通用型模块划分如下：

```
.
├── build # 打包脚本相关
├── mock # mock 文件夹
├── public # 公共静态资源目录
├── src # 主目录
│   ├── api # 接口文件
│   ├── assets # 资源文件
│   ├── components # 公共组件
│   ├── hooks # hook
│   ├── main.ts # 主入口
│   ├── router # 路由配置
│   ├── store # 数据仓库
│   ├── utils # 工具类
│   └── views # 页面
├── test # 测试
├── types # 类型文件
├── vite.config.ts # vite 配置文件
└── windi.config.ts # windcss 配置文件
```

**优点**

符合直觉，开发方便灵活

**不足**

- 很容易导致页面驱动思维，无论是产品需求、UI 设计还是开发，都以页面为中心思考、交流与协作；后果无论是产品需求、UI 设计还是开发，都不能单独成体系
- 页面中容易耦合大量与展示及交互无直接关系的逻辑，并且这些逻辑无法被很好地自动化测试

### 分层

[参考](https://ourai.ws/posts/patterns-of-directory-structure-in-frontend-projects/)

### Monorepo

## Javascript 模块

1. commonjs

   - 原理

   ::: code-group

   ```js [require]
   // id 为路径标识符
   function require(id) {
     /* 查找  Module 上有没有已经加载的 js  对象*/
     const  cachedModule = Module._cache[id]

     /* 如果已经加载了那么直接取走缓存的 exports 对象  */
     if(cachedModule){
       return cachedModule.exports
     }

     /* 创建当前模块的 module  */
     const module = { exports: {} ,loaded: false , ...}

     /* 将 module 缓存到  Module 的缓存属性中，路径标识符作为 id */
     Module._cache[id] = module
     /* 加载文件 */
     runInThisContext(wrapper('module.exports = "123"'))(module.exports, require, module, __filename, __dirname)
     /* 加载完成 *//
     module.loaded = true
     /* 返回值 */
     return module.exports
   }
   ```

   ```js [wrapper]
   function wrapper(script) {
     return (
       "(function (exports, require, module, __filename, __dirname) {" +
       script +
       "\n})"
     );
   }
   ```

   :::

[参考](https://juejin.cn/post/6994224541312483336)

## Css 模块
