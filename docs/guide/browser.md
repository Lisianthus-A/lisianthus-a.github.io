# 浏览器

## 跨域

### 原因
由于同源策略（Same-origin policy），浏览器会限制非同源的请求。

### 产生跨域的条件
```
http:  //  example.com  :80
protocol      host      port
协议          主机名     端口
```
源（origin）由协议、主机名、端口组成，当请求的协议、主机名、端口三者任意一个与源不相同时，判断为跨域。

### 解决方案

#### 1. CORS（Cross-Origin Resource Sharing）
后端在响应头加上 `Access-Control-Allow-*`，告知浏览器允许该请求。

请求分为简单请求和需预检请求，当请求满足以下条件时就是一个简单请求：
1. 请求方法为 `GET`、`HEAD`、`POST` 三者之一
2. 请求头只包括 `Accept`、`Accept-Language`、`Content-Language`、`Content-Type`
3. 请求头 `Content-Type` 为 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded` 三者之一

当请求为需预检请求时，在发送实际请求前，会先发送一个 `OPTIONS` 请求，由服务器决定实际请求是否被允许。

部分字段:
```
Access-Control-Allow-Origin: http://example.com
允许请求的源

Access-Control-Allow-Methods: POST, GET, OPTIONS
允许请求的方法

Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
允许请求头中携带的字段

Access-Control-Allow-Credentials: true
是否允许请求携带 Cookies

Access-Control-Max-Age: 86400
在 86400 秒内，同一请求无需再次发送预检请求
```

通过 `Node.js` 实现代理发送请求，解决跨域问题： [GitHub 地址](https://github.com/Lisianthus-A/utils-js/blob/main/proxy.js)

#### 2. 反代理
让同源的服务器对请求做一个转发处理，把跨域请求转为同源请求。

#### 3. JSONP（不常用）
利用 `script` 标签不受同源策略限制来实现跨域。

1. 在 `window` 下挂载一个回调函数，如 `window.getNumFunc = (num) => console.log('num', num)`；
2. 构造请求地址，传入回调函数的函数名，如 `http://example.com/api/getNum?callback=getNumFunc`；
3. 服务端构造函数表达式返回，如 `getNumFunc(42)`；
4. 浏览器执行该函数，在控制台打印出 42

#### 4. window.name（不常用）
利用 `window.name` 在页面跳转后不变的特性。

1. 用 `iframe` 加载跨域的页面，设置 `window.name`
2. 通过 `iframe` 元素的属性 `iframe.contentWindow.name` 拿到之前设置的 `window.name`

#### 5. document.domain（不常用）
将同一域名下的子域名设置为一级域名实现跨域。
``` js
// 在 http://a.example.com 页面中设置
document.domain = 'example.com';
// 此时可请求一级域名的地址而不会跨域
fetch(`http://example.com/api/getNum`)
```

## 缓存策略
HTTP 缓存分为强缓存和协商缓存。

如果资源命中了缓存，强缓存不会向服务器发出请求，而协商缓存会向服务器发出请求。

### 强缓存
由 `Expires` 和 `Cache-Control` 控制。
- `Expires`: 指定一个日期，在此日期前使用缓存，不再请求资源。优先级比 `Cache-Control` 低。
- `Cache-Control`: 通常用 `max-age: <seconds>` 表示最长缓存时间。

### 协商缓存
由 `ETag / If-None-Match​` 或 `Last-Modified / If-Modified-Since​` 控制。
- `ETag / If-None-Match​`: 通过唯一标识验证缓存。若响应头带有 `ETag`，客户端可在后续请求头中携带 `If-None-Match`，
如果服务器判断资源未过期，可返回 304 Not Modified 告诉客户端使用缓存。
- `Last-Modified` / If-Modified-Since​: 通过最后修改时间验证缓存。若响应头带有 `Last-Modified`，
客户端可在后续请求头中携带 `If-Modified-Since​`，如果服务器判断资源未过期，可返回 304 Not Modified 告诉客户端使用缓存。