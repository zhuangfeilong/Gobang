var canvas = document.getElementById("fgame");
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// 背景设置
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
}
bgImage.src = "fgameimages/blue-background.png";

// 加入图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "fgameimages/iron-man.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "fgameimages/purplemonster.png";


var hero = {
  speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// 处理输入事件
var keysDown = {};
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// 重置游戏
var reset = function () {
  if(!(hero.x || hero.y)){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
  } else {
    hero.x=caughtX;
    hero.y=caughtY;
  }
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}
// 更新游戏对象的状态
var caughtX;
var caughtY;
var update = function (modifier) {
  if (38 in keysDown) {
    // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    // Player holding right
    hero.x += hero.speed * modifier;
  }
  // Are you touching?
  if (
    hero.x <= (monster.x + 31)
    && monster.x <= (hero.x + 31)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    caughtX = hero.x;
    caughtY = hero.y;
    reset();
  }
};

// 渲染出游戏的内容
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // score
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("IronMan抓获了 " + monstersCaught + " 只怪物", 32, 32);
};

// The main game loop
var main = function () {
  var now = new Date();
  var delta = now - then;
  update(delta / 1000);
  render();
  then = now;

  requestAnimationFrame(main);
}
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// 启动Start
var then = Date.now();
reset();
main();