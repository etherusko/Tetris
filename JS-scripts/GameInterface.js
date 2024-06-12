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
        this.holdSpace.appendChild(this.holdCanvas);
        this.shapesCanvas.width = 125;
        this.shapesCanvas.height = 500;
        this.shapesStack.appendChild(this.shapesCanvas);

        console.log(this.shapesStack)
    }
    static drawHoldInteface(){
        GameInterface.holdContext.clearRect(0,0,this.holdCanvas.width,this.holdCanvas.height);
        GameInterface.holdContext.scale(25,25);
        let dx = (4-tetris.shape[0].length)/2;
        let dy = (4-tetris.shape.length)/2;
        tetris.shape.forEach((row,y) => row.forEach((block,x) => {
           if(block == 1)  GameInterface.holdContext.drawImage(Tetris.Icons[tetris.shapeNumber],x+dx,y+dy,1,1);
        }))
        GameInterface.holdContext.scale(1/25,1/25);
    }
    static drawShapesInterface(){
        console.log('shape interface');
        this.shapesContex.clearRect(0,0,this.shapesCanvas.width,this.shapesCanvas.height);
        this.shapesContex.scale(25,25);
        /***** */ let shapeLength = 0
        tetris.shpaesArray.forEach((shape,index) => {
            Tetris.Shapes[shape].forEach((row,y) =>{
                let dx = (5-Tetris.Shapes[shape][0].length)/2;
                let dy = (1+index*4)
                //(index*4);
                //let dy = index*(Tetris.Shapes[shape].length+1);
                row.forEach((block,x) => {
                    if(block == 1) this.shapesContex.drawImage(Tetris.Icons[shape],x+dx,y+dy,1,1);
                });
            }); 
        });

        this.shapesContex.scale(1/25,1/25);
    }
}