# 统一规范

## 格式化配置 [prettier](https://prettier.io/playground/)

统一使用 prettier 作为格式化插件

1. 安装

```sh
pnpm install prettier -D
```

2. 配置

::: code-group

```js [prettier.config.js]
module.exports = {
  printWidth: 100, //最大单行长度
  tabWidth: 2, //每个缩进的空格数
  useTabs: false, //使用制表符而不是空格缩进行
  semi: true, //在语句的末尾打印分号
  vueIndentScriptAndStyle: true, //是否缩进 Vue 文件中的代码<script>和<style>标签。
  singleQuote: true, //使用单引号而不是双引号
  quoteProps: "as-needed", //引用对象中的属性时更改 "as-needed" "consistent" "preserve"
  bracketSpacing: true, //在对象文字中的括号之间打印空格
  trailingComma: "none", //在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  arrowParens: "avoid", //箭头函数只有一个参数的时候是否使用括号 always：使用  avoid： 省略
  insertPragma: false, //是否在文件头部插入一个 @format标记表示文件已经被格式化了
  htmlWhitespaceSensitivity: "strict", //HTML 空白敏感性 css strict ignore
  endOfLine: "auto", //换行符使用什么
};
```

```[.prettierignore]
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

:::

3. 添加格式化命令

```json
"lint:prettier": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\""
```

## 代码检查 [eslint](https://eslint.bootcss.com/docs/user-guide/getting-started)

1. 安装

```sh
pnpm add eslint
```

2. 根据提示生成 eslint 配置文件

```sh
npx eslint --init
```

3. 解决 prettier 和 eslint 的冲突

- 安装 [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- `pnpm add eslint-config-prettier eslint-plugin-prettier -D`

4. 配置

::: code-group

```js [.eslintrc.js]
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
```

```[.eslintignore]
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
Dockerfile
```

:::

5. 添加运行指令
   > ./src 为指定 lint 目录， --ext 为指定 lint 哪些后缀的文件， --fix 开启自动修复

```json
"lint:eslint": "eslint ./src --ext .vue,.js,.ts,.jsx,.tsx --fix"
```

## 样式规范 [stylelint](https://stylelint.io/user-guide/get-started/)

可格式化 css 代码，检查 css 语法错误与不合理的写法，指定 css 书写顺序等

1. 依赖说明
   - stylelint
   - postcss
     > 提供了一种方式用 JavaScript 代码来处理 CSS。作用：1. 第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。[参考](https://juejin.cn/post/7062717813764390948)
   - postcss-less/scss
     > 解析 less/scss 资源
   - postcss-html
     > 用于解析 HTML/Vue 中的 _style_ 标签（和类似 HTML）的 PostCSS 语法
   - stylelint-less/scss
     > 用于支持 less/scss 语法
   - stylelint-config-standard
     > 打开额外的规则来执行在规范和一些 CSS 样式指南中发现的通用约定，包括：惯用 CSS 原则，谷歌的 CSS 样式指南，Airbnb 的样式指南，和 @mdo 的代码指南。
   - stylelint-config-standard-less/scss/vue
     > 扩展 stylelint-config-standard 共享配置，并为 less/scss/vue 配置其规则
   - stylelint-config-recommended
     > 额外对的推荐配置
   - stylelint-config-recommended-less/scss/vue
     > 扩展 stylelint-config-recommended 共享配置，并为 less/scss/vue 配置其规则
   - stylelint-config-prettier
     > 解决与 prettier 的冲突（v15 不需要）
   - stylelint-prettier
   - stylelint-config-recess-order
     > 属性排序插件

```sh
pnpm add stylelint postcss postcss-less postcss-html stylelint-config-standard stylelint-config-recommended-less stylelint-config-recommended-vue stylelint-less stylelint-config-recess-order stylelint-prettier
```

2. 配置文件

::: code-group

```js [.stylelintrc.js]
module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order",
  ],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ["**/*.(less|css|vue|html)"],
      customSyntax: "postcss-less",
    },
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
    "**/*.json",
    "**/*.md",
    "**/*.yaml",
  ],
  rules: {
    "no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
  },
};
```

```[.stylelintignore]
/dist/*
/public/*
public/*
```

:::

3. 添加脚本命令
   `"lint:style": "stylelint \"./**/*.{css,less,vue,html}\" --fix"`

## 提交规范

### [husky](https://github.com/typicode/husky)

Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。

1. 安装

```sh
pnpm install husky -D
```

2. 配置 husky

- 自动配置方式

```sh
npx husky-init && npm install
```

- 手动配置
  1.  在项目根目录下创建 .husky 目录
  2.  在 .husky 目录创建 pre-commit hook，并初始化 pre-commit 命令为 npm test
  3.  修改 package.json 的 scripts，增加 "prepare": "husky install"

### lint-staged

提交代码前进行格式化校验代码，需要执行命令以及检查文件过多，使用 lint-staged 统一对改动文件执行命令

1. 安装

```sh
pnpm add lint-staged -D
```

2. 配置

::: code-group

```js [lint-staged.config.js]
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
    "prettier --write--parser json",
  ],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"],
};
```

```json [package.json]
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
      "prettier --write--parser json"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,less,styl,html}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  },
