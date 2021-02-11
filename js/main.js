const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const gameStatus = document.querySelector(".game-status");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");
console.log(gameTiles);

document.addEventListener("DOMContentLoaded", newGame);
// new game function that sets up the board and score
newGameBtn.addEventListener("click", newGame);

// function that moves on keypress or swipe (game logic)
// gameBoard.addEventListener("keydown", e => boardMove(e.code));


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
        checkForLose();
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

// function that generates a 2 or a 4 in random
function twoOrFour(){
    return startingNums[Math.floor(Math.random() * startingNums.length)];
}

function boardMove(keyCode){
    switch(keyCode.code){
        case "ArrowUp":
            console.log("UP");
            moveUp();
            combineColumn();
            moveUp();
            spawnNumOnEmptyTile();
            break;
        case "ArrowRight":
            console.log("RIGHT");
            moveRight();
            combineRow();
            moveRight();
            spawnNumOnEmptyTile();
            break;
        case "ArrowDown":
            console.log("DOWN");
            moveDown();
            combineColumn();
            moveDown();
            spawnNumOnEmptyTile();
            break;
        case "ArrowLeft":
            console.log("LEFT");
            moveLeft();
            combineRow();
            moveLeft();
            spawnNumOnEmptyTile();
            break;
        default:
            // console.log("OTHER");
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
        if(gameTiles[i].textContent === gameTiles[i + 1].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 1].textContent);
            gameTiles[i].textContent = combinedTotal;
            gameTiles[i + 1].textContent = "";
            console.log(typeof combinedTotal);
            if(combinedTotal >= 0)
                updateScore(combinedTotal);
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
            console.log(typeof combinedTotal);
            if(combinedTotal >= 0)
                updateScore(combinedTotal);
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
    let zeros = 0;
    for(let i = 0; i < gameTiles.length; i++){
        if(gameTiles[i].textContent === "") zeros++;
    }
    if(zeros === 0){
        gameStatus.textContent = "You LOSE :("
        gameStatus.style.display = "inline";
        document.removeEventListener("keydown", boardMove);
    }
}


// SCORE & BEST
function updateScore(val){
    let currentScore = parseInt(scoreValue.textContent);
    // console.log(currentScore);
    let newScore = currentScore + val;
    scoreValue.textContent = newScore;
}

function updateBest(){

}