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
                    [[0,1],
                     [0,1],
                     [1,1]
                    ],
                    [[1,0],
                     [1,0], 
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
    static Icons = [];
    static BlockIcon = new Image();
    #Rows = 20;
    #Cols = 10;
    #BlockSize = 25;

    constructor(context){
        this.Board = this.#makeBoard();
        this.cxt = context;
        this.width = this.#Cols*this.#BlockSize
        this.height = this.#Rows*this.#BlockSize
        this.posx = 4;
        this.posy = 0;
        this.shapeNumber = Math.floor(Math.random()*Tetris.Shapes.length);
        this.shape = Tetris.Shapes[this.shapeNumber];
        Tetris.setIcons();
        this.srcAsignIcon(this.shapeNumber);
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
        this.Board.forEach((row,y) => row.forEach((block,x) =>{
            if(block > 0){
                this.srcAsignIcon(block-1);
                this.cxt.drawImage(Tetris.BlockIcon,x*25,y*25,25,25);
            }
            }))
     }
     drawShape(){
        this.srcAsignIcon(this.shapeNumber);
        this.cxt.scale(this.#BlockSize,this.#BlockSize);
        this.shape.forEach((row,y) => row.forEach((block,x) => {
            if(block == 1) this.cxt.drawImage(Tetris.BlockIcon,this.posx+x,this.posy+y,1,1);
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
            row.forEach((block,x)=>{if(block==1)this.Board[y+this.posy][x+this.posx]=this.shapeNumber+1});
            if(this.Board[y+this.posy].every(x => x>0)){
                this.Board.splice(y+this.posy,1);
                this.Board.unshift([0,0,0,0,0,0,0,0,0,0]);
            }
       });
       this.shapeNumber = Math.floor(Math.random()*Tetris.Shapes.length);
       this.shape = Tetris.Shapes[this.shapeNumber];
       this.posy=0;
       this.posx=4;
     }
     rotateShape(){
        return this.shape[0].map((_,x) => this.shape.map((_,y) => this.shape[this.shape.length-(y+1)][x]));
     }
    srcAsignIcon(s){
        Tetris.BlockIcon = Tetris.Icons[s%2];
     }
    static setIcons(){
        for(let i=0; i<2; i++){
            let icon = new Image();
            icon.src = `./icons/block${i}.svg`
            Tetris.Icons.push(icon);
        }
    }
}