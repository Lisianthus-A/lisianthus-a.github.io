module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/favicon.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '笔记', link: '/guide/index.html' }
        ],
        sidebar: {
            '/guide/': [
                ['', 'HTML'],
                'css',
                'javascript',
                'typescript'
            ]
        },
        sidebarDepth: 2,
        repo: 'lisianthus-a/lisianthus-a.github.io',
        smoothScroll: true,  //平滑滚动
        lastUpdated: '最后更新时间'
    }
}