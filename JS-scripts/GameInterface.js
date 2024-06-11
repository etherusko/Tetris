import { Tetris } from "./Tetris.js";
import { tetris } from "./main.js";
export class GameInterface{
    static holdSpace = document.querySelector('.hold');
    static holdCanvas = document.createElement('canvas');
    static holdContext = this.holdCanvas.getContext('2d',{alpha: false});

    static init(){
        this.holdCanvas.width = 100;
        this.holdCanvas.height = 100;
        this.holdSpace.appendChild(this.holdCanvas);
    }
    static drawHoldInteface(){
        GameInterface.holdContext.clearRect(0,0,GameInterface.holdCanvas.width,GameInterface.holdCanvas.height);
        GameInterface.holdContext.scale(25,25);
        let dx = (4-tetris.shape[0].length)/2;
        let dy = (4-tetris.shape.length)/2;
        tetris.shape.forEach((row,y) => row.forEach((block,x) => {
           if(block == 1)  GameInterface.holdContext.drawImage(Tetris.Icons[tetris.shapeNumber%2],x+dx,y+dy,1,1);
        }))
        GameInterface.holdContext.scale(1/25,1/25);
    }
}