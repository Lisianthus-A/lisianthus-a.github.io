import{_ as n,p as s,q as a,a1 as t}from"./framework-5866ffd3.js";const p={},o=t(`<h1 id="部分功能实现" tabindex="-1"><a class="header-anchor" href="#部分功能实现" aria-hidden="true">#</a> 部分功能实现</h1><h2 id="audiocontext-播放音频" tabindex="-1"><a class="header-anchor" href="#audiocontext-播放音频" aria-hidden="true">#</a> AudioContext 播放音频</h2><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> audioContext<span class="token operator">:</span> AudioContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AudioContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> gainNode<span class="token operator">:</span> GainNode <span class="token operator">=</span> audioContext<span class="token punctuation">.</span><span class="token function">createGain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gainNode<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>audioContext<span class="token punctuation">.</span>destination<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> currentSource<span class="token operator">:</span> AudioBufferSourceNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">// 播放音频</span>
<span class="token keyword">const</span> play <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>arrayBuffer<span class="token operator">:</span> ArrayBuffer<span class="token punctuation">,</span> offset<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 停止当前音频</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        currentSource<span class="token punctuation">.</span>onended <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 必须 stop 掉当前音频</span>
        <span class="token comment">// 否则就算 disconnect 了还是会继续播放</span>
        <span class="token comment">// 占用内存</span>
        currentSource<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        currentSource<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建 Source</span>
    <span class="token keyword">const</span> source <span class="token operator">=</span> audioContext<span class="token punctuation">.</span><span class="token function">createBufferSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    source<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>gainNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    currentSource <span class="token operator">=</span> source<span class="token punctuation">;</span>

    <span class="token comment">// ArrayBuffer 转 AudioBuffer</span>
    <span class="token keyword">const</span> audioBuffer <span class="token operator">=</span> <span class="token keyword">await</span> audioContext<span class="token punctuation">.</span><span class="token function">decodeAudioData</span><span class="token punctuation">(</span>arrayBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    source<span class="token punctuation">.</span>buffer <span class="token operator">=</span> audioBuffer<span class="token punctuation">;</span>

    <span class="token comment">// 是否循环播放</span>
    <span class="token comment">// source.loop = true;</span>

    source<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span>audioContext<span class="token punctuation">.</span>currentTime<span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 暂停播放</span>
<span class="token keyword">const</span> pause <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> audioContext<span class="token punctuation">.</span><span class="token function">suspend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 恢复播放</span>
<span class="token keyword">const</span> restart <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> audioContext<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 设置音量</span>
<span class="token keyword">const</span> setVolume <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    gainNode<span class="token punctuation">.</span>gain<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;xxx.mp3&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span><span class="token function">arrayBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>play<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="图片转换" tabindex="-1"><a class="header-anchor" href="#图片转换" aria-hidden="true">#</a> 图片转换</h2><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">ImageConvert</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token doc-comment comment">/**
     * 图片元素或 base64 数据 或 url 地址
     */</span>
    img<span class="token operator">:</span> HTMLImageElement <span class="token operator">|</span> HTMLCanvasElement <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 是否下载转换后的图片
     * 
     * 传入字符串可指定下载后的文件名
     */</span>
    download<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 转换后的宽度
     */</span>
    width<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * 转换后的高度
     */</span>
    height<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// 将图片转为目标宽度和高度的 base64 数据</span>
<span class="token keyword">const</span> imageConvert<span class="token operator">:</span> <span class="token function-variable function">ImageConvert</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>img<span class="token punctuation">,</span> download<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 图片可能跨域</span>
    image<span class="token punctuation">.</span>crossOrigin <span class="token operator">=</span> <span class="token string">&#39;anonymous&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLImageElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span>src<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCanvasElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">&#39;image/png&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 等待图片加载完成</span>
    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span>resolve <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>onload <span class="token operator">=</span> resolve<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> targetWidth <span class="token operator">=</span> width <span class="token operator">||</span> image<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
    <span class="token keyword">const</span> targetHeight <span class="token operator">=</span> height <span class="token operator">||</span> image<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
    canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> targetWidth<span class="token punctuation">;</span>
    canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> targetHeight<span class="token punctuation">;</span>
    ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> targetWidth<span class="token punctuation">,</span> targetHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> base64Data <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">&#39;image/png&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>download<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span>href <span class="token operator">=</span> base64Data<span class="token punctuation">;</span>
        <span class="token keyword">const</span> fileName <span class="token operator">=</span> <span class="token keyword">typeof</span> download <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span> <span class="token operator">?</span> download <span class="token operator">:</span> <span class="token string">&#39;image&#39;</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>fileName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.png</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> base64Data<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","functions.html.vue"]]);export{i as default};
