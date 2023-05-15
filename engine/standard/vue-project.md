# Vue 项目

## 命令规范

常用的命名规范：

- camelCase（小驼峰式命名法 —— 首字母小写）
- PascalCase（大驼峰式命名法 —— 首字母大写）
- kebab-case（短横线连接式）
- Snake（下划线连接式）

### 项目文件命名

**1. 项目名**

全部采用小写方式， 以短横线分隔。例：my-project-name

**2. 目录名**

参照项目命名规则，有复数结构时，要采用复数命名法。例：docs、assets、components、directives、mixins、utils、views。

**3. 图像文件名**

全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。

```file
banner_sina.gif
menu_aboutus.gif
menutitle_news.gif
logo_police.gif
```

**4. HTML 文件名**

全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。

```
|- error_report.html
|- success_report.html
```

**5. CSS 文件名**

全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。

```
|- normalize.less
|- base.less
|- date-picker.scss
|- input-number.scss
```

**6 JavaScript 文件名**
全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。

```
|- index.js
|- plugin.js
|- util.js
|- date-util.js
|- account-model.js
|- collapse-transition.js
```

**<em>上述规则可以快速记忆为“静态文件下划线，编译文件短横线</em>**

### Vue 组件命名

**1. 单文件组件名**

文件扩展名为 .vue 的 single-file components (单文件组件)。单文件组件名应该始终是单词大写开头 (PascalCase)。

```
components/
|- MyComponent.vue
```

**2. 单例组件名**

只拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。 这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。 比如，头部和侧边栏组件几乎在每个页面都会使用，不接受 prop，该组件是专门为该应用所定制的。

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

**3. 基础组件名**

应用特定样式和约定的基础组件(也就是展示类的、无逻辑的或无状态、不掺杂业务逻辑的组件) 应该全部以一个特定的前缀开头 —— Base。基础组件在一个页面内可使用多次，在不同页面内也可复用，是高可复用组件。

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

**4. 业务组件**

掺杂了复杂业务的组件（拥有自身 data、prop 的相关处理）即业务组件应该以 Custom 前缀命名。业务组件在一个页面内比如：某个页面内有一个卡片列表，而样式和逻辑跟业务紧密相关的卡片就是业务组件。

```
components/
|- CustomCard.vue
```

**5 紧密耦合的组件名**

和父组件紧密耦合的子组件应该以父组件名作为前缀命名。 因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

**6 组件名中单词顺序**

组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。 因为编辑器通常会按字母顺序组织文件，所以现在组件之间的重要关系一目了然。如下组件主要是用于搜索和设置功能。

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue

```

还有另一种多级目录的方式，把所有的搜索组件放到“search”目录，把所有的设置组件放到“settings”目录。我们只推荐在非常大型 (如有 100+ 个组件) 的应用下才考虑这么做，因为在多级目录间找来找去，要比在单个 components 目录下滚动查找要花费更多的精力。

**7 完整单词的组件名**

组件名应该倾向于完整单词而不是缩写。 编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

[参考](https://www.zhihu.com/question/263620922/answer/3019972422)
