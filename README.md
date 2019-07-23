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

## 生成飞机类
```
let delay = 0
let createSpeed = 0.2
function createPlane(resources) {
  // 创建
  let plane = new PIXI.Sprite(resources.plane.texture)
  plane.name = "plane"
  plane.width = 80
  plane.height = 60
  plane.x = document.body.clientWidth / 2
  plane.y = document.body.clientHeight - plane.height

  // 拖动
  plane.interactive = true
  plane.on("pointermove", onDragMove)
  // 射击
  plane.shut = shut
  function shut(gameScene, bullets) {
    if (delay > createSpeed) {
      delay = 0
      let bullet = new PIXI.Sprite(resources.bullet.texture)
      bullet.width = 10
      bullet.height = 20
      bullet.x = plane.x + plane.width * 0.5 - bullet.width * 0.5
      bullet.y = plane.y
      gameScene.addChild(bullet)
      bullets.push(bullet)
    } else {
      delay += 1 / 60
    }
  }
  return plane
}

/**
 * 我方飞机移动
 * @param {*} event
 */
function onDragMove(event) {
  let currentTarget = event.currentTarget
  let newPosition = event.data.global // 获取拖动到的位置
  // 划分范围
  if (newPosition.x > 0 && newPosition.x < getWidth(100)) {
    currentTarget.x = newPosition.x - currentTarget.width * 0.5
  }
  if (newPosition.y > 0 && newPosition.y < getHeight(100)) {
    currentTarget.y = newPosition.y - currentTarget.height * 0.5
  }
}
```

## 生成敌机
```
let enemy_delay = 0
let enemy_createSpeed = 3
let obstacleTime = 6000
function createobstacle(gameScene, texture, obstacles, TWEEN, tweens) {
  if (enemy_delay > enemy_createSpeed) {
    enemy_createSpeed -= enemy_createSpeed * 0.05
    enemy_delay = 0
    let container = new PIXI.Container()
    // 图案-随机生成敌机(小飞机,中飞机,大飞机)
    let enemyType = Math.floor(Math.random() * 3)
    let enemySprite,enemyWidth,enemyHeight,enemyScore
    if(enemyType==1){
      enemySprite = texture.enemy1.texture
      enemyWidth = 50
      enemyHeight = 50
      enemyScore = 1
    }else if(enemyType==2){
      enemySprite = texture.enemy2.texture
      enemyWidth = 70
      enemyHeight = 70
      enemyScore = 2
    }else{
      enemySprite = texture.enemy3.texture
      enemyWidth = 80
      enemyHeight = 80
      enemyScore = 3
    }

    let obstacle = new PIXI.Sprite(enemySprite)

    obstacle.name = "obstacle"
    obstacle.width = enemyWidth
    obstacle.height = enemyHeight
    obstacle.x = 0
    obstacle.y = 0
    obstacle.score = enemyScore
    obstacle.anchor.set(0.5, 0.5)
    // 碰撞区域
    let circle = new PIXI.Sprite()
    circle.width = obstacle.width * 0.5
    circle.height = circle.width
    circle.name = "circle"
    circle.circular = true
    circle.x = -circle.width * 0.5
    circle.y = -circle.height * 0.5
    circle.score = enemyScore

    container.addChild(circle)

    // 爆炸效果
    let fireClip = []
    for (let i = 0; i <= 23; i++) {
      fireClip.push(texture.boom.textures["boom" + i + ".png"])
    }
    let boom = new PIXI.AnimatedSprite(fireClip)
    boom.width = obstacle.width * 2.5
    boom.height = obstacle.height * 2.5
    boom.x = -boom.width * 0.5
    boom.y = -boom.height * 0.5
    boom.name = "boom"
    boom.loop = false
    container.addChild(boom)

    container.addChild(obstacle)
    container.addChild(circle)
    container.x = getWidth(Math.random() * 100)
    container.y = -obstacle.height

    // 位移设定
    let tween = new TWEEN.Tween(container)
      .to(
        {
          x: getWidth(Math.random() * 100),
          y: getHeight(100) + obstacle.height
        },
        obstacleTime // tween持续时间
      )
      .easing(TWEEN.Easing.Linear.None)
      .onComplete(function() {
        // 到底
        container.destroy()
      })
    tween.start()

    // 插入场景
    container.tween = tween
    obstacles.push(circle)
    tweens.push(tween)
    gameScene.addChild(container)
  } else {
    enemy_delay += 1 / 60
  }
}
```

## 子弹碰撞检测
```
function hitTest(r1, r2) {
  let b = new Bump(PIXI)
  if (b.hitTestCircleRectangle(r1, r2, true) !== false) {
    return true
  } else {
    return false
  }
}
```

## 思路
首先遍历子弹池，内部遍历所有障碍物，通过hitTest做碰撞检测 如果子弹和障碍物碰撞，子弹消失，障碍物消失/爆炸，得分+1； 如果飞机和障碍物碰撞，障碍物消失/爆炸，游戏结束 如果都没有，检测下一个子弹 如果子弹自下而上，飞出屏幕，则子弹移除，否则影响性能
