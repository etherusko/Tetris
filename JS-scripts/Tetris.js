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
                    [[1,0],
                     [1,0],
                     [1,1]
                    ],
                    [[0,1],
                     [0,1],
                     [1,1]
                    ],
                    [[1,1,1,1]
                    ],
                    [[1,0],
                     [1,1]
                    ],
                    [[1]
                    ]
                    ]
    static BlockIcon = new Image();
    #Rows = 20;
    #Cols = 10;
    #BlockSize = 25;
    constructor(context){
        this.width = this.#Cols*this.#BlockSize
        this.height = this.#Rows*this.#BlockSize
        this.Board = this.#makeBoard();
        this.cxt = context;
        this.shape = Tetris.Shapes[Math.floor(Math.random()*9)];
        this.posx = 4;
        this.posy = 0;
        Tetris.BlockIcon.src = './icons/block.svg';
    }

    #makeBoard(){
        let arr = [];
        for(let i=0;i<this.#Rows;i++){
            arr[i]=[0,0,0,0,0,0,0,0,0,0];
        }
        arr.push([1,1,1,1,1,1,1,1,1,1]);
        return arr;
     }
     drawBoard(){
        this.cxt.fillStyle = 'yellow';
        this.Board.forEach((row,y) => row.forEach((e,x) =>{
            //if(e == 1) this.cxt.fillRect(x*25,y*25,25,25);
            if(e == 1) this.cxt.drawImage(Tetris.BlockIcon,x*25,y*25,25,25);
        }))
     }
     drawShape(){   
        this.cxt.fillStyle = 'yellow';
        this.cxt.scale(this.#BlockSize,this.#BlockSize);
        this.shape.forEach((row,y) => row.forEach((e,x) => {
            if(e == 1) this.cxt.drawImage(Tetris.BlockIcon,this.posx+x,this.posy+y,1,1);
        }))
        this.cxt.scale(1/this.#BlockSize,1/this.#BlockSize);
     }
     drawGrid(){
        this.cxt.lineWidth = 0.5;
        this.cxt.strokeStyle = '#656548'
        this.Board.forEach((row,y) => row.forEach((_,x) =>{
            this.cxt.strokeRect(x*25,y*25,25,25);
        }))
     }
     solidShape(){
       this.shape.forEach((row,y)=>{
            row.forEach((col,x)=>{if(col==1)this.Board[y+this.posy][x+this.posx]=1});
            if(this.Board[y+this.posy].every(x => x==1)){
                this.Board.splice(y+this.posy,1);
                this.Board.unshift([0,0,0,0,0,0,0,0,0,0]);
            }
       });
       this.shape = Tetris.Shapes[Math.floor(Math.random()*9)];
       this.posy=0;
       this.posx=4;
     }
     rotateShape(){
        return this.shape[0].map((_,x) => this.shape.map((_,y) => this.shape[this.shape.length-(y+1)][x]));
     }
}