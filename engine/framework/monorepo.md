# Monorepo

## what

Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。

常用的代码管理模式

![monorepo](/monorepo.webp)

- **单仓库巨石应用** 随着迭代业务复杂度的提升，项目代码越来越多，越来越复杂，代码量过大，导致构建效率也会降低，最终导致了单体巨石应用，这种代码管理方式称之为 Monolith。

- **多仓库多模块应用** 将巨石项目拆解成多个业务模块，并在多个 Git 仓库管理，模块解耦，降低了巨石应用的复杂度，每个模块都可以独立编码、测试、发版，代码管理变得简化，构建效率也得以提升，这种代码管理方式称之为 MultiRepo。

  ::: tip 优点

  1. 代码隔离，研发者只需关注自己负责的仓库
  2. 各项目单独仓库，不会出现代码被误改的情况，单个项目出现问题不会影响其他项目。各项目单独仓库，不会出现代码被误改的情况，单个项目出现问题不会影响其他项目。
  3. 仓库体积小，模块划分清晰，可维护性强。

  :::

  ::: warning 缺点

  1. 仓库过多，开发过程中项目建来回切换导致错误，磁盘内存占用大。
  2. 仓库之间存在依赖，需要手动 link，操作繁琐
  3. 项目依赖管理不变，各仓库中存在不同版本依赖库
  4. 各项目构建、打包等基础配置各自维护，不一致时可能导致代码差异或构建差异；eg: eslint 配置不一致，编辑器报错问题

  :::

- **当仓库多模块** 将多个项目集成到一个仓库下，共享工程配置，同时又快捷地共享模块代码，成为趋势，这种代码管理方式称之为 MonoRepo。

  ::: tip 优点

  1. 一个仓库中多个相关项目，很容易看到整个代码库的变化趋势，更好的团队协作。
  2. 多项目代码都在一个仓库中，相同版本依赖提升到顶层只安装一次，节省磁盘内存。
  3. 代码复用高，方便进行代码重构。
  4. 依赖调试方便，依赖模块有个更新，只需刷新页面
  5. 多项目在一个仓库，工程配置一致，代码质量标准及风格也很容易一致。
  6. 构建配置一致，只需微调打包命令

  :::

  ::: warning 缺点

  1. 权限问题，没有项目粒度的权限管控
  2. 仓库代码量过大
  3. Git 记录混乱

  :::

## MultiRepo 和 Monorepo 对比

1. 依赖安装

| Action           |   MultiRepo    | Monorepo |  Monorepo 收益 & 缺点 |
| ---------------- | :------------: | -------: | --------------------: |
| install 依赖次数 | 项目个数即次数 |     一次 | 减少 install 命令次数 |

2. 本地调试

![开发](/develop.png)

3. CI 构建

4. 发布与上线

## when

## how

1. 新建 `pnpm-workspace.yaml`

```yaml
packages:
  - packages/* # ui库、工具库等相关库
  - docs # 组件库文档
  - apps/* # 应用
```

2. cd 到子项目目录，执行`pnpm init`, 修改 package.json 中的名称

3. 项目安装

- 安装到根目录或者全局依赖：执行`pnpm add package -w -S/D`
- 子项目项目引用：执行`pnpm add sourcePackage -F targetPackage`

:::
如果找不到本地包，添加 --workspace
:::

4. 需要全局统一配置使用的依赖项，但是在子项目中引用，需把安装提升到根目录，如 eslint

- 新建.npmrc [参考](https://pnpm.io/zh/npmrc)
- 添加需要提升的依赖项

```shell
link-workspace-packages=false
# public-hoist-pattern[]=*
public-hoist-pattern[]=husky
public-hoist-pattern[]=*lint*
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=*vite-plugin-mock*
public-hoist-pattern[]=vite
public-hoist-pattern[]=*stylelint*
public-hoist-pattern[]=@commitlint/cli
strict-peer-dependencies=false
auto-install-peers=true
dedupe-peer-dependents=true
```

## 基础 ts 配置

1. 新建 configs 目录，添加到 pnpm-workspace.yaml 文件

新建 tsconfig 目录，执行`pnpm init`，新建 base.json

```json [base.json]
{
  // 指定json文件模式的URL，用于验证和补全配置项
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "allowJs": true, // 是否允许编译js
    "target": "ES2020", // 目标 ECMAScript 版本
    "module": "ESNext", // 模块系统
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "allowJs": true,

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "types", "vite.config.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
