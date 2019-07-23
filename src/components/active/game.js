/* eslint-disable */
import * as PIXI from "pixi.js"
import TWEEN from "tween.js"

const Application = PIXI.Application
const Container = PIXI.Container
const Sprite = PIXI.Sprite
const loader = new PIXI.Loader()
let app
let gameScene
let plane
let texture
let bullets = [] // 子弹组
let obstacles = [] // 障碍物组
let tweens = []
let total_score = 50 //分数达到才算通过
let score = 0 // 分数
let scorePanel // 分数记录
let comm = null
let game = {
  gameInit: gameInit,
  start: gameStart,
  end: () => {}
}

//静态资源
const sources = {
  bg: require("@/static/images/bg.jpg"),
  boom: "./img/boom/boom.json",
  plane: require("@/static/images/plane.png"),
  bullet: require("@/static/images/bullet.png"),
  enemy1: require("@/static/images/enemy1.png"),
  enemy2: require("@/static/images/enemy2.png"),
  enemy3: require("@/static/images/enemy3.png"),
}

// 加载资源
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

/**
 * 初始化
 * @param {*} dom
 */
function gameInit(dom, func) {
  app = new Application({
    width: getWidth(100),
    height: getHeight(100),
    antialiasing: true, // 抗锯齿
    transparent: false, // 背景透明
    resolution: 2 // 渲染倍数，避免模糊
  })
  dom.append(app.view)
  comm = func
  gameLoad()
}

/**
 * 初始化后调用函数
 * @param {*} resources
 */
function gameSetup(resources) {
  // 创建场景
  gameScene = new Container()
  gameScene.name = "gameScene"
  gameScene.width = getWidth(100)
  gameScene.height = getHeight(100)
  gameScene.x = 0
  gameScene.y = 0
  app.stage.addChild(gameScene)
  // 创建背景
  let bg = new Sprite(resources.bg.texture)
  bg.width = getWidth(100)
  bg.height = getHeight(100)
  bg.x = 0
  bg.y = 0
  gameScene.addChild(bg)
  // 创建分数
  scorePanel = new PIXI.Text("得分：" + score, {
    fontSize: 10,
    fill: "#fff"
  })
  scorePanel.x = 10
  scorePanel.y = 10
  scorePanel.name = "scorePanel"
  gameScene.addChild(scorePanel)
  // 创建飞机
  plane = createPlane(resources)
  gameScene.addChild(plane)
  gameStart()
}

/**
 * 调用pixi ticker定时器开启游戏
 */
function gameStart() {
  app.ticker.add(function() {
    return gameLoop()
  })
}

/**
 * 定时操作函数
 */
function gameLoop() {
  // 生成子弹
  plane.shut(gameScene, bullets)
  // 生成障碍物
  createobstacle(gameScene, texture, obstacles, TWEEN, tweens)
  // 子弹逻辑处理
  bulletsEvents()
  // 障碍物逻辑处理
  obstaclesEvents()
}

/**
 * 子弹碰撞检测
 */
function bulletsEvents() {
  for (let i = 0; i < bullets.length; ) {
    let hit = false
    for (let o = 0; o < obstacles.length; ) {
      // 子弹与障碍物碰撞检测
      if (hitTest(obstacles[o], bullets[i])) {
        hit = true
        // 加分
        score = score+obstacles[o].score
        scorePanel.text = "得分：" + score
        // 移除障碍物
        obstaclesBoom(o)
        continue
      } else if (hitTest(obstacles[o], plane)) {
        // 飞机与障碍物碰撞检测
        let _obstacle = obstacles.splice(o, 1)[0]
        _obstacle.destroy()
        gameOver()
        continue
      } else {
        o++
      }
    }
    // 根据碰撞状态做处理
    if (hit) {
      // 如果碰撞了
      // 移除当前子弹
      let _bullet = bullets.splice(i, 1)[0]
      _bullet.destroy()
    } else {
      // 如果子弹飞出屏幕，则移除；如果没有，Y轴位移
      if (bullets[i].y < -bullets[i].height) {
        let _bullet = bullets.splice(i, 1)[0]
        _bullet.destroy()
      } else {
        bullets[i].y -= 10
        i++
      }
    }
  }
}

/**
 * 子弹碰撞后移除障碍物
 * @param {*} o
 */
function obstaclesBoom(o) {
  let container = obstacles[o].parent
  let _obstacle = obstacles.splice(o, 1)[0]
  _obstacle.destroy()
  container.children[0].play()
  container.children[1].visible = false
}

/**
 * 障碍物更新位置移动
 */
function obstaclesEvents() {
  TWEEN.update()
}

/**
 * 生成我方飞机类
 * @param {*} resources
 */
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

/**
 * 生成敌机障碍物
 * @param {*} gameScene
 * @param {*} texture
 * @param {*} obstacles
 * @param {*} TWEEN
 * @param {*} tweens
 */
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

/**
 * 子弹碰撞检测
 * @param {*} r1
 * @param {*} r2
 */
function hitTest(r1, r2) {
  let b = new Bump(PIXI)
  if (b.hitTestCircleRectangle(r1, r2, true) !== false) {
    return true
  } else {
    return false
  }
}

function getWidth(precent) {
  let w = document.body.clientWidth > 720 ? 720 : document.body.clientWidth
  return ((precent / 50) * w) / 2
}

function getHeight(precent) {
  let h = document.body.clientHeight
  return ((precent / 50) * h) / 2
}

/**
 * 游戏结束
 */
function gameOver() {
  console.log("游戏结束")
  app.ticker.stop()
  let type,list
  if (score > total_score) {
    type = 1
    list = ["恭喜您挑战成功!", "你的得分为：" + score]
  } else {
    type = 2
    list = ["挑战失败,挑战过关需达到" + total_score + "分"]
  }
  const challengeData = {
    type: type,
    list: list,
    toAgain: function() {
        location.reload(true);
    },
    toFollow: function() {
      //关注我们
      comm.Follow()
    }
  }
  comm.Challenge(challengeData)
}

export default game
