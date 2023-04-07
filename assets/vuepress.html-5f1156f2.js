import{_ as s,p as a,q as n,a1 as e}from"./framework-5866ffd3.js";const t={},p=e(`<h1 id="vuepress" tabindex="-1"><a class="header-anchor" href="#vuepress" aria-hidden="true">#</a> VuePress</h1><h2 id="使用-vuepress-搭建博客" tabindex="-1"><a class="header-anchor" href="#使用-vuepress-搭建博客" aria-hidden="true">#</a> 使用 VuePress 搭建博客</h2><blockquote><p>以下内容适用于 vuepress@1.7.1</p></blockquote><h3 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello, World</h3><ol><li>首先创建新文件夹，命名为 blog，在 blog 目录下运行 <code>npm init -y</code> 初始化。</li><li>安装 Vuepress:</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vuepress
</code></pre></div><ol start="3"><li>创建第一篇文档：</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> docs <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress&#39;</span> <span class="token operator">&gt;</span> docs/README.md
</code></pre></div><ol start="4"><li>在 <code>package.json</code> 中添加 scripts:</li></ol><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="5"><li>启动本地服务器:</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run docs:dev
</code></pre></div><p>VuePress 会在 <code>http://localhost:8080</code> 启动一个热重载的开发服务器。</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><ol><li>修改 <code>blog/docs/README.md</code>，内容如下：</li></ol><div class="language-text" data-ext="text"><pre class="language-text"><code>---
home: true #主页
heroImage: /logo.jpg #主页的logo
heroText: Lisianthus的小站 #logo下方文字
tagline: Be Happy to #副标题
actionText: 进入笔记 → #按钮文字
actionLink: /guide/index.html #按钮点击跳转的页面
pageClass: custom-page-index #为该页添加一个名为custom-page-index的css类
footer: MIT Licensed | Copyright © 2020-present Lisianthus-A #页脚
---
</code></pre></div><ol start="2"><li>在 <code>blog/docs</code> 目录下新建一个文件夹，命名为 <code>.vuepress</code>。</li><li>在 <code>blog/docs/.vuepress</code> 目录新建文件夹，命名为 <code>public</code>，并添加 <code>favicon.jpg</code> 和 <code>logo.jpg</code> 文件作为网站 icon 和 Logo。</li><li>在 <code>blog/docs/.vuepress</code> 目录新建文件夹，命名为 <code>styles</code>，并在 <code>blog/docs/.vuepress/styles</code> 目录下新建文件 <code>index.styl</code>，可选择性地覆盖页面 CSS 类，把主页图片设置成圆角：</li></ol><div class="language-css" data-ext="css"><pre class="language-css"><code><span class="token comment">/* blog/docs/.vuepress/styles/index.styl */</span>
<span class="token selector">.custom-page-index .hero img</span> <span class="token punctuation">{</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="5"><li>在 <code>blog/docs/.vuepress</code> 目录下新建配置文件 <code>config.js</code>，内容如下：</li></ol><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Lisianthus的小站&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// 标题</span>
    <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;Be happy to&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// 注入到当前页面的 HTML &lt;head&gt; 中的标签</span>
        <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&#39;icon&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;/favicon.jpg&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 增加一个自定义的 favicon(网页标签的图标)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 代码块显示行号</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>  <span class="token comment">// 右上角导航</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;主页&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;笔记&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/guide/index.html&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token comment">// 侧边栏</span>
            <span class="token string-property property">&#39;/guide/&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>  <span class="token comment">// guide页面的配置</span>
                <span class="token punctuation">[</span><span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;HTML&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// README.md对应页面显示为HTML</span>
                <span class="token string">&#39;vuepress&#39;</span>  <span class="token comment">// 字符串对应guide目录下的.md文件</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>  <span class="token comment">// 侧边栏导航深度</span>
        <span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">&#39;Lisianthus-A/Lisianthus-A.github.io&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// 仓库地址</span>
        <span class="token literal-property property">smoothScroll</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">// 平滑滚动</span>
        <span class="token literal-property property">lastUpdated</span><span class="token operator">:</span> <span class="token string">&#39;最后更新时间&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="6"><li>在 <code>blog/docs</code> 目录下新建文件夹，命名为 <code>guide</code> ，并在 <code>blog/docs/guide</code> 目录下新建 <code>README.md</code> 和 <code>vuepress.md</code> ,其中 <code>vuepress.md</code> 的内容如下：</li></ol><div class="language-text" data-ext="text"><pre class="language-text"><code># Vuepress
## 二级标题
内容
</code></pre></div><p>运行 <code>npm run docs:dev</code> 可查看页面效果。以后要写文章，只需在 <code>blog/docs/guide</code> 目录下新建 <code>fileName.md</code> 文件，并更新 <code>blog/docs/.vuepress/config.js</code> 的 <code>sidebar</code> 配置即可。</p><h2 id="部署到-git-page" tabindex="-1"><a class="header-anchor" href="#部署到-git-page" aria-hidden="true">#</a> 部署到 Git Page</h2><h3 id="手动部署" tabindex="-1"><a class="header-anchor" href="#手动部署" aria-hidden="true">#</a> 手动部署</h3><ol><li>在 <code>blog</code> 目录下初始化git：</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> init
</code></pre></div><ol start="2"><li>新建 <code>.gitignore</code> 文件，选择性忽略部分文件夹：</li></ol><div class="language-text" data-ext="text"><pre class="language-text"><code>node_modules
/docs/.vuepress/dist
</code></pre></div><ol start="3"><li>提交代码到 GitHub： 在 GitHub 中新建仓库，命名为 <code>yourUserName.github.io</code>，例如 <code>Lisianthus-A.github.io</code>。</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;Update&#39;</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/Lisianthus-A/Lisianthus-A.github.io.git
<span class="token function">git</span> branch <span class="token parameter variable">-M</span> main
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main
</code></pre></div><ol start="4"><li>执行 <code>npm run docs:build</code>，在 <code>blog</code> 文件夹外部新建文件夹，命名为 <code>gh-page</code>，复制 <code>blog/docs/.vuepress/dist</code> 内的所有文件到 <code>gh-page</code> 文件夹后，执行以下命令：</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;Update&#39;</span>
<span class="token function">git</span> branch <span class="token parameter variable">-m</span> gh-page
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/Lisianthus-A/Lisianthus-A.github.io.git
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin gh-page
</code></pre></div><ol start="5"><li>打开仓库网页，点击 Settings，设置 GitHub Pages 的 Source 为 gh-page 分支，文件夹为 /root，并保存。 等待几分钟， <code>Lisianthus-A.github.io</code> 网页上的内容就变成博客了。</li></ol><h3 id="自动部署" tabindex="-1"><a class="header-anchor" href="#自动部署" aria-hidden="true">#</a> 自动部署</h3><p>手动部署太麻烦了，每次修改文章都需要手动 build 文件，然后推送到 gh-page 分支，这里介绍一下使用 GitHub Action 实现自动部署。</p><ol><li>生成 ssh 密钥：</li></ol><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/.ssh
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> yourmail@mail.com <span class="token parameter variable">-f</span> gh-page <span class="token parameter variable">-N</span> <span class="token string">&quot;&quot;</span>
</code></pre></div><p>执行命令后会在 <code>.ssh</code> 文件夹生成两个文件，分别是 <code>gh-page</code> 和 <code>gh-page.pub</code> ， <code>.ssh</code> 文件夹位置不固定，我的是在 <code>C:\\Users\\admin\\.ssh</code>。</p><ol start="2"><li>打开仓库网页，点击 Settings --&gt; Secrets，添加新的仓库密钥，Name 填 <code>publish</code>，Value 填 <code>gh-page</code> 的内容。</li><li>点击 Settings --&gt; Deploy keys， 添加部署密钥，Title填 <code>publish</code>，Key填 <code>gh-page.pub</code> 的内容。</li><li>点击 Actions，添加新的工作流，文件内容如下：</li></ol><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> blog deploy

<span class="token key atrule">on</span><span class="token punctuation">:</span> 
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> main

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v1
    <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install vuepress@1.7.1
    <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run docs<span class="token punctuation">:</span>build
    
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v2.5.0
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token key atrule">ACTIONS_DEPLOY_KEY</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.publish<span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">PUBLISH_BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>page
        <span class="token key atrule">PUBLISH_DIR</span><span class="token punctuation">:</span> docs/.vuepress/dist
</code></pre></div><p>现在每次 push 到 main 分支后，github 都会自动将新的内容部署到 Git Page 了。</p>`,42),o=[p];function c(l,i){return a(),n("div",null,o)}const u=s(t,[["render",c],["__file","vuepress.html.vue"]]);export{u as default};
