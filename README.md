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

## 创建pixi实例 完整流程
### 引入pixi.js 创建应用
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
### 加载资源
```
let loader = new PIXI.Loader();
loader
    .add('bg', 'img/bg.jpg')
    .....
    .load((loader, resources) => {
      // 加载完毕回调
      setUp(); //执行创建精灵等操作
    });
```
### 创建游戏场景并插入舞台 画布插入dom
```
let gameScene = new PIXI.Container();
gameScene.width = xxx;
gameScene.height = xxx;
gameApp.stage.addchild(gameScene);

document.getElementById('xxx').appendChild(gameApp.view);
```
### 创建精灵并插入场景
```
//首先，为了方便的设定精灵宽高，声明两个方法
function getWidth (precent) {
  let w = document.body.clientWidth > 720 ? 720 : document.body.clientWidth;
  return (precent / 50) * w / 2;
}
function getHeight (precent) {
  let h = document.body.clientHeight;
  return (precent / 50) * h / 2;
}
//背景
let bg = new PIXI.Sprite(resources.bg.texture);
bg.width = xxx;
bg.height = xxx;
bg.x = xxx;
bg.y = xxx;
gameScene.addchild(bg)
//飞机
let plane = new PIXI.Sprite(resources.plane.texture);
plane.width = xxx;
plane.height = xxx;
plane.x = xxx;
plane.y = xxx;
gameScene.addchild(plane)
//给飞机添加拖动事件，让飞机跟着手指移动。 给飞机添加射击事件，在ticker中调用，使飞机一直发射子弹 
let obstacle  = new PIXI.Sprite(resources.obstacle.texture);
obstacle.width = xxx;
obstacle.height = xxx;
obstacle.x = xxx;
obstacle.y = xxx;
gameScene.addchild(obstacle)
```
