import { Tetris } from "./Tetris.js";
import { evalDownColitions } from "./events.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha: false});
export const tetris = new Tetris(ctx);
canvas.width = Tetris.Width;
canvas.height = Tetris.Height;

/**Inteface*/
const holdSpace = document.querySelector('.hold');
const holdCanvas = document.createElement('canvas');
const holdContext = holdCanvas.getContext('2d',{alpha: false});
holdCanvas.width = 100;
holdCanvas.height = 100;
holdSpace.appendChild(holdCanvas);

let frame = 0;
gameLoop();

function gameLoop(){
    frame++;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(frame%60 == 0) evalDownColitions();
    tetris.update();
    drawHoldInteface();
    requestAnimationFrame(gameLoop);
}

console.log("Interface");


/*prueba*/
//holdContext.scale(Tetris.#BlockSize,Tetris.#BlockSize);
function drawHoldInteface(){
    holdContext.clearRect(0,0,holdCanvas.width,holdCanvas.height);
    holdContext.scale(25,25);
    let dx = (4-tetris.shape[0].length)/2;
    let dy = (4-tetris.shape.length)/2;
    tetris.shape.forEach((row,y) => row.forEach((block,x) => {
       if(block == 1) holdContext.drawImage(Tetris.Icons[tetris.shapeNumber%2],x+dx,y+dy,1,1);
    }))
    holdContext.scale(1/25,1/25);
}

console.log(holdSpace);
console.dir(holdSpace);