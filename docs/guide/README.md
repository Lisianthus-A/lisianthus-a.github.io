---
sidebarDepth: 3
---
# JavaScript

## 正则的一个坑
上代码：
``` js
const regex = /1/g;
for (let i = 0; i < 4; i++) {
    console.log(regex.test('123'));  //true false true false
}
```
`test` 返回值不同是因为单个实例 + 全局匹配。

`regex` 匹配过一次后，会记录索引值到 `lastIndex`，再次匹配会从 `lastIndex` 开始。

要从头匹配的话，可以设置 `lastIndex = 0`。

``` js
const regex = /1/g;
for (let i = 0; i < 4; i++) {
    console.log(regex.test('123'));  //true true true true
    regex.lastIndex = 0;
}
```