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
    static colors =[
        ["#4bdb12","#7aba61"],
        ["#0fd1a0","#5ad1b3"],
        ["#187fed","#437ab5"],
        ["#4923de","#5541a3"],
        ["#be14e0","#c359d9"],
        ["#d6182e","#fa3950"],
        ["#e3230e","#bf6056"],
        ["#bf6056","#e08b4a"],
        ["#d4af1c","#ebcb4d"],
    ]
    static BlockIcon = new Image();
    #Rows = 20;
    #Cols = 10;
    #BlockSize = 25;

    static Prueba = '';
    constructor(context){
        this.Board = this.#makeBoard();
        this.cxt = context;
        this.width = this.#Cols*this.#BlockSize
        this.height = this.#Rows*this.#BlockSize
        this.posx = 4;
        this.posy = 0;
        this.shapeNumber = Math.floor(Math.random()*Tetris.Shapes.length);
        this.shape = Tetris.Shapes[this.shapeNumber];
        //Tetris.BlockIcon.src = './icons/block.svg';
        this.colorStroke = Tetris.colors[this.shapeNumber][0];
        this.colorFill = Tetris.colors[this.shapeNumber][1];
        //console.log(Tetris.Prueba);
        this.crearimg();

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
        this.Board.forEach((row,y) => row.forEach((e,x) =>{
            //if(e == 1) this.cxt.fillRect(x*25,y*25,25,25);
            if(e>0) this.cxt.drawImage(Tetris.BlockIcon,x*25,y*25,25,25);
        }))
     }
     drawShape(){   
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
            row.forEach((col,x)=>{if(col==1)this.Board[y+this.posy][x+this.posx]=this.shapeNumber+1});
            if(this.Board[y+this.posy].every(x => x>0)){
                this.Board.splice(y+this.posy,1);
                this.Board.unshift([0,0,0,0,0,0,0,0,0,0]);
            }
       });
       
       this.shapeNumber = Math.floor(Math.random()*Tetris.Shapes.length);
       this.shape = Tetris.Shapes[this.shapeNumber];
       this.crearimg();
       this.posy=0;
       this.posx=4;
     }
     rotateShape(){
        return this.shape[0].map((_,x) => this.shape.map((_,y) => this.shape[this.shape.length-(y+1)][x]));
     }

     crearimg(){
        this.colorStroke = Tetris.colors[this.shapeNumber][0];
        this.colorFill = Tetris.colors[this.shapeNumber][1];
        Tetris.Prueba = `
        <svg xmlns="http://www.w3.org/2000/svg" id="block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${this.colorStroke}" stroke-width="2">
            <rect width="18" height="18" x="3" y="3" rx="4" fill="${this.colorFill}"/>
            <path d="M12 21v-6"/><path d="M12 9V3"/><path d="M3 15h18"/>
            <path d="M3 9h18"/>
        </svg>
        `
        const svgBlob = new Blob([Tetris.Prueba], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        Tetris.BlockIcon.src = svgUrl;
     }
}