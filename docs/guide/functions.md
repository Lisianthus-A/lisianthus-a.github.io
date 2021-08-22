---
sidebarDepth: 3
---
# 部分功能实现
## AudioContext 播放音频

``` ts
const audioContext: AudioContext = new AudioContext();
const gainNode: GainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
let currentSource: AudioBufferSourceNode | null = null;

// 播放音频
const play = async (arrayBuffer: ArrayBuffer, offset: number = 0): Promise<void> => {
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

    source.start(audioContext.currentTime, offset);
}

// 暂停播放
const pause = async (): Promise<boolean> => {
    await audioContext.suspend();
    return true;
}

// 恢复播放
const restart = async (): Promise<boolean> => {
    await audioContext.resume();
    return true;
}

// 设置音量
const setVolume = (value: number): void => {
    gainNode.gain.value = value;
}

fetch('xxx.mp3')
    .then(res => res.arrayBuffer())
    .then(play);
```

## 图片转换
``` ts
type ImageConvert = (
    img: HTMLImageElement | string,  // 图片元素或 base64 数据 或 url 地址
    download?: boolean,  // 是否下载
    width?: number,  // 目标宽度
    height?: number,  // 目标高度
) => Promise<string>;

// 将图片转为目标高度和宽度的 base64 数据
const imageConvert: ImageConvert = async (img, download, width, height) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (img instanceof HTMLImageElement) {
        const targetWidth = width || img.width;
        const targetHeight = height || img.height;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    } else {
        const image = new Image();
        image.src = img;
        await new Promise<void>(resolve => {
            image.onload = function () {
                resolve();
            }
        });
        const targetWidth = width || image.width;
        const targetHeight = height || image.height;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    }

    const base64Data = canvas.toDataURL();
    if (download) {
        const a = document.createElement('a');
        a.href = base64Data;
        a.download = 'image.png';
        a.click();
    }

    return base64Data;
}
```