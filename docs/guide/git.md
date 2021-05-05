---
sidebarDepth: 3
---
# Git
## 提交规范
Angular 团队的 commit 规范格式如下：
``` 
type(scope): subject
//空行
body
//空行
footer
```

### type
必选，说明 commit 的类型。一般有以下几种：
```
feat: 新增 feature
fix: 修复 bug
docs: 只修改了文档
style: 对格式进行修改，不改变代码逻辑
refactor: 代码重构，没有新增功能或修复 bug
perf: 优化相关，不影响功能。如性能优化、提高用户体验等
test: 测试用例相关
build: 影响构建或依赖项修改
revert: 版本回滚
workflow: 工作流文件修改
chore: 其他修改
```

### scope
可选，说明 commit 影响的范围，如：utils, components, test...

### subject
必选，commit 的简短描述

### body
可选，对于本次 commit 的具体描述，可分为多行，如
```
* Allow watch handler to be string as it is supported
* Move string type to WatchHandler itself
* Removed string type as it moved to WatchHandler
```

### footer
可选，一些备注，通常是 BREAKING CHANGE(当前代码与上一个版本不兼容) 或修复的 bug(关闭 Issue) 的链接。

### 示例
```
fix(attrs): do not consider translate attribute as boolean (#11392)

when present, translate attribute had translate as it's value, which is not valid, the value should
remain as specified by the user, that's why we removed it form isBooleanAttr map

fix #11391
```