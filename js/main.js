const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const gameStatus = document.querySelector(".game-status");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");

document.addEventListener("DOMContentLoaded", newGame);

newGameBtn.addEventListener("click", newGame);

// new game function that sets up the board and score
function newGame(){
    
    gameTiles.forEach(tile => {
        tile.textContent = ""
    });
    const firstIdx = randomEmptyTileIdx();
    gameTiles[firstIdx].textContent = 2;

    const secondIdx = randomEmptyTileIdx();
    gameTiles[secondIdx].textContent = twoOrFour();
    
    gameStatus.textContent = "";
    gameStatus.style.display = "none";

    scoreValue.textContent = 0;

    document.addEventListener("keydown", boardMove);

}

function spawnNumOnEmptyTile(){
    let idx = randomEmptyTileIdx();
    if(idx !== undefined){
        gameTiles[idx].textContent = twoOrFour();
        if(checkForLose()){
            gameStatus.textContent = "You LOSE :("
            gameStatus.style.display = "inline";
            document.removeEventListener("keydown", boardMove);
        }
    }
}

// returns a random index of one of the remaining empty tiles on the game board
function randomEmptyTileIdx(){
    let emptyTiles = [];

    for(let i = 0; i < gameTiles.length; i++){
        if(gameTiles[i].textContent === undefined || 
            gameTiles[i].textContent === "") emptyTiles.push(i);
    }

    if(emptyTiles.length > 0){
        let ramdomEmptyIdx = Math.floor(Math.random() * emptyTiles.length);
        return emptyTiles[ramdomEmptyIdx];
    }
}

// function that generates a 2 or a 4 in random based on the startingNums array
function twoOrFour(){
    return startingNums[Math.floor(Math.random() * startingNums.length)];
}

// function that moves on keypress or swipe (game logic)
function boardMove(keyCode){
    let beforeMove = gameTiles.map(tile => tile.textContent);
    let afterMove;
    switch(keyCode.code){
        case "ArrowUp":
            moveUp();
            combineColumn();
            moveUp();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "ArrowRight":
            moveRight();
            combineRow();
            moveRight();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "ArrowDown":
            moveDown();
            combineColumn();
            moveDown();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "ArrowLeft":
            moveLeft();
            combineRow();
            moveLeft();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        default:
            break;
    }
}


function moveUp(){
    for(let i = 0; i < 4; i++){
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
    for(let i = 0; i < 4; i++){
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

// COMBINE ROW or COLUMN
function combineRow(){
    for(let i = 0; i < 15; i++){
        if(i % 4 !== 3 && gameTiles[i].textContent === gameTiles[i + 1].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 1].textContent);
            gameTiles[i].textContent = combinedTotal;
            gameTiles[i + 1].textContent = "";
            if(combinedTotal >= 0){
                updateScore(combinedTotal);
                updateBest();
            }
        }
    }
    checkForWin();
}

function combineColumn(){
    for(let i = 0; i < 12; i++){
        if(gameTiles[i].textContent === gameTiles[i + 4].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 4].textContent);
            gameTiles[i].textContent = combinedTotal;
            gameTiles[i + 4].textContent = "";
            if(combinedTotal >= 0){
                updateScore(combinedTotal);
                updateBest();
            }
        }
    }
    checkForWin();
}

// WIN -- LOSE
function checkForWin(){
    for(let i = 0; i < gameTiles.length; i++){
        if(gameTiles[i].textContent == 2048){
            gameStatus.textContent = "You WIN !!!";
            gameStatus.style.display = "inline";
            document.removeEventListener("keydown", boardMove);
        }
    }
}

function checkForLose(){
    for(let i = 0; i < gameTiles.length; i++){
        if(gameTiles[i].textContent === "") return false;

        if(i % 4 !== 3 && gameTiles[i].textContent === gameTiles[i + 1].textContent) return false;

        if(i < 12 && gameTiles[i].textContent === gameTiles[i + 4].textContent) return false;
    }

    return true;
}


// SCORE & BEST
function updateScore(val){
    let currentScore = parseInt(scoreValue.textContent);
    let newScore = currentScore + val;
    scoreValue.textContent = newScore;
}

function updateBest(){
    let currentScore = parseInt(scoreValue.textContent);
    let currentBest = parseInt(bestValue.textContent);
    if(currentScore > currentBest) {
        bestValue.textContent = currentScore;
    }
}


function arraysEqual(arr1, arr2){
    for(let i = 0; i < 16; i++){
        if(arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}