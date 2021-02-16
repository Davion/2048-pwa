const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const gameStatus = document.querySelector(".game-status");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");
console.log(gameTiles);

let colors = {
    "": "#ffb088",
    "2": "#FFCC80",
    "4": "#FFD180",
    "8": "#FFB74D",
    "16": "#FFAB40",
    "32": "#FFA726",
    "64": "#FF9800",
    "128": "#FB8C00",
    "256": "#F57C00",
    "512": "#F57C00",
    "1024": "#EF6C00",
    "2048": "#E65100"
};


document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("gameBoard") !== null){
        let gameBoard = JSON.parse(localStorage.getItem("gameBoard"));
        let i = 0;
        gameTiles.forEach(tile => {
            tile.textContent = gameBoard[i];
            tile.style.background = colors[gameBoard[i]];
            i++;
        });

        if(localStorage.getItem("gameScore") !== null){
            scoreValue.textContent = localStorage.getItem("gameScore");
        }
        
        if(localStorage.getItem("gameBest") !== null){
            bestValue.textContent = localStorage.getItem("gameBest");
        }

        document.addEventListener("keydown", boardMove);
    }else{
        newGame();
    }
});

newGameBtn.addEventListener("click", newGame);

// new game function that sets up the board and score
function newGame(){
    
    gameTiles.forEach(tile => {
        tile.textContent = ""
        tile.style.background = colors[""];
    });
    const firstIdx = randomEmptyTileIdx();
    gameTiles[firstIdx].textContent = 2;
    gameTiles[firstIdx].style.background = colors[2];

    const secondIdx = randomEmptyTileIdx();
    let randomTwoOrFour = twoOrFour();
    gameTiles[secondIdx].textContent = randomTwoOrFour;
    gameTiles[secondIdx].style.background = colors[randomTwoOrFour];
    
    
    gameStatus.textContent = "";
    gameStatus.style.display = "none";

    scoreValue.textContent = 0;
    localStorage.setItem("gameScore", scoreValue.textContent);
    saveLocalGame();

    document.addEventListener("keydown", boardMove);
}



function spawnNumOnEmptyTile(){
    let idx = randomEmptyTileIdx();
    if(idx !== undefined){
        let randomTwoOrFour = twoOrFour();
        gameTiles[idx].textContent = randomTwoOrFour;
        gameTiles[idx].style.background = colors[randomTwoOrFour];
        if(gameTiles[idx].classList.contains("new-tile")){
            gameTiles[idx].classList.remove("new-tile");
        }
        gameTiles[idx].classList.add("new-tile");
        let animationEndCallback = (e) => {
            gameTiles[idx].removeEventListener("animationend", animationEndCallback);
            gameTiles[idx].classList.remove("new-tile");
        }
        gameTiles[idx].addEventListener("animationend", animationEndCallback);
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
            combineColumnUp();
            moveUp();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "ArrowRight":
            moveRight();
            combineRowRight();
            moveRight();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "ArrowDown":
            moveDown();
            combineColumnDown();
            moveDown();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "ArrowLeft":
            moveLeft();
            combineRowLeft();
            moveLeft();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        default:
            break;
    }
    saveLocalGame();
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

        for(let j = 0; j < 4; j++){
            gameTiles[i + (j * 4)].textContent = newRow[j];
            gameTiles[i + (j * 4)].style.background = colors[newRow[j]];
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

            for(let j = 0; j < 4; j++){
                gameTiles[i + j].textContent = newRow[j];
                gameTiles[i + j].style.background = colors[newRow[j]];
            }
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

        for(let j = 0; j < 4; j++){
            gameTiles[i + (j * 4)].textContent = newRow[j];
            gameTiles[i + (j * 4)].style.background = colors[newRow[j]];
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

            for(let j = 0; j < 4; j++){
                gameTiles[i + j].textContent = newRow[j];
                gameTiles[i + j].style.background = colors[newRow[j]];
            }
        }
    }
}

