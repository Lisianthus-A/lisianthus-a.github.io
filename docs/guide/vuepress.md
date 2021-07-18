---
sidebarDepth: 3
---
# VuePress
## 使用 VuePress 搭建博客
### Hello, World
1. 首先创建新文件夹，命名为 blog，在 blog 目录下运行 `npm init -y` 初始化。
2. 安装 Vuepress:
``` sh
npm install vuepress
```
3. 创建第一篇文档：
``` sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```
4. 在 `package.json` 中添加 scripts:
``` json
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}
```
5. 启动本地服务器:
``` sh
npm run docs:dev
```
VuePress 会在 `http://localhost:8080` 启动一个热重载的开发服务器。

### 配置
1. 修改 `blog/docs/README.md`，内容如下：
```
---
home: true #主页
heroImage: /logo.jpg #主页的logo
heroText: Lisianthus的小站 #logo下方文字
tagline: Be Happy to #副标题
actionText: 进入笔记 → #按钮文字
actionLink: /guide/index.html #按钮点击跳转的页面
pageClass: custom-page-index #为该页添加一个名为custom-page-index的css类
footer: MIT Licensed | Copyright © 2020-present Lisianthus-A #页脚
---
```
2. 在 `blog/docs` 目录下新建一个文件夹，命名为 `.vuepress`。
3. 在 `blog/docs/.vuepress` 目录新建文件夹，命名为 `public`，并添加 `favicon.jpg` 和 `logo.jpg` 文件作为网站 icon 和 Logo。
4. 在 `blog/docs/.vuepress` 目录新建文件夹，命名为 `styles`，并在 `blog/docs/.vuepress/styles` 目录下新建文件 `index.styl`，可选择性地覆盖页面 CSS 类，把主页图片设置成圆角：
``` css
/* blog/docs/.vuepress/styles/index.styl */
.custom-page-index .hero img {
    border-radius: 50%;
}
```
5. 在 `blog/docs/.vuepress` 目录下新建配置文件 `config.js`，内容如下：
``` JavaScript
module.exports = {
    title: 'Lisianthus的小站',  //标题
    description: 'Be happy to',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/favicon.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [  //右上角导航
            { text: '主页', link: '/' },
            { text: '笔记', link: '/guide/index.html' }
        ],
        sidebar: {  //侧边栏
            '/guide/': [  //guide页面的配置
                ['', 'HTML'],  //README.md对应页面显示为HTML
                'vuepress'  //字符串对应guide目录下的.md文件
            ]
        },
        sidebarDepth: 2,  //侧边栏导航深度
        repo: 'Lisianthus-A/Lisianthus-A.github.io',  //仓库地址
        smoothScroll: true,  //平滑滚动
        lastUpdated: '最后更新时间'
    }
}
```
6. 在 `blog/docs` 目录下新建文件夹，命名为 `guide` ，并在 `blog/docs/guide` 目录下新建 `README.md` 和 `vuepress.md` ,其中 `vuepress.md` 的内容如下：
```
# Vuepress
## 二级标题
内容
```

运行 `npm run docs:dev` 可查看页面效果。以后要写文章，只需在 `blog/docs/guide` 目录下新建 `fileName.md` 文件，并更新 `blog/docs/.vuepress/config.js` 的 `sidebar` 配置即可。

## 部署到 Git Page
### 手动部署
1. 在 `blog` 目录下初始化git：
``` sh
git init
```
2. 新建 `.gitignore` 文件，选择性忽略部分文件夹：
```
node_modules
/docs/.vuepress/dist
```
3. 提交代码到 GitHub：
在 GitHub 中新建仓库，命名为 `yourUserName.github.io`，例如 `Lisianthus-A.github.io`。
``` sh
git add .
git commit -m 'Update'
git remote add origin https://github.com/Lisianthus-A/Lisianthus-A.github.io.git
git branch -M main
git push -u origin main
```
4. 执行 `npm run docs:build`，在 `blog` 文件夹外部新建文件夹，命名为 `gh-page`，复制 `blog/docs/.vuepress/dist` 内的所有文件到 `gh-page` 文件夹后，执行以下命令：
``` sh
git init
git add .
git commit -m 'Update'
git branch -m gh-page
git remote add origin https://github.com/Lisianthus-A/Lisianthus-A.github.io.git
git push -u origin gh-page
```
5. 打开仓库网页，点击 Settings，设置 GitHub Pages 的 Source 为 gh-page 分支，文件夹为 /root，并保存。
等待几分钟， `Lisianthus-A.github.io` 网页上的内容就变成博客了。

### 自动部署
手动部署太麻烦了，每次修改文章都需要手动 build 文件，然后推送到 gh-page 分支，这里介绍一下使用 GitHub Action 实现自动部署。
1. 生成 ssh 密钥：
``` sh
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C yourmail@mail.com -f gh-page -N ""
```
执行命令后会在 `.ssh` 文件夹生成两个文件，分别是 `gh-page` 和 `gh-page.pub` ， `.ssh` 文件夹位置不固定，我的是在 `C:\Users\admin\.ssh`。

2. 打开仓库网页，点击 Settings --> Secrets，添加新的仓库密钥，Name 填 `publish`，Value 填 `gh-page` 的内容。
3. 点击 Settings --> Deploy keys， 添加部署密钥，Title填 `publish`，Key填 `gh-page.pub` 的内容。
4. 点击 Actions，添加新的工作流，文件内容如下：
``` yml
name: blog deploy

on: 
  push:
    branches: 
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v1
    - run: npm install vuepress@1.7.1
    - run: npm run docs:build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v2.5.0
      env:
        ACTIONS_DEPLOY_KEY: ${{secrets.publish}}
        PUBLISH_BRANCH: gh-page
        PUBLISH_DIR: docs/.vuepress/dist
```
现在每次 push 到 main 分支后，github 都会自动将新的内容部署到 Git Page 了。