const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");

let startingBoard = [];

// console.log(startingNums[Math.floor(Math.random() * 2)]);

// new game function that sets up the board and score
newGameBtn.addEventListener("click", newGame);

// function that generates a 2 or a 4 in random

// funtion that spawns a tile with 2 or 4 on a previously empty tile

// function that moves on keypress or swipe (game logic)


function newGame(){
    // startingBoard = [];
    // startingBoard[5] = 8;
    // startingBoard[12] = 16;
    if(startingBoard.length < 16){
        let idx = randomEmptyTile(startingBoard);
        console.log("The index: " + idx);
        startingBoard[idx] = startingNums[Math.floor(Math.random() * 4)];
    }
    for(let i = 0; i < gameTiles.length; i++){
        gameTiles[i].textContent = startingBoard[i];
    }

}

function randomEmptyTile(arr){
    let randomNr = Math.floor(Math.random() * 15);
    console.log(randomNr);
    if(arr[randomNr] === undefined) 
        return randomNr;
    else
        return randomEmptyTile(arr);
}