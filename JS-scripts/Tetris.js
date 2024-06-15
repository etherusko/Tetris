import { GameInterface } from "./GameInterface.js";
export class Tetris{
    static Shapes = [
                    [[1,1],
                     [1,1]
                    ],
                    [[1,1,0],
                     [0,1,1]
                    ],
                    [[0,1,1],
                     [1,1,0]
                    ],
                    [[0,1,0],
                     [1,1,1]
                    ],
                    [[1,1,1],
                     [1,0,0],
                    ],
                    [[1,0,0],
                     [1,1,1], 
                    ],
                    [[1,1,1,1]
                    ],
                    [[1,0],
                     [1,1]
                    ]
                    ]
    static Icons = this.#setIcons();
    static #Rows = 20;
    static #Cols = 10;
    static #BlockSize = 25;
    static Width = this.#Cols*this.#BlockSize;
    static Height = this.#Rows*this.#BlockSize;

    constructor(context){
        this.cxt = context;
        this.Board = Tetris.#makeBoard();
        this.shpaesArray = this.#initShapesArray();
        this.#makeNewShape();
        this.hold = "void";
        this.canHold = true;
        this.running = false;
        this.controlsMenu = document.querySelector('.controls');
    }
    
    /**Methods:*/    
    static #setIcons(){
        let arr = []
        for(let i=0; i<8; i++){
            let icon = new Image();
            icon.src = `./icons/block${i}.svg`;
            arr.push(icon);
        }
        let shadow = new Image();
        shadow.src = './icons/shadow.svg';
        arr['shadow'] = shadow;
        return arr;
    }
    static #makeBoard(){
        let arr = [];
        for(let i=0;i<this.#Rows;i++){
            arr[i]=[0,0,0,0,0,0,0,0,0,0];
        }
        arr.push([1,1,1,1,1,1,1,1,1,1]);
        return arr;
    }
    #makeNewShape(n){
       if(isNaN(n)){
        let newShape = this.#getRandomNumberShape();
        while(newShape == this.shpaesArray[4] || newShape == this.shpaesArray[3] ){
            newShape = this.#getRandomNumberShape();
        }
        this.shapeNumber = this.shpaesArray.shift();
        this.shpaesArray.push(newShape);
       }else this.shapeNumber = n;  
       this.shape = Tetris.Shapes[this.shapeNumber];
       this.posy=0;
       this.posx=4;
    }
    #initShapesArray(){
        let arr = [];
        arr.push(this.#getRandomNumberShape());
        for(let i=1; i<5; i++){
            let shape = this.#getRandomNumberShape();
            while(shape == arr[i-1]) shape = this.#getRandomNumberShape();
            arr.push(shape);
        }
        return arr;
    }
    #getRandomNumberShape(){
        return Math.floor(Math.random()*Tetris.Shapes.length);
    }
    #drawBoard(){
        this.Board.forEach((row,y) => row.forEach((block,x) =>{
            if(block > 0) this.cxt.drawImage(Tetris.Icons[(block-1)%8],x*25,y*25,25,25);
            }))
    }
    #drawShape(){
         this.cxt.scale(Tetris.#BlockSize,Tetris.#BlockSize);
         this.shape.forEach((row,y) => row.forEach((block,x) => {
            if(block == 1) this.cxt.drawImage(Tetris.Icons[this.shapeNumber%8],this.posx+x,this.posy+y,1,1);
        }))
        this.cxt.scale(1/Tetris.#BlockSize,1/Tetris.#BlockSize);
    }
    #drawGrid(){
        this.cxt.lineWidth = 0.5;
        this.cxt.strokeStyle = '#656548';
        this.Board.forEach((row,y) => row.forEach((_,x) => this.cxt.strokeRect(x*25,y*25,25,25)));
     }
    solidShape(){
       this.shape.forEach((row,y)=>{
            row.forEach((block,x)=>{if(block==1)this.Board[y+this.posy][x+this.posx]=this.shapeNumber+1});
            if(this.Board[y+this.posy].every(x => x>0)){
                this.Board.splice(y+this.posy,1);
                this.Board.unshift([0,0,0,0,0,0,0,0,0,0]);
            }
       });
       this.#makeNewShape();
       this.canHold = true;
    }
    rotateShape(){
        return this.shape[0].map((_,x) => this.shape.map((_,y) => this.shape[this.shape.length-(y+1)][x]));
    }
    stepDownShape(bool = true, shadowY = 0){
        this.shape.forEach((row,y) => row.forEach((block,x) =>{
            if(this.Board[y+this.posy+1+shadowY][x+this.posx]>0 && block>0) bool = false;
        }));
        return bool;
    }
    pullDownShape(){
        this.posy += this.#drawShadow()
        this.solidShape();
    }
    #drawShadow(){
        this.cxt.fillStyle = '#656548';
        let shadowY = 0;
        while(this.stepDownShape(true,shadowY)) shadowY++;
        this.shape.forEach((row,y)=>{
            row.forEach((block,x)=>{
                if(block==1)this.cxt.drawImage(Tetris.Icons['shadow'],(this.posx+x)*25,(this.posy+shadowY+y)*25,25,25);
            })});
        return shadowY;
    }
    update(){
        this.cxt.clearRect(0,0,Tetris.Width,Tetris.Height);
        this.#drawBoard();
        this.#drawShadow();
        this.#drawShape();
        this.#drawGrid();
        GameInterface.drawShapesInterface();
    }
    holdShape(){
        if(this.hold === "void"){
            GameInterface.drawHoldInteface();
            this.hold = this.shapeNumber;
            this.#makeNewShape();
        }else{
            let old = this.shapeNumber;
            GameInterface.drawHoldInteface();
            this.#makeNewShape(this.hold);
            this.hold = old;
        }
        this.canHold = false;
    }
}