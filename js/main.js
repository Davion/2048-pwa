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
// gameBoard.addEventListener("keydown", e => boardMove(e.code));
document.addEventListener("keydown", e => {
    boardMove(e.code);
    for(let i = 0; i < gameTiles.length; i++){
        gameTiles[i].textContent = gameBoardValues[i];
    }
});

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
            
            for(let i = 0; i < 12; i++){    
                if(gameBoardValues[i + 4] !== "" || gameBoardValues[i + 4] !== undefined){
                    gameBoardValues[i] = gameBoardValues[i + 4];
                    gameBoardValues[i + 4] = "";
                }
            }
            console.log(gameBoardValues);
            break;
        case "ArrowRight":
            console.log("RIGHT");
            for(let i = 15; i >= 0; i--){    
                if(i % 4 !== 0){
                    gameBoardValues[i] = gameBoardValues[i - 1];
                    gameBoardValues[i - 1] = "";
                }
            }
            emptyTiles[0];
            break;
        case "ArrowDown":
            console.log("DOWN");
            for(let i = 15; i > 3; i--){    
                if(gameBoardValues[i - 4] !== "" || gameBoardValues[i - 4] !== undefined){
                    gameBoardValues[i] = gameBoardValues[i - 4];
                    gameBoardValues[i - 4] = "";
                }
            }
            break;
        case "ArrowLeft":
            console.log("LEFT");
            for(let i = 0; i < 16; i++){    
                if(i % 4 !== 3){
                    gameBoardValues[i] = gameBoardValues[i + 1];
                    gameBoardValues[i + 1] = "";
                }
            }
            break;
        default:
            // console.log("OTHER");
            break;
    }
}