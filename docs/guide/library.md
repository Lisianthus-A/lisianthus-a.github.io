# 库
## JSON Server
### 安装
`npm i json-server`

### 模块化使用

``` js
const jsonServer = require('json-server');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

// 自定义响应
router.render = function(req, res) {
    const data = JSON.parse(JSON.stringify(res.locals.data));

    // 当传入 query 带有 _page 和 _limit 时，数据总数为
    // const total = res.getHeader('X-Total-Count').value();

    res.json({
        res: 'succ',
        data
    });
}

// 应用中间件
app.use(jsonServer.defaults());
app.use(jsonServer.bodyParser);

// 自定义路由
app.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/list') {
        res.status(200).json({ list: [] });
        return;
    }

    next();
});

app.use(router);

app.listen(3000, () => {
  console.log(`JSON Server is running on port: ${3000}`);
});
```