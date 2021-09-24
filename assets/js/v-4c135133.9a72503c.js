"use strict";(self.webpackChunkgithub_io=self.webpackChunkgithub_io||[]).push([[67],{8199:(e,a,t)=>{t.r(a),t.d(a,{data:()=>n});const n={key:"v-4c135133",path:"/guide/git.html",title:"Git",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"常用命令",slug:"常用命令",children:[]},{level:2,title:"提交规范",slug:"提交规范",children:[{level:3,title:"type",slug:"type",children:[]},{level:3,title:"scope",slug:"scope",children:[]},{level:3,title:"subject",slug:"subject",children:[]},{level:3,title:"body",slug:"body",children:[]},{level:3,title:"footer",slug:"footer",children:[]},{level:3,title:"示例",slug:"示例",children:[]}]}],filePathRelative:"guide/git.md",git:{updatedTime:1632475794e3}}},4325:(e,a,t)=>{t.r(a),t.d(a,{default:()=>o});const n=(0,t(6252).uE)('<h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> 暂存文件\n<span class="token function">git</span> commit -m <span class="token string">&quot;message&quot;</span> 提交到本地仓库\n<span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 将本地的 branch 分支推送到远程仓库\n<span class="token function">git</span> checkout -b <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 以当前分支为基础，另起一个 branch 分支\n<span class="token function">git</span> checkout <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 将本地代码版本变为 branch 分支的版本\n<span class="token function">git</span> merge <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 将 branch 分支合并到当前分支\n<span class="token function">git</span> branch -d <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 删除 branch 分支\n<span class="token function">git</span> branch -a 查看所有分支\n<span class="token function">git</span> branch -m <span class="token string">&quot;&quot;</span> 将当前分支重命名\n<span class="token function">git</span> pull --rebase 拉取远程仓库代码并变基\n<span class="token function">git</span> pull <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> 合并远程仓库的 branch 分支到当前分支\n<span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>hash<span class="token operator">&gt;</span> 拾取哈希值为 <span class="token builtin class-name">hash</span> 的提交到当前分支\n<span class="token function">git</span> reset HEAD^ 回退一个版本\n</code></pre></div><h2 id="提交规范" tabindex="-1"><a class="header-anchor" href="#提交规范" aria-hidden="true">#</a> 提交规范</h2><p>Angular 团队的 commit 规范格式如下：</p><div class="language-text ext-text"><pre class="language-text"><code>type(scope): subject\n//空行\nbody\n//空行\nfooter\n</code></pre></div><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> type</h3><p>必选，说明 commit 的类型。一般有以下几种：</p><div class="language-text ext-text"><pre class="language-text"><code>feat: 新增 feature\nfix: 修复 bug\ndocs: 只修改了文档\nstyle: 对格式进行修改，不改变代码逻辑\nrefactor: 代码重构，没有新增功能或修复 bug\nperf: 优化相关，不影响功能。如性能优化、提高用户体验等\ntest: 测试用例相关\nbuild: 影响构建或依赖项修改\nrevert: 版本回滚\nworkflow: 工作流文件修改\nchore: 其他修改\n</code></pre></div><h3 id="scope" tabindex="-1"><a class="header-anchor" href="#scope" aria-hidden="true">#</a> scope</h3><p>可选，说明 commit 影响的范围，如：utils, components, test...</p><h3 id="subject" tabindex="-1"><a class="header-anchor" href="#subject" aria-hidden="true">#</a> subject</h3><p>必选，commit 的简短描述</p><h3 id="body" tabindex="-1"><a class="header-anchor" href="#body" aria-hidden="true">#</a> body</h3><p>可选，对于本次 commit 的具体描述，可分为多行，如</p><div class="language-text ext-text"><pre class="language-text"><code>* Allow watch handler to be string as it is supported\n* Move string type to WatchHandler itself\n* Removed string type as it moved to WatchHandler\n</code></pre></div><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> footer</h3><p>可选，一些备注，通常是 BREAKING CHANGE(当前代码与上一个版本不兼容) 或修复的 bug(关闭 Issue) 的链接。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><div class="language-text ext-text"><pre class="language-text"><code>fix(attrs): do not consider translate attribute as boolean (#11392)\n\nwhen present, translate attribute had translate as it&#39;s value, which is not valid, the value should\nremain as specified by the user, that&#39;s why we removed it form isBooleanAttr map\n\nfix #11391\n</code></pre></div>',20),s={},o=(0,t(3744).Z)(s,[["render",function(e,a){return n}]])},3744:(e,a)=>{a.Z=(e,a)=>{for(const[t,n]of a)e[t]=n;return e}}}]);