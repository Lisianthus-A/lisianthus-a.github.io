---
sidebarDepth: 3
---
# Git
## 提交规范
Angular团队的commit规范格式如下：
``` 
type(scope): subject
//空行
body
//空行
footer
```

### type
必选，说明commit的类型。一般有以下几种：
```
feat: 新增feature
fix: 修复bug
docs: 只修改了文档
style: 对格式进行修改，不改变代码逻辑
refactor: 代码重构，没有新增功能或修复bug
perf: 优化相关，如性能优化、提高用户体验等
test: 测试用例
chore: 改变构建流程，或者增加依赖项
revert: 版本回滚
```

### scope
可选，说明commit影响的范围，如：utils, components, test...

### subject
必选，commit的简短描述

### body
可选，对于本次commit的具体描述，可分为多行，如
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