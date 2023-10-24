const palyBoard =document.querySelector(".play-board")
const scoren =document.querySelector(".score")
const highscoren =document.querySelector(".high-score")
const control= document.querySelectorAll(".controls i");

let gameover=false;
let foodx;
let foody;
let snakex=5;
let snakey=10;
let snakeboody=[];
let velocity=0, velocitx=0;
let setIntervalId;
let score=0;
let highscore= localStorage.getItem("high-score")|| 0;
highscoren.innerText=`High Score : ${highscore}`;
const changepos =()=>{
    foodx =Math.floor(Math.random() * 30)+1;
    foody=Math.floor(Math.random() * 30)+1;
}
const handleGameover =()=>{
    clearInterval(setIntervalId);
    alert("game over")
    location.reload();
}
const changedirection= (e)=>{
   if(e.key === "ArrowUp" && velocity !=1){
    velocitx=0;
    velocity=-1;
   }
   else if(e.key === "ArrowDown" && velocity !=-1){
    velocitx=0;
    velocity=1;
   }
   else if(e.key === "ArrowLeft" && velocitx !=1){
    velocitx=-1;
    velocity=0;
   }
   else if(e.key === "ArrowRight" && velocitx !=-1){
    velocitx=1;
    velocity=0;
   }
   intitGame();
}
control.forEach(key=>{
    key.addEventListener("click", ()=> changedirection({
        key:key.dataset.key
    }))
})
const intitGame=()=>{
    if(gameover) return handleGameover();
    let htmlmarkup=`<div class="food" style="grid-area:  ${foody} / ${foodx}"></div>`;
     if(snakex===foodx && snakey===foody){
        changepos();
        snakeboody.push([foodx,foody]);
        score++;
        highscore=score>= highscore ? score:highscore;
        localStorage.setItem("high-score",highscore); 
        scoren.innerText=`Score : ${score}`; 
        highscoren.innerText=`High Score : ${highscore}`; 

     }
     for(let i =snakeboody.length -1 ;i>0;i--){
        snakeboody[i]=snakeboody[i -1];
 }
    snakeboody[0]=[snakex,snakey]
    
    snakex+=velocitx;
    snakey+=velocity;
    if(snakex<=0 || snakex>30 || snakey<=0 || snakey>30 ){
         gameover=true;
    }
    for(let i =0 ;i<snakeboody.length;i++){
           htmlmarkup+=`<div class="head" style="grid-area:  ${snakeboody[i][1]} / ${snakeboody[i][0]}"></div>`;
           if(i!==0 && snakeboody[0][1]===snakeboody[i][1]&& snakeboody[0][0]===snakeboody[i][0])
    {
        gameover=true;
    }
        }
    palyBoard.innerHTML=htmlmarkup;

}
changepos();
setIntervalId= setInterval(intitGame,125 ) ;
document.addEventListener('keydown',changedirection); 