# 统一规范

## 格式化

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

- 忽略校验文件

```javascript
// .prettierignore
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

## eslint

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

## stylelint

## commitlint
