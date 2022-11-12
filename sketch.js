var soldier,
  soldierImg,

  bulletImg,
  bullet,
  restart,
  restartImage,
  gameover,
  gameoverImage;
var enemy, enemy_running
var mg, mgImg;
var bulletGroup, enemyGroup, mgGroup
var wall, lifeImage;
var lifetime = 180;
var lifenow;
var score = 0;
var life = 3;
var play = 1;
var end = 0;
var gamestate = play;

var bullets = 20;

function preload() {
  bg = loadImage("./background.webp");
  soldierImg = loadImage("./assets/soldier1.png");
  bulletImg = loadImage("./assets/bullet1.png");
  enemy_running = loadAnimation("./assets/enemy1.png", "./assets/enemy2.png");
  mgImg = loadImage("./assets/magazine.png");
  restartImage = loadImage("./assets/restart.png");
  gameoverImage = loadImage("./assets/gameOver.png");
  lifeImage = loadImage("./assets/life.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  soldier = createSprite(100, 200, 60, 80);
  soldier.addImage(soldierImg);

  wall = createSprite(180, 365, 10, 730);
  wall.visible = false;

  restart = createSprite(1000, 60);
  restart.scale = 0.8;
  restart.addImage(restartImage);

  gameover = createSprite(800, 400);
  gameover.scale = 1.5;
  gameover.addImage(gameoverImage);

  bulletGroup = createGroup();
  enemyGroup = createGroup();
  mgGroup = createGroup();
  enemybulletGroup = createGroup();
  lifeGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
  magazine = createElement("h1");
}

function draw() {
  background(bg);

  heading.html("Life: " + life);
  heading.style("color:red");
  heading.position(150, 20);

  scoreboard.html("Score: " + score);
  scoreboard.style("color:red");
  scoreboard.position(width - 200, 20);

  magazine.html("Bullets: " + bullets);
  magazine.style("color:blue");
  magazine.position(600, 20);

  if (gamestate === play) {
    soldier.y = mouseY;

    gameover.visible = false;
    restart.visible = false;

    if (frameCount % 80 === 0) {
      showenemy();
    }

    if (frameCount % 200 === 0) {
      liferesource();
    }

    if (frameCount % 100 === 0) {
      createMg();
    }

    if (keyWentDown("space")) {
      shootBullet();
    }

    for (var i = 0; i < enemyGroup.length; i += 1) {
      if (bulletGroup.isTouching(enemyGroup.get(i))) {
        enemyGroup.get(i).destroy();
        bulletGroup.destroyEach();
        if (life > 0) {
          score += 1;
          bullets -= 1;
        }
      }
    }
    for (var i = 0; i < mgGroup.length; i += 1) {
      if (soldier.isTouching(mgGroup.get(i))) {
        mgGroup.get(i).destroy();
        bullets += 1;
        bullets > 0;
        bullets < 20;
      }
    }
    for (var i = 0; i < enemyGroup.length; i += 1) {
      if (wall.isTouching(enemyGroup.get(i))) {
        enemyGroup.get(i).destroy();
        life -= 1;
      }
    }

    if (life === 0) {
      gamestate = end;
    }
    if (bullets === 0) {
      gamestate = end;
    }

    for (var i = 0; i < lifeGroup.length; i += 1) {
      if (soldier.isTouching(lifeGroup.get(i))) {
        lifeGroup.get(i).destroy();
        lifetime = 180;
      }
    }

    if (lifetime < 0) {
      gamestate = end;
    }
    ShowlifeBar();
  }
  if (gamestate === end) {
    background("white");

    restart.visible = true;
    gameover.visible = true;

    enemyGroup.destroyEach();
   soldier.visible=false
    enemy.velocityX = 0;
    mg.velocityX = 0;
    mgGroup.destroyEach();
    lifeGroup.destroyEach();

    if (mousePressedOver(restart)) {
      gamestate = play;
      gameover.visible = false;
      restart.visible = false;
      score = 0;
      enemyGroup.destroyEach();
      lifeGroup.destroyEach();
      mgGroup.destroyEach();
      soldier.visible=true
      life = 3;
      bullets = 20;
      lifetime = 180;
    }
  }

  drawSprites();
}

function shootBullet() {
  bullet = createSprite(150, width / 2, 50, 20);
  bullet.y = soldier.y - 35;
  bullet.addImage(bulletImg);
  bullet.scale = 0.03;
  bullet.velocityX = 15;
  bulletGroup.add(bullet);
}

function showenemy() {
  enemy = createSprite(1500, random(40, 760), 60, 80);
  enemy.addAnimation("running", enemy_running);
  enemy.velocityX = -5;
  enemy.lifetime = 300;
  enemyGroup.add(enemy);
}

function createMg() {
  mg = createSprite(1500, random(40, 760), 40, 20);
  mg.addImage(mgImg);
  mg.scale = 0.15;
  mg.velocityX = -5;
  mg.lifetime = 300;
  mgGroup.add(mg);
}

function liferesource() {
  lifenow = createSprite(1500, random(40, 760), 40, 20);
  lifenow.addImage(lifeImage);
  lifenow.scale = 0.2;
  lifenow.velocityX = -5;
  lifenow.lifetime = 300;
  lifeGroup.add(lifenow);
}

function ShowlifeBar() {
  push();
  image(lifeImage, 960, 20, 30, 30);
  fill("white");
  rect(1000, 20, 180, 20);
  fill("red");
  rect(1000, 20, lifetime, 20);

  lifetime = lifetime - 0.3;

  pop();
}
