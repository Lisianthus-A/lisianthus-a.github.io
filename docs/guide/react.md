---
sidebarDepth: 3
---
# React
## 使用 Hooks API
### useState
`useState` 用于在组件中保存状态。

用法：
``` js
const [state, setState] = useState(0);
```
返回值是一个数组，分别是当前 `state` 和 改变 `state` 的方法，调用 `setState` 后，组件会重新渲染。

与 `class` 组件的 `this.setState` 不同，`useState` 返回的 `setState` 方法不会合并对象：
``` js
const [state, setState] = useState({ a: 1, b: 2 });
setState({ a: 2 });  //state 会变成 { a: 2 } 而不是 { a: 2, b: 2 }
```

### useEffect
`useEffect` 会在浏览器渲染结束后运行，通常用于执行副作用函数，例如异步获取数据、改变 DOM 等。

在依赖项发生改变时，会先执行消除副作用的函数，再执行副作用函数。

用法：
``` js
const [value, setValue] = useState(0);

useEffect(() => {
    const id = setInterval(() => console.log(value), 1000);
    return () => clearInterval(id);
},
    [value]
);
```

第一个参数是副作用函数，函数的返回值是用于消除副作用的函数；

第二个参数是数组，里面是 `useEffect` 的依赖项，当依赖项发生改变时， `useEffect` 中的副作用函数会再次运行。

> 可以在一个组件中使用多个 `useEffect` 方法。

### useLayoutEffect
`useLayoutEffect` 在浏览器渲染结束前执行，其余与 `useEffect` 相同。

### useContext
用来保存应用的全局数据，或者避免在嵌套组件中多次传递 `props`。

用法：
``` js
export const CountContext = React.createContext();  //写在外部，可以被外界组件引入

const Parent = () => {
    const [count, setCount] = useState(0);  //使用 state 控制 Context 的值

    return (
        <CountContext.Provider value={count}>
            <div>
                <Child />
                <button onClick={() => setState(count  + 1)}>click</button>
            </div>
        </CountContext.Provider>
    );
}

const Child = () => {
    const count = useContext(CountContext);
    
    return (
        <div>count = {count}</div>
    );
}
```
> 使用了 `useContext` 的组件在 `Context` 更新时会强制重新渲染，无视 `React.memo`。

> 要避免这个问题，可以在使用 `useContext` 的组件上面包一层父组件，由父组件使用 `props` 传递 `Context` 的值。

### useCallback
用于保存已定义函数的引用，而不是重新定义一个函数。

用法：
``` js
const handleClick = useCallback(() => {
    //do something
},
    []
);
```
第一个参数用于执行的函数；

第二个参数是数组，里面是 `useCallback` 的依赖项，依赖项没有发生改变时， `handleClick` 总是指向同一个函数。

### useMemo
用于保存变量的值，避免重复进行繁重的计算。

用法：
``` js
const id = useMemo(() => {
    let result = null;
    //繁重的计算
    return result;
},
    []
);
```
第一个参数用于执行的函数；

第二个参数是数组，里面是 `useMemo` 的依赖项，依赖项没有发生改变时，直接返回之前的计算结果，不会再次执行函数。

### useRef
保存对象的引用，可以用于操作真实 DOM 等。

用法：
``` js
const Demo = () => {
    const divRef = useRef(null);

    return (
        <div ref={divRef} />
    );
}
```

要获取函数组件的 `ref` 时，需要结合 `React.forwardRef` 使用：
``` js
const Parent = () => {
    const childRef = useRef(null);

    useEffect(() => {
        const div = childRef.current;
        console.log(div.classList[0]);  //child
    },
        []
    );

    return (
        <div>
            <Child ref={childRef} />
        </div>
    );
}

const Child = React.forwardRef((props, ref) => {
    return (
        <div className="child" ref={ref} />
    );
});
```

### useReducer
比较少用，以后再补充。

### useImperativeHandle
没用过，以后再补充。

### useDebugValue
没用过，以后再补充。

## 自定义 Hook
### useSetState
由于官方 API `useState` 不会合并对象，可以写一个支持合并对象的 `useSetState` 方法：
``` js
//定义
const useSetState = (initialState = {}) => {
    const [state, saveState] = useState(initialState);
    const setState = useCallback((newState) => {
        saveState(prevState => ({ ...prevState, ...newState }));
    },
        []
    );
    return [state, setState];
}

const [state, setState] = useSetState({ a: 1, b: 2 });
setState({ a: 2 });  //state 变为 { a: 2, b: 2}
```

### useInterval
将 `setInterval` 进行包装，自动清除旧的定时器，并且可以通过 `state` 来开始、暂停定时器。
``` js
//定义
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // 保存新回调
    useEffect(() => {
        savedCallback.current = callback;
    });

    // 建立 interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    },
        [delay]
    );
}

const [isRunning, setIsRunning] = useState(true);

//定时器启动
useInterval(() => {}, isRunning ? 1000 : null);
//暂停定时器
setIsRunning(false);

```