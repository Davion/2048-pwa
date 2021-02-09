const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");

// holds game board values that will be applied to gameTiles
let gameBoardValues = [];
// holds empty tiles in relation to gameTiles
let emptyTiles = [];

// new game function that sets up the board and score
newGameBtn.addEventListener("click", newGame);

// function that moves on keypress or swipe (game logic)
gameBoard.addEventListener("keydown", e => boardMove(e.code));

function newGame(){
    
    gameBoardValues = [];
    const firstIdx = randomTileSpawn();
    const secondIdx = randomTileSpawn();
    gameBoardValues[firstIdx] = 2;
    gameBoardValues[secondIdx] = twoOrFour();
    for(let i = 0; i < gameTiles.length; i++){
        gameTiles[i].textContent = gameBoardValues[i];
    }

}

// returns a random index of one of the remaining empty tiles on the game board
function randomTileSpawn(){
    emptyTiles = [];

    for(let i = 0; i < gameTiles.length; i++){
        if(gameTiles[i].textContent === undefined || 
            gameTiles[i].textContent === "") emptyTiles.push(i);
    }

    if(emptyTiles.length > 0){
        return emptyTiles[getRandomEmptyTile(emptyTiles.length)];
    }
}

// returns a random number based on a dynamic range of values
function getRandomEmptyTile(arrLen){
    return Math.floor(Math.random() * arrLen);
}

// function that generates a 2 or a 4 in random
function twoOrFour(){
    return startingNums[Math.floor(Math.random() * startingNums.length)];
}

function boardMove(keyCode){
    switch(keyCode){
        case "ArrowUp":
            break;
        case "ArrowRight":
            break;
        case "ArrowDown":
            break;
        case "ArrowLeft":
            break;
        default:
            break;
    }
}