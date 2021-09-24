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

## 事件循环
js 引擎在执行任务时，不会等待异步任务的结果返回，而是将其挂起，等结果返回了再将异步任务的回调加入事件队列。

事件队列分为微任务队列和宏任务队列，引擎会优先执行微任务，再执行宏任务。<br>
宏任务包括：`setTimeout`、`setInterval` 等<br>
微任务包括：`Promise`、`IntersectionObserver`、`queueMicrotask` 等

当 js 引擎完成当前的同步任务后，会清空 <span style="color: #ee8888;">所有</span> 微任务，然后执行 <span style="color: #ee8888;">一条</span> 宏任务，再清空微任务，不断循环。

``` js
console.log(1);
setTimeout(() => {
    console.log(2);
    queueMicrotask(() => console.log(3));
});

new Promise(resolve => {
    console.log(4);
    resolve();
}).then(() => {
    console.log(5);
    setTimeout(() => {
        console.log(6); 
    });
});
```
选中区域查看打印循序：<span style="color: #000; border-radius: 4px; background-color: #000;">1 4 5 2 3 6</span>

## 原型链
所有除 `null` 外的对象都有一个属性 `__proto__`，指向该对象的原型。<br>
所有除<span style="color: #ee8888;">箭头函数</span>外的函数都有一个属性 `prototype`，指向该函数的原型。 <br>
对象的 `__proto__` 等价于该对象的构造函数的 `prototype`。 <br>

访问对象的一个属性时：
1. 对象上存在该属性，直接返回对应属性的值
2. 对象上不存在该属性，则访问对象的原型。如果原型上存在该属性，返回原型中对应属性的值，否则继续访问原型的原型，直到遇到 `null`，返回 `undefined`

几个例子：
``` js
const f = function() {}
console.log(f.prototype === f.constructor.__proto__);  //true

const f2 = () => {}
console.log(f.prototype);  //undefined

const o = new f();
console.log(o.__proto__ === f.prototype);  //true
f.prototype.a = 1;
console.log(o.a);  //1
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
const deepClone = (target) => {

    //克隆对象
    const cloneObject = (obj) => {
        const clonedObj = {};
        cloned.set(obj, clonedObj);

        for (const [key, value] of Object.entries(obj)) {
            clonedObj[key] = getClonedValue(value);
        }

        return clonedObj;
    }

    //克隆数组
    const cloneArray = (array) => array.map(item => getClonedValue(item));

    //克隆 Set
    const cloneSet = (set) => {
        const s = new Set();
        for (const value of set) {
            const newValue = getClonedValue(value);
            s.add(newValue);
        }
        return s;
    }

    //克隆 Map
    const cloneMap = (map) => {
        const m = new Map();
        for (const [key, value] of map.entries()) {
            const newKey = getClonedValue(key);
            const newValue = getClonedValue(value);
            m.set(newKey, newValue);
        }
        return m;
    }

    //克隆正则
    const cloneRegExp = (regex) => {
        const regexStr = regex.toString();
        const flags = regexStr.slice(regexStr.lastIndexOf('/') + 1);
        return new RegExp(regex.source, flags);
    }

    //获取克隆后的值
    const getClonedValue = (value) => {
        const type = Object.prototype.toString.call(value);
        switch (type) {
            case '[object Number]':
            case '[object Boolean]':
            case '[object String]':
            case '[object Null]':
            case '[object Undefined]':
            case '[object Function]':  //这 6 种类型直接返回
                return value;
            case '[object Array]':  //数组
                return cloneArray(value);
            case '[object Object]':  //对象
                return cloned.get(value) || cloneObject(value);
            case '[object Set]':  //Set
                return cloneSet(value);
            case '[object Map]':  //Map
                return cloneMap(value);
            case '[object RegExp]':  //正则表达式
                return cloneRegExp(value);
        }
    }

    const cloned = new Map();  //克隆过的对象，处理嵌套调用
    return getClonedValue(target);
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