import { Tetris } from "./Tetris.js";
import { events } from "./events.js";
//Get canvas & context 2d
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha: false});
//instancia tetris:
export const tetris = new Tetris(ctx);
//Canvas dimentions
canvas.width = tetris.width;
canvas.height = tetris.height;

//Loop
let frame = 0;
gameLoop();


//Pruebas
tetris.Board[19] = [1,0,0,1,1,1,0,0,1,1]
console.log(tetris.shape);
tetris.drawBoard();
tetris.drawShape();
tetris.drawGrid();

//Funciones
function gameLoop(){
    frame++;
    //clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //update
    update();
    //newframe
    requestAnimationFrame(gameLoop);
}
function update(){
    tetris.drawBoard();
    tetris.drawShape();
    tetris.drawGrid();
}