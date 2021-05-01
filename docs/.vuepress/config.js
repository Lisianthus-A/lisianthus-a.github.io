module.exports = {
    title: 'Lisianthus的小站',
    description: 'Be Happy To',
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
                ['', 'JavaScript'],
                // 'css',
                'react',
                'typescript',
                'library',
                'temp',
                'git',
                'vuepress',
            ]
        },
        sidebarDepth: 2,
        repo: 'Lisianthus-A/Lisianthus-A.github.io',
        smoothScroll: true,  //平滑滚动
        lastUpdated: '最后更新时间'
    }
}