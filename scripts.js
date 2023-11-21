// Box Game
let boxGame ;
let boxWidth = 960
let boxHeight = 530
let context;

//Dinosaur
let dinoWidth = 88
let dinoHeight = 94
let dinoX = 50
let dionY = boxHeight - dinoHeight
let Img;

let dino= {
    x:dinoX,
    y:dionY,
    width:dinoWidth,
    height:dinoHeight
}
window.addEventListener('load',()=>{
    boxGame = document.getElementById('BoxGame')
    boxGame.height = boxHeight
    boxGame.width = boxWidth
    context = boxGame.getContext('2d'); 
})