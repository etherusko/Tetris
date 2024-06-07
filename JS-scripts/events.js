import { Tetris } from "./Tetris.js";
import { tetris } from "./main.js";
//Eventos
export const events = document.addEventListener('keydown',(e)=>{
    if(e.key == 'ArrowRight') evalRightColitions();
    if(e.key == 'ArrowLeft') evalLeftColitions();
    if(e.key == 'ArrowDown') evalDownColitions();
    if(e.key == 'c' || e.key == 'ArrowUp') evalRotationColitions(); 
})

export function evalDownColitions(){
    let boolean = true;
    tetris.shape.forEach((row,y) => row.forEach((e,x) =>{
        if(tetris.Board[y+tetris.posy+1][x+tetris.posx]==1 & e==1) boolean = false;
    }))
    boolean ? tetris.posy++ : tetris.solidShape();
}
function evalLeftColitions(){
    let boolean = true;
    tetris.shape.forEach((row,y) => row.forEach((e,x) =>{
        if(tetris.posx==0) boolean = false;
        if(tetris.Board[y+tetris.posy][x+tetris.posx-1]==1 & e==1) boolean = false;
    }))
    if(boolean) tetris.posx--;
}
function evalRightColitions(){
    let boolean = true;
    tetris.shape.forEach((row,y) => row.forEach((e,x) =>{
        if(tetris.posx+tetris.shape[0].length>9) boolean = false;
        if(tetris.Board[y+tetris.posy][x+tetris.posx+1]==1 & e==1) boolean = false;
    }))
    if(boolean) tetris.posx++;
}
function evalRotationColitions(){
    let boolean = true;
    let rotateShape = tetris.rotateShape();
    rotateShape.forEach((row,y) => row.forEach((e,x) =>{
        if(tetris.Board[y+tetris.posy][x+tetris.posx]==1 & e==1) boolean = false;
    }))
    if(tetris.posx+rotateShape[0].length>10) boolean = false;
    if(boolean) tetris.shape = rotateShape;
}