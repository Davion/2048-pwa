const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const gameTiles = gameBoard.childNodes;
let i = 1;
gameTiles.forEach(tile => {
    if(tile.nodeName !== "#text"){
        //console.log(tile);
        tile.textContent = i;
        i++
    }
})


// new game function that sets up the board and score

// function that generates a 2 or a 4 in random

// funtion that spawns a tile with 2 or 4 on a previously empty tile

// function that moves on keypress or swipe (game logic)