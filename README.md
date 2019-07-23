# aircrift
vue cli3 + pixi.js 搭建 h5飞机大战小游戏

## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## pixi.js 简介
Pixi.js使用WebGL，是一个超快的HTML5 2D渲染引擎。作为一个Javascript的2D渲染器，Pixi.js的目标是提供一个快速的、轻量级而且是兼任所有设备的2D库。提供无缝 Canvas 回退，支持主流浏览器，包括桌面和移动。 Pixi渲染器可以开发者享受到硬件加速，但并不需要了解WebGL。

## 创建pixi实例完整流程
### 如何引入pixi.js 创建应用
```
import * as PIXI from 'pixi.js';
let gameApp = new PIXI.Application({
    width: xxxx,
    height: xxxx,
    antialiasing: true, // 抗锯齿
    transparent: false, // 背景透明
    resolution: 2 // 渲染倍数，避免模糊
});
```
