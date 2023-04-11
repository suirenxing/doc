## windicss/tailwindcss

1. 在 style 中使用@apply，报 Unknown at rule less;
   解决方式，修改 less/css 插件中的 lint:Unknown At Rules---ignore

## stylelint

1. 如::deep, v-deep 报未知
   > 解决方式：在 stylelint 配置中添加选项

```
"selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep", "apply"],
      },
    ],
```
