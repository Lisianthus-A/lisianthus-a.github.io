---
sidebarDepth: 3
---
# 还没想好分类
## AudioContext 播放音频

``` js
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
let currentSource = null;

// 播放音频
const play = async (arrayBuffer, offset = 0) => {
    // 停止当前音频
    currentSource && currentSource.disconnect();

    // 创建 Source
    const source = audioContext.createBufferSource();
    source.connect(gainNode);
    currentSource = source;

    // ArrayBuffer 转 AudioBuffer
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    source.buffer = audioBuffer;

    // 是否循环播放
    source.loop = true;

    source.start(0, offset);
}

// 暂停播放
const pause = async () => {
    await audioContext.suspend();
    return true;
}

// 恢复播放
const restart = async () => {
    await audioContext.resume();
    return true;
}

// 设置音量
const setVolume = (value) => {
    gainNode.gain.value = value;
}

fetch('xxx.mp3')
    .then(res => res.arrayBuffer())
    .then(play);
```