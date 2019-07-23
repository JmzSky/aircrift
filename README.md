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

## 创建pixi实例 流程
1.创建一个应用(application)(包含舞台stage)<br>
2.加载资源（loader）<br>
3.创建游戏场景<br>
4.将场景插入舞台(addchild)<br>
5.把画布插入dom（append）<br>
6.创建精灵（sprite）<br>
7.把精灵加入画布（addchild）<br>
8.刷新舞台（ticker）<br>
9.游戏结束，销毁应用（destroy）

```
import * as PIXI from 'pixi.js';
let gameApp = new PIXI.Application({
    width: xxxx,
    height: xxxx,
    antialiasing: true, // 抗锯齿
    transparent: false, // 背景透明
    resolution: 2 // 渲染倍数，避免模糊
});
//加载资源
let loader = new PIXI.Loader();
loader
    .add('bg', 'img/bg.jpg')
    .....
    .load((loader, resources) => {
      // 加载完毕回调
      setUp(); //执行创建精灵等操作
    });

//创建游戏场景并插入舞台 画布插入dom
let gameScene = new PIXI.Container();
gameScene.width = xxx;
gameScene.height = xxx;
gameApp.stage.addchild(gameScene);

document.getElementById('xxx').appendChild(gameApp.view);
```

## 加载飞机大战静态资源
```
const sources = {
  bg: require("@/static/images/bg.jpg"),
  boom: "./img/boom/boom.json",
  plane: require("@/static/images/plane.png"),
  bullet: require("@/static/images/bullet.png"),
  enemy1: require("@/static/images/enemy1.png"),
  enemy2: require("@/static/images/enemy2.png"),
  enemy3: require("@/static/images/enemy3.png"),
}

function gameLoad() {
  for (let i in sources) {
    loader.add(i, sources[i])
  }
  loader.load((loader, resources) => {
    // 加载完毕回调
    gameSetup(resources) //执行创建精灵等操作
    texture = resources
  })
}
```
