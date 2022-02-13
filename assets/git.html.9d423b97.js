import{c as a}from"./app.6b3eabdf.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const e={},s=a(`<h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1><h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u5E38\u7528\u547D\u4EE4</h2><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> \u6682\u5B58\u6587\u4EF6
<span class="token function">git</span> commit -m <span class="token string">&quot;message&quot;</span> \u63D0\u4EA4\u5230\u672C\u5730\u4ED3\u5E93
<span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> \u5C06\u672C\u5730\u7684 branch \u5206\u652F\u63A8\u9001\u5230\u8FDC\u7A0B\u4ED3\u5E93
<span class="token function">git</span> checkout -b <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> \u4EE5\u5F53\u524D\u5206\u652F\u4E3A\u57FA\u7840\uFF0C\u53E6\u8D77\u4E00\u4E2A branch \u5206\u652F
<span class="token function">git</span> checkout <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> \u5C06\u672C\u5730\u4EE3\u7801\u7248\u672C\u53D8\u4E3A branch \u5206\u652F\u7684\u7248\u672C
<span class="token function">git</span> merge <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> \u5C06 branch \u5206\u652F\u5408\u5E76\u5230\u5F53\u524D\u5206\u652F
<span class="token function">git</span> branch -d <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> \u5220\u9664 branch \u5206\u652F
<span class="token function">git</span> branch -a \u67E5\u770B\u6240\u6709\u5206\u652F
<span class="token function">git</span> branch -m <span class="token string">&quot;&quot;</span> \u5C06\u5F53\u524D\u5206\u652F\u91CD\u547D\u540D
<span class="token function">git</span> pull --rebase \u62C9\u53D6\u8FDC\u7A0B\u4ED3\u5E93\u4EE3\u7801\u5E76\u53D8\u57FA
<span class="token function">git</span> pull <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> \u5408\u5E76\u8FDC\u7A0B\u4ED3\u5E93\u7684 branch \u5206\u652F\u5230\u5F53\u524D\u5206\u652F
<span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>hash<span class="token operator">&gt;</span> \u62FE\u53D6\u54C8\u5E0C\u503C\u4E3A <span class="token builtin class-name">hash</span> \u7684\u63D0\u4EA4\u5230\u5F53\u524D\u5206\u652F
<span class="token function">git</span> reset HEAD^ \u56DE\u9000\u4E00\u4E2A\u7248\u672C
</code></pre></div><h2 id="\u63D0\u4EA4\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#\u63D0\u4EA4\u89C4\u8303" aria-hidden="true">#</a> \u63D0\u4EA4\u89C4\u8303</h2><p>Angular \u56E2\u961F\u7684 commit \u89C4\u8303\u683C\u5F0F\u5982\u4E0B\uFF1A</p><div class="language-text ext-text"><pre class="language-text"><code>type(scope): subject
// \u7A7A\u884C
body
// \u7A7A\u884C
footer
</code></pre></div><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> type</h3><p>\u5FC5\u9009\uFF0C\u8BF4\u660E commit \u7684\u7C7B\u578B\u3002\u4E00\u822C\u6709\u4EE5\u4E0B\u51E0\u79CD\uFF1A</p><div class="language-text ext-text"><pre class="language-text"><code>feat: \u65B0\u589E feature
fix: \u4FEE\u590D bug
docs: \u53EA\u4FEE\u6539\u4E86\u6587\u6863
style: \u5BF9\u683C\u5F0F\u8FDB\u884C\u4FEE\u6539\uFF0C\u4E0D\u6539\u53D8\u4EE3\u7801\u903B\u8F91
refactor: \u4EE3\u7801\u91CD\u6784\uFF0C\u6CA1\u6709\u65B0\u589E\u529F\u80FD\u6216\u4FEE\u590D bug
perf: \u4F18\u5316\u76F8\u5173\uFF0C\u4E0D\u5F71\u54CD\u529F\u80FD\u3002\u5982\u6027\u80FD\u4F18\u5316\u3001\u63D0\u9AD8\u7528\u6237\u4F53\u9A8C\u7B49
test: \u6D4B\u8BD5\u7528\u4F8B\u76F8\u5173
build: \u5F71\u54CD\u6784\u5EFA\u6216\u4F9D\u8D56\u9879\u4FEE\u6539
revert: \u7248\u672C\u56DE\u6EDA
workflow: \u5DE5\u4F5C\u6D41\u6587\u4EF6\u4FEE\u6539
chore: \u5176\u4ED6\u4FEE\u6539
</code></pre></div><h3 id="scope" tabindex="-1"><a class="header-anchor" href="#scope" aria-hidden="true">#</a> scope</h3><p>\u53EF\u9009\uFF0C\u8BF4\u660E commit \u5F71\u54CD\u7684\u8303\u56F4\uFF0C\u5982\uFF1Autils, components, test...</p><h3 id="subject" tabindex="-1"><a class="header-anchor" href="#subject" aria-hidden="true">#</a> subject</h3><p>\u5FC5\u9009\uFF0Ccommit \u7684\u7B80\u77ED\u63CF\u8FF0</p><h3 id="body" tabindex="-1"><a class="header-anchor" href="#body" aria-hidden="true">#</a> body</h3><p>\u53EF\u9009\uFF0C\u5BF9\u4E8E\u672C\u6B21 commit \u7684\u5177\u4F53\u63CF\u8FF0\uFF0C\u53EF\u5206\u4E3A\u591A\u884C\uFF0C\u5982</p><div class="language-text ext-text"><pre class="language-text"><code>* Allow watch handler to be string as it is supported
* Move string type to WatchHandler itself
* Removed string type as it moved to WatchHandler
</code></pre></div><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> footer</h3><p>\u53EF\u9009\uFF0C\u4E00\u4E9B\u5907\u6CE8\uFF0C\u901A\u5E38\u662F BREAKING CHANGE(\u5F53\u524D\u4EE3\u7801\u4E0E\u4E0A\u4E00\u4E2A\u7248\u672C\u4E0D\u517C\u5BB9) \u6216\u4FEE\u590D\u7684 bug(\u5173\u95ED Issue) \u7684\u94FE\u63A5\u3002</p><h3 id="\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B" aria-hidden="true">#</a> \u793A\u4F8B</h3><div class="language-text ext-text"><pre class="language-text"><code>fix(attrs): do not consider translate attribute as boolean (#11392)

when present, translate attribute had translate as it&#39;s value, which is not valid, the value should
remain as specified by the user, that&#39;s why we removed it form isBooleanAttr map

fix #11391
</code></pre></div>`,20);function t(o,r){return s}var i=n(e,[["render",t]]);export{i as default};
