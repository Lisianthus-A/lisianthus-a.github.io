import{_ as n,p as s,q as a,a1 as t}from"./framework-5866ffd3.js";const p={},o=t(`<h1 id="库" tabindex="-1"><a class="header-anchor" href="#库" aria-hidden="true">#</a> 库</h1><h2 id="json-server" tabindex="-1"><a class="header-anchor" href="#json-server" aria-hidden="true">#</a> JSON Server</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><p><code>npm i json-server</code></p><h3 id="模块化使用" tabindex="-1"><a class="header-anchor" href="#模块化使用" aria-hidden="true">#</a> 模块化使用</h3><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> jsonServer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;json-server&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> jsonServer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> jsonServer<span class="token punctuation">.</span><span class="token function">router</span><span class="token punctuation">(</span><span class="token string">&#39;db.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 自定义响应</span>
router<span class="token punctuation">.</span><span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 当传入 query 带有 _page 和 _limit 时，数据总数为</span>
    <span class="token comment">// const total = res.getHeader(&#39;X-Total-Count&#39;).value();</span>

    res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">res</span><span class="token operator">:</span> <span class="token string">&#39;succ&#39;</span><span class="token punctuation">,</span>
        data
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 应用中间件</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>jsonServer<span class="token punctuation">.</span><span class="token function">defaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>jsonServer<span class="token punctuation">.</span>bodyParser<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 自定义路由</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">&#39;GET&#39;</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span>path <span class="token operator">===</span> <span class="token string">&#39;/list&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">JSON Server is running on port: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token number">3000</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,6),c=[o];function e(u,l){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","library.html.vue"]]);export{k as default};
