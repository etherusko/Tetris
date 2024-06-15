import { Tetris } from "./Tetris.js";
import { evalDownColitions } from "./events.js";
import { GameInterface } from "./GameInterface.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');    
export const tetris = new Tetris(ctx);
GameInterface.init();
canvas.width = Tetris.Width;
canvas.height = Tetris.Height;
let frame = 0;
gameLoop();

export function gameLoop(){
    if(tetris.running){
        tetris.update();
        frame++;
        if(frame%60 == 0) evalDownColitions();
        tetris.update();
        requestAnimationFrame(gameLoop);
    }   
}