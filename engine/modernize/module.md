# 模块化

模块化指将一个复杂应用根据预设规范封装为多个块并组合起来，对内实现数据私有化，对外暴露接口与其它模块通信。

模块化是前端工程化的重中之重。它在前端工程化中具体表现为：在文件层面上对代码与资源实现拆分与组装，将一个大文件拆分为互相依赖的小文件，再统一拼装与加载。

## 项目模块

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
