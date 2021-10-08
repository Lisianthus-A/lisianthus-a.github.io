import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

module.exports = defineUserConfig<DefaultThemeOptions>({
    title: 'Lisianthus的小站',
    description: 'Be Happy To',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/favicon.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    markdown: {
        code: {
            lineNumbers: false // 代码块显示行号
        }
    },
    themeConfig: {
        navbar: [
            { text: '主页', link: '/' },
            { text: '笔记', link: '/guide/index.html' }
        ],
        sidebar: {
            '/guide/': [{
                text: '笔记',
                children: [
                    '/guide/README.md',
                    // '/guide/css.md',
                    '/guide/react.md',
                    '/guide/typescript.md',
                    '/guide/browser.md',
                    '/guide/library.md',
                    '/guide/functions.md',
                    '/guide/git.md',
                    '/guide/vuepress.md',
                ]
            }]
        },
        sidebarDepth: 3,
        repo: 'Lisianthus-A/Lisianthus-A.github.io',
        contributors: false,
        editLink: false,
        lastUpdatedText: '最后更新时间'
    },
});