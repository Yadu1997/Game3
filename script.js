let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#winner")
let turn = document.querySelector("#turn")
let turnX = true;
let count = 0
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

boxes.forEach((box)=>{
    box.addEventListener("click",() => {
        count += 1
        if (turnX) {
            box.innerText = "X";
            turn.innerText = "Turn of O"
            box.style.color = 'red';
            turnX = false;
        } else {
            box.innerText = "O";
            turn.innerText = "turn of X"
            turnX = true;
            box.style.color = 'blue';
        }
        box.disabled = true
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""
    }
}

const showWinner = (winner) => {
    disableBoxes();
    resetBtn.classList.add("hide")
    msg.innerText = `${winner} Won`
    msgContainer.classList.remove("hide")
    turn.innerText = ""
}
const showDraw = () => {
    if (count == 9) {
        msgContainer.classList.remove("hide")
        msg.innerText = "its a draw"
        resetBtn.classList.add("hide")
        turn.innerText = ""
    }
}

const resetGame = () => {
    turnX = true;
    enableBoxes();
    count = 0
    turn.innerText = "Turn of X"
}

const newGame = () => {
    turnX = true
    enableBoxes();
    msgContainer.classList.add("hide")
    resetBtn.classList.remove("hide")
    count = 0
    turn.innerText = "Turn of X"
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        let draw = true
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                count = 0
            }else{
                showDraw()
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", newGame);