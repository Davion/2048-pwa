const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");
// console.log(gameTiles);

// holds empty tiles in relation to gameTiles
let emptyTiles = [];

// new game function that sets up the board and score
newGameBtn.addEventListener("click", newGame);

// function that moves on keypress or swipe (game logic)
// gameBoard.addEventListener("keydown", e => boardMove(e.code));
document.addEventListener("keydown", e => {
    boardMove(e.code);
});

function newGame(){
    
    gameTiles.forEach(tile => {
        tile.textContent = ""
    });
    const firstIdx = randomTileSpawn();
    gameTiles[firstIdx].textContent = 2;

    const secondIdx = randomTileSpawn();
    gameTiles[secondIdx].textContent = twoOrFour();
    // console.log(gameTiles);
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
            console.log("UP");
            moveUp();
            break;
        case "ArrowRight":
            console.log("RIGHT");
            moveRight();
            break;
        case "ArrowDown":
            console.log("DOWN");
            moveDown();
            break;
        case "ArrowLeft":
            console.log("LEFT");
            moveLeft();
            break;
        default:
            // console.log("OTHER");
            break;
    }
}


function moveUp(){
    for(let i = 0; i < 16; i++){
        if(i < 4){
            let totalOne = gameTiles[i].textContent;
            let totalTwo = gameTiles[i + 4].textContent;
            let totalThree = gameTiles[i + 8].textContent;
            let totalFour = gameTiles[i + 12].textContent;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredRow = row.filter(num => num);

            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill("");
            let newRow = filteredRow.concat(zeros);

            gameTiles[i].textContent = newRow[0];
            gameTiles[i + 4].textContent = newRow[1];
            gameTiles[i + 8].textContent = newRow[2];
            gameTiles[i + 12].textContent = newRow[3];
        }
    }
}

function moveRight(){
    for(let i = 0; i < 16; i++){
        if(i % 4 === 0){
            let totalOne = gameTiles[i].textContent;
            let totalTwo = gameTiles[i + 1].textContent;
            let totalThree = gameTiles[i + 2].textContent;
            let totalFour = gameTiles[i + 3].textContent;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredRow = row.filter(num => num);

            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill("");
            let newRow = zeros.concat(filteredRow);

            gameTiles[i].textContent = newRow[0];
            gameTiles[i + 1].textContent = newRow[1];
            gameTiles[i + 2].textContent = newRow[2];
            gameTiles[i + 3].textContent = newRow[3];
        }
    }
}

function moveDown(){
    for(let i = 0; i < 16; i++){
        if(i < 4){
            let totalOne = gameTiles[i].textContent;
            let totalTwo = gameTiles[i + 4].textContent;
            let totalThree = gameTiles[i + 8].textContent;
            let totalFour = gameTiles[i + 12].textContent;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredRow = row.filter(num => num);

            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill("");
            let newRow = zeros.concat(filteredRow);

            gameTiles[i].textContent = newRow[0];
            gameTiles[i + 4].textContent = newRow[1];
            gameTiles[i + 8].textContent = newRow[2];
            gameTiles[i + 12].textContent = newRow[3];
        }
    }
}

function moveLeft(){
    for(let i = 0; i < 16; i++){
        if(i % 4 === 0){
            let totalOne = gameTiles[i].textContent;
            let totalTwo = gameTiles[i + 1].textContent;
            let totalThree = gameTiles[i + 2].textContent;
            let totalFour = gameTiles[i + 3].textContent;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredRow = row.filter(num => num);

            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill("");
            let newRow = filteredRow.concat(zeros);

            gameTiles[i].textContent = newRow[0];
            gameTiles[i + 1].textContent = newRow[1];
            gameTiles[i + 2].textContent = newRow[2];
            gameTiles[i + 3].textContent = newRow[3];
        }
    }
}