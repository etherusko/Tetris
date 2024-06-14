import { Tetris } from "./Tetris.js";
import { tetris } from "./main.js";
export class GameInterface{
    //Hold-Shape-Stack
    static holdSpace = document.querySelector('.hold');
    static holdCanvas = document.createElement('canvas');
    static holdContext = this.holdCanvas.getContext('2d',{alpha: false});
    //shapes-stack
    static shapesStack = document.querySelector('.shapes-stack');
    static shapesCanvas = document.createElement('canvas');
    static shapesContex = this.shapesCanvas.getContext('2d',{alpha: false});

    static init(){
        this.holdCanvas.width = 100;
        this.holdCanvas.height = 100;
        this.holdSpace.insertBefore(this.holdCanvas,this.holdSpace.children[0]);
        this.holdCanvas.setAttribute('class','hold-canvas');
        ////
        this.shapesCanvas.width = 125;
        this.shapesCanvas.height = 400;
        this.shapesStack.appendChild(this.shapesCanvas);
    }
    static drawHoldInteface(){
        this.holdContext.clearRect(0,0,this.holdCanvas.width,this.holdCanvas.height);
        this.holdContext.scale(25,25);
        let dx = (4-tetris.shape[0].length)/2;
        let dy = (4-tetris.shape.length)/2;
        tetris.shape.forEach((row,y) => row.forEach((block,x) => {
           if(block == 1)  this.holdContext.drawImage(Tetris.Icons[tetris.shapeNumber],x+dx,y+dy,1,1);
        }))
        this.holdContext.scale(1/25,1/25);
    }
    static drawShapesInterface(){
        this.shapesContex.clearRect(0,0,this.shapesCanvas.width,this.shapesCanvas.height);
        this.shapesContex.scale(25,25);
        let dy = 1;
        tetris.shpaesArray.forEach(shape => {
            let dx = (5-Tetris.Shapes[shape][0].length)/2;
            Tetris.Shapes[shape].forEach((row,y) => {
                row.forEach((block,x) => {
                    if(block == 1) this.shapesContex.drawImage(Tetris.Icons[shape],x+dx,y+dy,1,1);
                });
            });
            dy+=Tetris.Shapes[shape].length+1;
        });
        this.shapesContex.scale(1/25,1/25);
    }
}