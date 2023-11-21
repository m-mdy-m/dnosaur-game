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
// enemi physics
let enmeiArray = [];
let enmei1Width = 70;
let enmei2Width = 100;
let enemi3Width = 152;

let enemiHeight = 120;
let enemiX = 950;
let enemiY = boxHeight - enemiHeight + 15;

let enemi1Img;
let enemi2Img;
let enemi3Img;

// physics
let velocityX = -4; // enime Moving left speed
let velocityY = 0;
let gravity = 0.4;
let GameOver = false;
let score = 0;
window.addEventListener("load", () => {
  boxGame = document.getElementById("BoxGame");
  boxGame.height = boxHeight;
  boxGame.width = boxWidth;
  context = boxGame.getContext("2d");
  //   context.fillStyle = "green";
  //   context.fillRect(dino.x, dino.y, dino.width, dino.height);
  dinoImg = new Image();
  dinoImg.src = "./img/DinoDefault.png";
  dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  enemi1Img = new Image();
  enemi1Img.src = "./img/DinpDefault2.png";
  enemi2Img = new Image();
  enemi2Img.src = "./img/DinpDefault2.png";
  enemi3Img = new Image();
  enemi3Img.src = "./img/DinpDefault2.png";

  requestAnimationFrame(update);
  setInterval(placeEnmei, 1000);
});
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, boxGame.width, boxGame.height);
  // dino
  context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  //enemi
  for (let i = 0; i < enmeiArray.length; i++) {
    let enemi = enmeiArray[i];
    enemi.x += velocityX;
    context.drawImage(enemi.img, enemi.x, enemi.y, enemi.width, enemi.height);
  }
}
function placeEnmei() {
  let enemi = {
    img: null,
    x: enemiX,
    y: enemiY,
    width: null,
    height: enemiHeight,
  };
  let placeEnmeiChange = Math.random();
  if (placeEnmeiChange > 0.9) {
    // 10%
    enemi.img = enemi3Img;
    enemi.width = enemi3Width;
    enmeiArray.push(enemi);
  } else if (placeEnmeiChange > 0.7) {
    //30%
    enemi.img = enemi2Img;
    enemi.width = enmei2Width;
    enmeiArray.push(enemi);
  } else if (placeEnmeiChange > 0.5) {
    // 50%
    enemi.img = enemi1Img;
    enemi.width = enmei1Width;
    enmeiArray.push(enemi);
  }
}