```

:::

3. 使用

- 先在 package.json 中添加脚本命令
  `"lint:lint-staged": "lint-staged --no-stash"`
- 将 .husky 目录下的 pre-commit 中的命令修改为 npm run lint:lint-staged

### commitlint

1. 安装

```sh
pnpm i @commitlint/cli @commitlint/config-conventional -D
```

2. 在 husky 中添加体检前校验命令

```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

3. 安装 commitizen 和 cz-git
   - commitizen: 提示提交规范 commit message 的工具,可以快速使用 cz 或 git cz 命令进行启动。
   - cz-git：指定提交文字规范，一款工程性更强，高度自定义，标准输出格式的 commitizen 适配器

```sh
pnpm install commitizen cz-git -D
```

4. 配置

::: code-group

```json [package.json]
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}
```

```js [commitlint.config.js]
/** @type {import('cz-git').UserConfig} */

module.exports = {
  ignores: [(commit) => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
        "workflow",
        "types",
        "release",
      ],
    ],
  },
  prompt: {
    messages: {
      // type: "Select the type of change that you're committing:",
      // scope: "Denote the SCOPE of this change (optional):",
      // customScope: "Denote the SCOPE of this change:",
      // subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      // body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      // breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      // footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      // customFooterPrefixs: "Input ISSUES prefix:",
      // footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
      // confirmCommit: "Are you sure you want to proceed with the commit above?"
      // 中文版
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: "选择关联issue前缀（可选）:",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?",
    },
    types: [
      // 中文版
      { value: "feat", name: "特性:   🚀  新增功能", emoji: "🚀" },
      { value: "fix", name: "修复:   🧩  修复缺陷", emoji: "🧩" },
      { value: "docs", name: "文档:   📚  文档变更", emoji: "📚" },
      {
        value: "style",
        name: "格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）",
        emoji: "🎨",
      },
      {
        value: "refactor",
        name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）",
        emoji: "♻️",
      },
      { value: "perf", name: "性能:   ⚡️  性能优化", emoji: "⚡️" },
      {
        value: "test",
        name: "测试:   ✅  添加疏漏测试或已有测试改动",
        emoji: "✅",
      },
      {
        value: "build",
        name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）",
        emoji: "📦️",
      },
      { value: "ci", name: "集成:   🎡  修改 CI 配置、脚本", emoji: "🎡" },
      { value: "chore", name: "回退:   ⏪️  回滚 commit", emoji: "⏪️" },
      {
        value: "revert",
        name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）",
        emoji: "🔨",
      },
    ],
    useEmoji: true,
    themeColorCode: "",
    // scope 类型（定义之后，可通过上下键选择）
    scopes: [
      ["components", "组件相关"],
      ["hooks", "hook 相关"],
      ["utils", "utils 相关"],
      ["element-plus", "对 element-plus 的调整"],
      ["styles", "样式相关"],
      ["deps", "项目依赖"],
      ["auth", "对 auth 修改"],
      ["other", "其他修改"],
      // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
      ["custom", "以上都不是？我要自定义"],
    ].map(([value, description]) => {
      return {
        value,
        name: `${value.padEnd(30)} (${description})`,
      };
    }),
    // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|", // 换行符，支持 body 和 footer
    // 跳过要询问的步骤
    skipQuestions: ["body", "footer"],
    issuePrefixs: [
      { value: "closed", name: "closed:   ISSUES has been processed" },
    ],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    // 针对每一个 type 去定义对应的 scopes，例如 fix
    scopeOverrides: {
      fix: [
        { name: "merge" },
        { name: "style" },
        { name: "e2eTest" },
        { name: "unitTest" },
      ],
    },
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: "",
  },
};
```

:::
