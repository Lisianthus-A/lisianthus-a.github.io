---
sidebarDepth: 3
---
# TypeScript
大部分参考于[TypeScript 入门教程](https://ts.xcatliu.com/)
## 基本类型
``` TypeScript
let bool: boolean = false;  //布尔值
let num: number = 1;  //数值
let str: string = '11';  //字符串
let nul: null = null;  //null
const udf: undefined = undefined;  //undefined
let unUse: void = undefined;  //void 严格模式下只能用undefined, 非严格模式可以是undefined | null
const unionType: string | number = 1;  //联合类型
//类型别名
type Str = string;
let str2: Str = '11';  //等价于 str2: string
```

## 接口
``` TypeScript
interface Person {
    name: string;
    age: number;
    gender?: "male" | "female";   //可选属性
    [prop: string]: any;  //任意属性
    readonly id: number;  //只读属性
}
const tom: Person = {
    id: 0,
    name: 'Tom',
    age: 10,
    gender: 'male'
};
```

## 数组的类型
``` TypeScript
const arr1: Array<number> = [1, 2];  //泛型
const arr2: string[] = ['1', '2'];

//数组接口  一般用于类数组，如arguments
interface NumberArray {
    [index: number]: any;
    length: number;
    callee: Function;
}
const foo = function (): void {
    let args: NumberArray = arguments;
    let args2: IArguments = arguments;  //TS定义好的类型，与NumberArray接口形状相同
}
```

## 函数的类型
``` TypeScript
function foo1(): void { }
function foo2(a: number): string { return a.toString(); }
const foo3 = (): void => { }
//TS中的=>用来表示函数的定义  (输入) => 输出
const foo4: (x: number, y: number) => void = (x: number, y: number): void => { }

//函数接口
interface IFoo {
    (a: number, b: string, c?: number): void;
}
let foo: IFoo = (a: number, b: string, c: number = 5, ...arg: Array<number>) => { }
//函数重载
function reverse(x: number): number;
function reverse(str: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return parseInt(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## 类型断言
``` TypeScript
//值 as 类型
function foo(param: string | number) {
    // console.log(param.length);  //报错，只能用string和number的公共属性
    console.log((param as string).length);  //正常编译
}
```

## 元组
``` TypeScript
const tuple: [string, number] = ['Tom', 10];
```

## 枚举
``` TypeScript
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
//经过编译后Days为{"0": "Sun", "1": "Mon", "2": "Tue", ..., "Sun": 0, "Mon": 1, ...}
```

## 类
``` TypeScript
interface IOption {
    name: string;
    age: number;
    gender: 'male' | 'female';
}

class Person {
    public name: string;  //公有  所有属性和方法默认公有
    private age: number;  //私有  只能再该类内部访问
    protected gender: 'male' | 'female';  //受保护  与private相似，但可以被子类访问
    readonly id: number;  //只读  只能出现在属性声明或构造函数中

    constructor(option: IOption) {
        const { name, age, gender } = option;
        this.id = Date.now();
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

abstract class Utils {  //抽象类，不允许实例化
    abstract sayHi(): string;  //抽象方法，由子类实现
}

class Util extends Utils {
    sayHi(): string {
        return 'Hi';
    }
}


//需要类实现的接口
interface Alarm {
    alert(): void;
}
interface Light {
    lightOn(): void;
    lightOff(): void;
}
interface LightableAlarm extends Alarm {  //接口继承
    lightOn(): void;
    lightOff(): void;
}

class Door { }
class SecurityDoor extends Door implements Alarm, Light {  //类可实现多个接口
    alert() {
        console.log('SecurityDoor alert');
    }
    lightOn() { }
    lightOff() { }
}
class CarDoor extends Door implements LightableAlarm {
    alert() {
        console.log('CarDoor alert');
    }
    lightOn() { }
    lightOff() { }
}

//创建类的时候，会自动创建类的类型
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
//类Point会创建以下接口
interface Point {  //不会包含静态属性、方法和构造函数
    x: number;
    y: number;
}
```

## 泛型
``` TypeScript
//泛型 - 在定义函数、接口或类的时候，不预先指定具体的类型，使用时再指定类型
function createArray(length: number, value: any): Array<any> {
    return new Array(length).fill(value);
}
//可以预见，createArray函数返回数组的类型与参数value相同，可以用泛型改写为：
function createArray<T>(length: number, value: T): Array<T> {
    return new Array(length).fill(value);
}

//泛型约束
interface Lengthwise {
    length: number;
}
//约束泛型T必须符合Lengthwise的形状 (即包含number类型的length属性)
//泛型之间也可以互相约束 <T extends U, U>  这样保证了T的属性集包含U的所有属性
function loggingIdentity<T extends Lengwise>(param: T): T {
    console.log(param.length);
    return param;
}
```