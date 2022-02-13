import{c as n}from"./app.6b3eabdf.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},t=n(`<h1 id="\u90E8\u5206\u529F\u80FD\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u90E8\u5206\u529F\u80FD\u5B9E\u73B0" aria-hidden="true">#</a> \u90E8\u5206\u529F\u80FD\u5B9E\u73B0</h1><h2 id="audiocontext-\u64AD\u653E\u97F3\u9891" tabindex="-1"><a class="header-anchor" href="#audiocontext-\u64AD\u653E\u97F3\u9891" aria-hidden="true">#</a> AudioContext \u64AD\u653E\u97F3\u9891</h2><div class="language-typescript ext-ts"><pre class="language-typescript"><code><span class="token keyword">const</span> audioContext<span class="token operator">:</span> AudioContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AudioContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> gainNode<span class="token operator">:</span> GainNode <span class="token operator">=</span> audioContext<span class="token punctuation">.</span><span class="token function">createGain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gainNode<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>audioContext<span class="token punctuation">.</span>destination<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> currentSource<span class="token operator">:</span> AudioBufferSourceNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">// \u64AD\u653E\u97F3\u9891</span>
<span class="token keyword">const</span> play <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>arrayBuffer<span class="token operator">:</span> ArrayBuffer<span class="token punctuation">,</span> offset<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u505C\u6B62\u5F53\u524D\u97F3\u9891</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        currentSource<span class="token punctuation">.</span>onended <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// \u5FC5\u987B stop \u6389\u5F53\u524D\u97F3\u9891</span>
        <span class="token comment">// \u5426\u5219\u5C31\u7B97 disconnect \u4E86\u8FD8\u662F\u4F1A\u7EE7\u7EED\u64AD\u653E</span>
        <span class="token comment">// \u5360\u7528\u5185\u5B58</span>
        currentSource<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        currentSource<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u521B\u5EFA Source</span>
    <span class="token keyword">const</span> source <span class="token operator">=</span> audioContext<span class="token punctuation">.</span><span class="token function">createBufferSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    source<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>gainNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    currentSource <span class="token operator">=</span> source<span class="token punctuation">;</span>

    <span class="token comment">// ArrayBuffer \u8F6C AudioBuffer</span>
    <span class="token keyword">const</span> audioBuffer <span class="token operator">=</span> <span class="token keyword">await</span> audioContext<span class="token punctuation">.</span><span class="token function">decodeAudioData</span><span class="token punctuation">(</span>arrayBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    source<span class="token punctuation">.</span>buffer <span class="token operator">=</span> audioBuffer<span class="token punctuation">;</span>

    <span class="token comment">// \u662F\u5426\u5FAA\u73AF\u64AD\u653E</span>
    <span class="token comment">// source.loop = true;</span>

    source<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span>audioContext<span class="token punctuation">.</span>currentTime<span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6682\u505C\u64AD\u653E</span>
<span class="token keyword">const</span> pause <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> audioContext<span class="token punctuation">.</span><span class="token function">suspend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6062\u590D\u64AD\u653E</span>
<span class="token keyword">const</span> restart <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> audioContext<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8BBE\u7F6E\u97F3\u91CF</span>
<span class="token keyword">const</span> setVolume <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    gainNode<span class="token punctuation">.</span>gain<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;xxx.mp3&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span><span class="token function">arrayBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>play<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="\u56FE\u7247\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#\u56FE\u7247\u8F6C\u6362" aria-hidden="true">#</a> \u56FE\u7247\u8F6C\u6362</h2><div class="language-typescript ext-ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">ImageConvert</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token doc-comment comment">/**
     * \u56FE\u7247\u5143\u7D20\u6216 base64 \u6570\u636E \u6216 url \u5730\u5740
     */</span>
    img<span class="token operator">:</span> HTMLImageElement <span class="token operator">|</span> HTMLCanvasElement <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * \u662F\u5426\u4E0B\u8F7D\u8F6C\u6362\u540E\u7684\u56FE\u7247
     * 
     * \u4F20\u5165\u5B57\u7B26\u4E32\u53EF\u6307\u5B9A\u4E0B\u8F7D\u540E\u7684\u6587\u4EF6\u540D
     */</span>
    download<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * \u8F6C\u6362\u540E\u7684\u5BBD\u5EA6
     */</span>
    width<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * \u8F6C\u6362\u540E\u7684\u9AD8\u5EA6
     */</span>
    height<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// \u5C06\u56FE\u7247\u8F6C\u4E3A\u76EE\u6807\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u7684 base64 \u6570\u636E</span>
<span class="token keyword">const</span> imageConvert<span class="token operator">:</span> <span class="token function-variable function">ImageConvert</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>img<span class="token punctuation">,</span> download<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;canvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// \u56FE\u7247\u53EF\u80FD\u8DE8\u57DF</span>
    image<span class="token punctuation">.</span>crossOrigin <span class="token operator">=</span> <span class="token string">&#39;anonymous&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLImageElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span>src<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>img <span class="token keyword">instanceof</span> <span class="token class-name">HTMLCanvasElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">&#39;image/png&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        image<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u7B49\u5F85\u56FE\u7247\u52A0\u8F7D\u5B8C\u6210</span>
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
</code></pre></div>`,5);function p(o,e){return t}var l=s(a,[["render",p]]);export{l as default};
