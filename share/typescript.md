# TypeSript

## ts.config.ts

1. typeRoots

- 默认是`node_modules/@types`的所有包
- 指定文件夹，如：'./types', 只会包含 types 文件下的声明包

2. types

- 只有列出的包才会被包含
- 如果为空 `types: []`, 禁用@types 包

3. files 明确指定包含的文件，比如 `src/model.ts`，则 model.ts 中不导入也可使用
