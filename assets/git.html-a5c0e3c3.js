import{_ as a,p as n,q as e,a1 as s}from"./framework-5866ffd3.js";const t={},o=s(`<h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> 暂存文件
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;message&quot;</span> 提交到本地仓库
<span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 将本地的 branch 分支推送到远程仓库
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 以当前分支为基础，另起一个 branch 分支
<span class="token function">git</span> checkout <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 将本地代码版本变为 branch 分支的版本
<span class="token function">git</span> merge <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 将 branch 分支合并到当前分支
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 删除 branch 分支
<span class="token function">git</span> branch <span class="token parameter variable">-a</span> 查看所有分支
<span class="token function">git</span> branch <span class="token parameter variable">-m</span> <span class="token string">&quot;&quot;</span> 将当前分支重命名
<span class="token function">git</span> pull <span class="token parameter variable">--rebase</span> 拉取远程仓库代码并变基
<span class="token function">git</span> pull <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 合并远程仓库的 branch 分支到当前分支
<span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>hash<span class="token operator">&gt;</span> 拾取哈希值为 <span class="token builtin class-name">hash</span> 的提交到当前分支
<span class="token function">git</span> reset HEAD^ 回退一个版本
</code></pre></div><h2 id="提交规范" tabindex="-1"><a class="header-anchor" href="#提交规范" aria-hidden="true">#</a> 提交规范</h2><p>Angular 团队的 commit 规范格式如下：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>type(scope): subject
// 空行
body
// 空行
footer
</code></pre></div><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> type</h3><p>必选，说明 commit 的类型。一般有以下几种：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>feat: 新增 feature
fix: 修复 bug
docs: 只修改了文档
style: 对格式进行修改，不改变代码逻辑
refactor: 代码重构，没有新增功能或修复 bug
perf: 优化相关，不影响功能。如性能优化、提高用户体验等
test: 测试用例相关
build: 影响构建或依赖项修改
revert: 版本回滚
workflow: 工作流文件修改
chore: 其他修改
</code></pre></div><h3 id="scope" tabindex="-1"><a class="header-anchor" href="#scope" aria-hidden="true">#</a> scope</h3><p>可选，说明 commit 影响的范围，如：utils, components, test...</p><h3 id="subject" tabindex="-1"><a class="header-anchor" href="#subject" aria-hidden="true">#</a> subject</h3><p>必选，commit 的简短描述</p><h3 id="body" tabindex="-1"><a class="header-anchor" href="#body" aria-hidden="true">#</a> body</h3><p>可选，对于本次 commit 的具体描述，可分为多行，如</p><div class="language-text" data-ext="text"><pre class="language-text"><code>* Allow watch handler to be string as it is supported
* Move string type to WatchHandler itself
* Removed string type as it moved to WatchHandler
</code></pre></div><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> footer</h3><p>可选，一些备注，通常是 BREAKING CHANGE(当前代码与上一个版本不兼容) 或修复的 bug(关闭 Issue) 的链接。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><div class="language-text" data-ext="text"><pre class="language-text"><code>fix(attrs): do not consider translate attribute as boolean (#11392)

when present, translate attribute had translate as it&#39;s value, which is not valid, the value should
remain as specified by the user, that&#39;s why we removed it form isBooleanAttr map

fix #11391
</code></pre></div>`,20),r=[o];function c(p,i){return n(),e("div",null,r)}const d=a(t,[["render",c],["__file","git.html.vue"]]);export{d as default};
