---
sidebarDepth: 3
---
# JavaScript

## 正则

### 正则的一个坑
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

## 编程题

### 克隆
``` js
//浅克隆
const clone = target => {
    if (target === null) {
        return null;
    }

    return typeof target === 'object' ? { ...target } : target;
}

//深克隆
const deepClone = target => {
    const cloned = new Map();  //克隆过的对象，处理嵌套调用

    //克隆对象
    const cloneObject = obj => {
        const o = {};
        cloned.set(obj, o);

        for (const [key, value] of Object.entries(obj)) {
            const type = Object.prototype.toString.call(value);
            switch (type) {
                case '[object Number]':
                case '[object Boolean]':
                case '[object String]':
                case '[object Null]':
                case '[object Undefined]':
                case '[object Function]':
                    o[key] = value;
                    break;
                case '[object Object]':
                    o[key] = cloned.get(value) || cloned(value);
                    break;
                case '[object Set]':
                    o[key] = cloneSet(value);
                    break;
                case '[object Map]':
                    o[key] = cloneMap(value);
                    break;
            }
        }

        return o;
    }

    //克隆 Set
    const cloneSet = set => {
        const s = new Set();
        for (const value of set) {
            s.add(value);
        }
        return s;
    }

    //克隆 Map
    const cloneMap = map => {
        const m = new Map();
        for (const [key, value] of map.entries()) {
            const newKey = deepClone(key);
            m.set(newKey, value);
        }
        return m;
    }

    //克隆正则
    const clonedRegExp = regex => {
        const regexStr = regex.toString();
        const flags = regexStr.slice(regexStr.lastIndexOf('/') + 1);
        return new RegExp(regex.source, flags);
    }

    switch (Object.prototype.toString.call(target)) {
        case '[object Number]':
        case '[object Boolean]':
        case '[object String]':
        case '[object Null]':
        case '[object Undefined]':
        case '[object Function]':
            return target;
        case '[object Object]':
            return cloneObject(target);
        case '[object Set]':
            return cloneSet(target);
        case '[object Map]':
            return cloneMap(target);
        case '[object RegExp]':
            return clonedRegExp(target);
    }
}
```

### 函数防抖
多次调用函数，在最后一次调用的 n 秒后再执行。
``` js
const debounce = (fn, time) => {
    let timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...arguments);
        }, time);
    }
}
```

### 函数节流
在 n 秒内，不管多少次调用，只执行一次函数。
``` js
const throttle = (fn, time) => {
    let canRun = true;
    return function () {
        if (canRun) {
            canRun = false;
            fn.call(this, ...arguments);
            setTimeout(() => {
                canRun = true;
            }, time);
        }
    }
}
```

### 实现 add(1, 2)(3)(4)
``` js
//add(1, 2)(3)() --> 6
//add(1)(2)(3, 4, 5)() --> 15
const add = (...args) => {
    const sum = args.reduce((prev, curr) => prev + curr);
    return (...nextArgs) => nextArgs.length > 0 ? add(sum, ...nextArgs) : sum;
}
```