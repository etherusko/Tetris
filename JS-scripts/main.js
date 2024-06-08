import { Tetris } from "./Tetris.js";
import { events,evalDownColitions } from "./events.js";
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

//Funciones
function gameLoop(){
    frame++;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(frame%60 == 0){
        evalDownColitions();
        }
    update();
    requestAnimationFrame(gameLoop);
}
function update(){
    tetris.drawBoard();
    tetris.drawShape();
    tetris.drawGrid();
}