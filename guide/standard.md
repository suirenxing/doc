# 统一规范

## [eslint](https://eslint.bootcss.com/docs/user-guide/getting-started)

1. 添加 eslint

```
pnpm add eslint
```

2. 生成 eslint 配置文件

```
npx eslint --init
```

3. 解决 prettier 和 eslint 的冲突

- 安装 [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- `pnpm add eslint-config-prettier eslint-plugin-prettier -D`

4. 配置文件

```javascript
// .eslintrc.config.js
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

5. 添加运行指令
   > ./src 为指定 lint 目录， --ext 为指定 lint 哪些后缀的文件， --fix 开启自动修复

```js
"lint:eslint": "eslint ./src --ext .vue,.js,.ts,.jsx,.tsx --fix"
```

## [prettier](https://prettier.io/playground/)

统一使用 prettier 作为格式化插件

- 配置文件

```javascript
// prettier.config.js
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
  tslintIntegration: false, //不让ts使用prettier校验
};
```

- 添加格式化命令

```js
"lint:prettier": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\""
```

- 忽略校验文件

```
// .prettierignore
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

## [stylelint](https://stylelint.io/user-guide/get-started/)

可格式化 css 代码，检查 css 语法错误与不合理的写法，指定 css 书写顺序等

1. 依赖
   - stylelint
   - postcss
   - postcss-less/scss
   - postcss-html
   - stylelint-less
   - stylelint-config-standard
   - stylelint-config-recommended-less/scss
   - stylelint-config-recommended-vue
   - stylelint-config-standard-less/scss
   - stylelint-config-standard-vue
   - stylelint-order
   - stylelint-config-prettier：解决与 prettier 的冲突（v15 不需要）
   - stylelint-prettier

```
pnpm add stylelint postcss postcss-less postcss-html stylelint-config-standard stylelint-config-recommended-less stylelint-config-recommended-vue stylelint-less stylelint-order stylelint-prettier
```

2. 新增.stylelintrc.js 配置文件

```js
module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-config-recommended-vue",
  ],
  plugins: ["stylelint-order"],
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
    // 指定样式的排序
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "font-size",
      "font-family",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition",
    ],
  },
};
```

3. 添加脚本命令
   `"lint:style": "stylelint \"./**/*.{css,less,vue,html}\" --fix"`

## commitlint