// COMBINE ROW or COLUMN
function combineRowLeft(){
    for(let i = 0; i < 15; i++){
        if(i % 4 !== 3 && !Number.isNaN(parseInt(gameTiles[i].textContent)) && gameTiles[i].textContent === gameTiles[i + 1].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 1].textContent);
            gameTiles[i].textContent = combinedTotal;
            gameTiles[i + 1].textContent = "";
            gameTiles[i].classList.add("merged-tile");
            let animationEndCallback = (e) => {
                gameTiles[i].removeEventListener("animationend", animationEndCallback);
                gameTiles[i].classList.remove("merged-tile");
            }
            gameTiles[i].addEventListener("animationend", animationEndCallback);
            if(combinedTotal >= 0){
                updateScore(combinedTotal);
                updateBest();
            }
        }
    }
    checkForWin();
}

function combineRowRight(){
    for(let i = 15; i >= 0; i--){
        if(i % 4 !== 3 && !Number.isNaN(parseInt(gameTiles[i].textContent)) && gameTiles[i].textContent === gameTiles[i + 1].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 1].textContent);
            gameTiles[i].textContent = "";
            gameTiles[i + 1].textContent = combinedTotal;
            gameTiles[i + 1].classList.add("merged-tile");
            let animationEndCallback = (e) => {
                gameTiles[i + 1].removeEventListener("animationend", animationEndCallback);
                gameTiles[i + 1].classList.remove("merged-tile");
            }
            gameTiles[i + 1].addEventListener("animationend", animationEndCallback);
            if(combinedTotal >= 0){
                updateScore(combinedTotal);
                updateBest();
            }
        }
    }
    checkForWin();
}

function combineColumnUp(){
    for(let i = 0; i < 12; i++){
        if(!Number.isNaN(parseInt(gameTiles[i].textContent)) && gameTiles[i].textContent === gameTiles[i + 4].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 4].textContent);
            gameTiles[i].textContent = combinedTotal;
            gameTiles[i + 4].textContent = "";
            gameTiles[i].classList.add("merged-tile");
            let animationEndCallback = (e) => {
                gameTiles[i].removeEventListener("animationend", animationEndCallback);
                gameTiles[i].classList.remove("merged-tile");
            }
            gameTiles[i].addEventListener("animationend", animationEndCallback);
            if(combinedTotal >= 0){
                updateScore(combinedTotal);
                updateBest();
            }
        }
    }
    checkForWin();
}

function combineColumnDown(){
    for(let i = 11; i >= 0; i--){
        if(!Number.isNaN(parseInt(gameTiles[i].textContent)) && gameTiles[i].textContent === gameTiles[i + 4].textContent){
            let combinedTotal = parseInt(gameTiles[i].textContent) + parseInt(gameTiles[i + 4].textContent);
            gameTiles[i].textContent = "";
            gameTiles[i + 4].textContent = combinedTotal;
            gameTiles[i + 4].classList.add("merged-tile");
            let animationEndCallback = (e) => {
                gameTiles[i + 4].removeEventListener("animationend", animationEndCallback);
                gameTiles[i + 4].classList.remove("merged-tile");
            }
            gameTiles[i + 4].addEventListener("animationend", animationEndCallback);
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

    localStorage.setItem("gameScore", scoreValue.textContent);
}

function updateBest(){
    let currentScore = parseInt(scoreValue.textContent);
    let currentBest = parseInt(bestValue.textContent);
    if(currentScore > currentBest) {
        bestValue.textContent = currentScore;
        localStorage.setItem("gameBest", bestValue.textContent);
    }
}

// LOCAL STORAGE
function saveLocalGame(){
    let gameBoard = [];
    gameTiles.forEach(tile => gameBoard.push(tile.textContent));
    localStorage.setItem("gameBoard", JSON.stringify(gameBoard));
}

// Helper functions
function arraysEqual(arr1, arr2){
    for(let i = 0; i < 16; i++){
        if(arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}