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

## WebSocket
WebSocket 提供了浏览器与服务器之间建立持久连接的方法，用于双向传递数据。

### 使用方法
使用 ws 或 wss 协议创建 WebSocket。
``` js
const socket = new WebSocket("ws://127.0.0.1");
```

### 事件
WebSocket 连接建立后，可监听 4 个事件。

1. open: 连接建立
2. message: 接收到数据
3. error: 错误
4. close: 连接关闭
``` js
const ws = new WebSocket(`wss://${location.host}`);

ws.addEventListener('open', () => {
    console.log("WebSocket open");
})
ws.addEventListener('message', (evt) => {
    console.log("message: ", evt.data);
})
ws.addEventListener('error', () => {
    console.log("WebSocket error");
})
ws.addEventListener('close', () => {
    console.log("WebSocket close");
});
```

### 建立连接
<svg xmlns="http://www.w3.org/2000/svg" width="429" height="348" viewBox="0 0 429 348"><g id="network" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="websocket-handshake.svg"><path id="Rectangle-227" fill="#FBF2EC" stroke="#DBAF88" stroke-width="2" d="M2 16h128v64H2z"/><text id="Browser" fill="#AF6E24" font-family="OpenSans-Regular, Open Sans" font-size="14" font-weight="normal"><tspan x="40" y="49">Browser</tspan></text><path id="Rectangle-228" fill="#FBF2EC" stroke="#DBAF88" stroke-width="2" d="M298 16h128v64H298z"/><text id="Server" fill="#AF6E24" font-family="OpenSans-Regular, Open Sans" font-size="14" font-weight="normal"><tspan x="340" y="49">Server</tspan></text><path id="Line" stroke="#7E7C7B" stroke-linecap="square" d="M67 81v250.5M363 81v251.5"/><path id="Line" fill="#C06334" fill-rule="nonzero" d="M349 133l14 7-14 7v-6H68v-2h281v-6z"/><path id="Line-Copy" fill="#C06334" fill-rule="nonzero" d="M83 204v6h281v2H83v6l-14-7 14-7z"/><text id="HTTP-request" fill="#AF6E24" font-family="OpenSans-Regular, Open Sans" font-size="14" font-weight="normal"><tspan x="172.015" y="130">HTTP-request</tspan></text><text id="&quot;Hey,-server,-let's" fill="#AF6E24" font-family="OpenSans-Regular, Open Sans" font-size="14" font-weight="normal"><tspan x="102.605" y="161">"Hey, server, let's talk WebSocket?"</tspan></text><text id="HTTP-response-&quot;Okay!" fill="#AF6E24" font-family="OpenSans-Regular, Open Sans" font-size="14" font-weight="normal"><tspan x="166.419" y="204">HTTP-response</tspan> <tspan x="191.972" y="226">"Okay!"</tspan></text><path id="Line-Copy-2" fill="#C06334" fill-rule="nonzero" d="M81 272v6h2v2h-2v6l-14-7 14-7zm268 0l14 7-14 7v-14zm-260 6v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4zm6 0v2h-4v-2h4z"/><text id="WebSocket-protocol" fill="#AF6E24" font-family="OpenSans-Regular, Open Sans" font-size="14" font-weight="normal"><tspan x="151.604" y="272">WebSocket protocol</tspan></text></g></g></svg>

浏览器 header 示例：
```
GET ws://127.0.0.1/ HTTP/1.1
Host: 127.0.0.1
Connection: Upgrade
Upgrade: websocket
Origin: http://127.0.0.1
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: 7c8VROpWQVabW5uf35LNvg==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```
- Connection: Upgrade 表示浏览器要更换协议
- Upgrade: websocket 请求的协议为 websocket
- Sec-WebSocket-Key 浏览器随机生成的密钥
- Sec-WebSocket-Version 协议版本

服务器 header 示例：
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: bDIH4KhmvufTnfTUZsg8+72uxyE=
```
- 如果服务器同意使用 WebSocket 协议，将会返回 101
- Sec-WebSocket-Accept 是服务器用请求头的 Sec-WebSocket-Key 使用算法重新编码的，确保响应和请求相对应

### 发送数据与关闭连接
在 WebSocket 连接建立后，可使用 `.send(data)` 方法发送 string | ArrayBuffer | Blob 数据，当有大量数据正在发送且用户网速慢时，
数据会缓存在内存中，可以用 socket.bufferedAmount 查看已缓存的字节数。
``` js
// 所有数据已发送完毕，可再次发送数据
if (socket.bufferedAmount === 0) {
    socket.send(data);
}
```

当一方想要关闭连接时，可使用 `.close([code], [reason])` 方法关闭连接
- code: 关闭码
- reason: 关闭原因

常见的关闭码：
- 1000: 默认，正常关闭
- 1001: 一方正在离开，服务器关闭或者浏览器离开页面
- 1006: 连接丢失
- 1009: 消息过大，无法处理
- 1011: 服务器错误

``` js
// 某一方关闭连接
socket.close(1000, "Work Complete");

// 另一方
socket.addEventListener('close', (evt) => {
    // evt.code === 1000
    // evt.reason === "Work Complete"
});
```

### 聊天 App 示例
客户端 index.html：
``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>WebSocket</title>
</head>

<body>
    <style>
        html,
        body {
            margin: 0;
        }

        div {
            display: flex;
            justify-content: center;
        }

        input {
            outline: none;
        }

        textarea {
            display: block;
            margin: 0 auto;
            width: 800px;
            height: 500px;
        }

        #i1 {
            width: 50px;
        }
    </style>
    <div>
        <label>
            名称:
            <input id="i1" />
        </label>
        <label>
            内容:
            <input id="i2" />
        </label>
        <button id="btn">发送</button>
    </div>

    <textarea id="text" disabled></textarea>

    <script>
        const textArea = document.getElementById('text');
        const name = document.getElementById('i1');
        const content = document.getElementById('i2');
        const btn = document.getElementById('btn');

        const ws = new WebSocket(`ws://${location.host}`);

        ws.addEventListener('open', () => {
            const time = new Date().toLocaleTimeString();
            textArea.textContent += `[${time}] WebSocket open\n`;
        });

        ws.addEventListener('message', async (evt) => {
            console.log('evt', evt);
            const blob = evt.data;
            const text = await blob.text();
            textArea.textContent += `${text}\n`;
        });

        ws.addEventListener('error', () => {
            const time = new Date().toLocaleTimeString();
            textArea.textContent += `[${time}] WebSocket error\n`;
        });

        ws.addEventListener('close', () => {
            const time = new Date().toLocaleTimeString();
            textArea.textContent += `[${time}] WebSocket close\n`;
        });

        btn.addEventListener('click', () => {
            const time = new Date().toLocaleTimeString();
            const data = `[${time}] ${name.value}:${content.value}`;
            ws.send(data);
            content.value = "";
        });
    </script>
</body>

</html>
```
服务端：
``` js
const fs = require('fs');
const http = require('http');
const ws = new require('ws');
const wss = new ws.Server({ noServer: true });

const clients = new Set();

const html = fs.readFileSync('./index.html');

function onSocketConnect(ws) {
    clients.add(ws);

    ws.on('message', function (message) {
        for (const client of clients) {
            client.send(message);
        }
    });

    ws.on('close', function () {
        clients.delete(ws);
    });
}

http.createServer((req, res) => {
    if (req.headers.upgrade?.toLowerCase() == 'websocket') {
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
    } else {
        res.end(html);
    }
}).listen(80, () => {
    console.log('server is running on port: 80');
});
```