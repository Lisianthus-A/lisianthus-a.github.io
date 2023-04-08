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
