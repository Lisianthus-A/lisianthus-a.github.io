# 问题记录

### 1. iOS 点击视频会自动全屏

需要给 video 标签上加上 playsinline 属性

### 2. 刘海屏适配

```html
<meta name="viewport" content="viewport-fit=cover" />
<style>
    body {
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
</style>
```

### 3. 小程序 image onload 不触发

部分机型在已缓存过图片的情况下，会有这个问题，手动触发一下

```js
const image = canvas.createImage();
image.src = "xxx";
const timer = setTimeout(func, 3000);
image.onload = () => {
    clearTimeout(timer);
    func();
};
```

### 4. 设置 element.style.xxx 无效

在部分电视机顶盒的 webview 上遇到过，手动触发浏览器重绘后，属性也没生效。
可尝试使用 `element.style.setProperty` 和 `element.style.cssText`，一般会有其中一个兼容。

### 5. resize 事件监听在 iOS 横屏时没触发

安卓横屏正常触发 resize 事件监听，iOS 需要额外监听 orientationchange 横屏事件
