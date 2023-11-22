// Box Game
let boxGame;
let boxWidth = 960;
let boxHeight = 530;
let context;

//Dinosaur
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dionY = boxHeight - dinoHeight;
let dinoImg;

let dino = {
  x: dinoX,
  y: dionY,
  width: dinoWidth,
  height: dinoHeight,
};
// enemy physics
let enemyArray = [];
let enemy1Width = 70;
let enemy2Width = 100;
let enemy3Width = 152;

let enemyHeight = 120;
let enemyX = 950;
let enemyY = boxHeight - enemyHeight + 15;

let enemy1Img;
let enemy2Img;
let enemy3Img;

// physics
let velocityX = -8; // enemy Moving left speed
let velocityY = 0;
let gravity = 0.4;
let GameOver = false;
let score = 0;
window.addEventListener("load", () => {
  boxGame = document.getElementById("BoxGame");
  boxGame.height = boxHeight;
  boxGame.width = boxWidth;
  context = boxGame.getContext("2d");
  dinoImg = new Image();
  dinoImg.src = "./img/DinoDefault.png";
  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  enemy1Img = new Image();
  enemy1Img.src = "./img/dinoEnemy.png";
  enemy2Img = new Image();
  enemy2Img.src = "./img/dinoEnemy2.png";
  enemy3Img = new Image();
  enemy3Img.src = "./img/dinoEnemy3.png";

  requestAnimationFrame(update);
  setInterval(placeEnemy, 1000);
  document.addEventListener("keydown", moveDino);
});
function update() {
  requestAnimationFrame(update);
  if (GameOver) {
    return;
  }
  context.clearRect(0, 0, boxGame.width, boxGame.height);
  // dino
  velocityY += gravity;
  dino.y = Math.min(dino.y + velocityY, dionY);
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  //enemy
  for (let i = 0; i < enemyArray.length; i++) {
    let enemy = enemyArray[i];
    enemy.x += velocityX;
    context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    if (detectCollision(dino, enemy)) {
      GameOver = true;
      dinoImg.src = "./img/DinoDefault.png";
      dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
      };
    }
  }
  // score
  context.fillStyle = "black";
  context.font = "20px courier";
  score++;
  context.fillText(score, 5, 20);
}

function moveDino(e) {
  if (GameOver) {
    return;
  }
  if ((e.code === "Space" || e.code === "ArrowUp") && dino.y == dionY) {
    //Up
    velocityY = -12;
  }
}
function placeEnemy() {
  if (GameOver) {
    return;
  }
  let enemy = {
    img: null,
    x: enemyX,
    y: enemyY,
    width: null,
    height: enemyHeight,
  };
  let placeEnemyChange = Math.random();
  if (placeEnemyChange > 0.9) {
    // 10%
    enemy.img = enemy3Img;
    enemy.width = enemy3Width;
    enemyArray.push(enemy);
  } else if (placeEnemyChange > 0.7) {
    //30%
    enemy.img = enemy2Img;
    enemy.width = enemy2Width;
    enemyArray.push(enemy);
  } else if (placeEnemyChange > 0.5) {
    // 50%
    enemy.img = enemy1Img;
    enemy.width = enemy1Width;
    enemyArray.push(enemy);
  }
  if (enemyArray.length > 5) {
    enemyArray.shift();
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
