
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
let msgContainer= document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let winGif = document.querySelector("#winGif");
let gifX = document.querySelector("#gifX");
let gifO = document.querySelector("#gifO");
let turno = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame = ()=> {
    turno=true; 
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");

    gifX.classList.add("hide");
    gifO.classList.add("hide");
    resetBtn.innerText="Reset";
};

boxes.forEach((box) =>{
    box.addEventListener("click",() => {
       console.log("box was click"); 
       if(turno){
        box.innerText="X";
        turno=false;
       }else{
        box.innerText ="O";
        turno=true;
       }
       box.disabled= true;
       count++;
       let isWinner = checkWinner();
       if (count===9 && !isWinner){
        gameDraw();
       }
    });
});
const gameDraw=()=> {
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    gifX.classList.add("hide"); 
    gifO.classList.add("hide"); 

    disableBoxes();
    resetBtn.innerText="New Game";
};
const disableBoxes =() => {
    for(let box of boxes) {
        box.disabled=true;
    }
};
const enableBoxes =() => {
    for(let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
};
const showWinner= (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gifX.classList.add("hide");
    gifO.classList.add("hide");
    winGif.classList.remove("hide");
    if (winner === "X") {
        gifX.classList.remove("hide"); 
    } else {
        gifO.classList.remove("hide");
    }
    disableBoxes();
    resetBtn.innerText="New Game";
};

const checkWinner = () => {
    for(let  pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 !="" && pos2!="" && pos3 !="") {
            if (pos1===pos2 && pos2===pos3) {
                 showWinner(pos1);
                 return true;
            }
           
        }
    }
    return false;
};
resetBtn.addEventListener("click", resetGame);
