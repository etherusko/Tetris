import { Tetris } from "./Tetris.js";
import { evalDownColitions } from "./events.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha: false});
export const tetris = new Tetris(ctx);
canvas.width = Tetris.Width;
canvas.height = Tetris.Height;
let frame = 0;
gameLoop();

function gameLoop(){
    frame++;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(frame%60 == 0) evalDownColitions();
    tetris.update();
    requestAnimationFrame(gameLoop);
}