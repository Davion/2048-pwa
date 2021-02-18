const scoreValue = document.querySelector(".game-score-value");
const bestValue = document.querySelector(".game-best-value");;
const gameStatus = document.querySelector(".game-status");;
const newGameBtn = document.querySelector(".btn-new-game");;
const gameBoard = document.querySelector(".game-board");;

const startingNums = [2, 2, 2, 4];
const gameTiles = Object.values(gameBoard.childNodes).filter(tile => tile.nodeName !== "#text");

let colors = {
    "": { background: "#ffb088", text: "#f9703e" },
    "2": { background: "#FFCC80", text: "#f9703e" },
    "4": { background: "#FFD180", text: "#f9703e" },
    "8": { background: "#FFB74D", text: "#f9703e" },
    "16": { background: "#FFAB40", text: "#f9703e" },
    "32": { background: "#FFA726", text: "#f9703e" },
    "64": { background: "#FF9800", text: "#f9703e" },
    "128": { background: "#FB8C00", text: "#f9703e" },
    "256": { background: "#F57C00", text: "#fad6a5" },
    "512": { background: "#F57C00", text: "#fad6a5" },
    "1024": { background: "#EF6C00", text: "#fad6a5" },
    "2048": { background: "#E65100", text: "#fad6a5" }
};


document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("gameBoard") !== null){
        let gameBoardValues = JSON.parse(localStorage.getItem("gameBoard"));
        let i = 0;
        gameTiles.forEach(tile => {
            tile.textContent = gameBoardValues[i];
            tile.style.background = colors[gameBoardValues[i]].background;
            tile.style.color = colors[gameBoardValues[i]].text;
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

    gameBoard.addEventListener("swiped", boardSwipe);
});

newGameBtn.addEventListener("click", newGame);

// new game function that sets up the board and score
function newGame(){
    
    gameTiles.forEach(tile => {
        tile.textContent = ""
        tile.style.background = colors[""].background;
        tile.style.color = colors[""].text;
    });
    const firstIdx = randomEmptyTileIdx();
    gameTiles[firstIdx].textContent = 2;
    gameTiles[firstIdx].style.background = colors[2].background;
    gameTiles[firstIdx].style.color = colors[2].text;

    const secondIdx = randomEmptyTileIdx();
    let randomTwoOrFour = twoOrFour();
    gameTiles[secondIdx].textContent = randomTwoOrFour;
    gameTiles[secondIdx].style.background = colors[randomTwoOrFour].background;
    gameTiles[secondIdx].style.color = colors[randomTwoOrFour].text;
    
    
    gameStatus.textContent = "";
    gameStatus.style.display = "none";

    scoreValue.textContent = 0;
    localStorage.setItem("gameScore", scoreValue.textContent);
    saveLocalGame();
    
    document.removeEventListener("keydown", boardMove);
    document.addEventListener("keydown", boardMove);
    gameBoard.removeEventListener("swiped", boardSwipe);
    gameBoard.addEventListener("swiped", boardSwipe);
}



function spawnNumOnEmptyTile(){
    let idx = randomEmptyTileIdx();
    if(idx !== undefined){
        let randomTwoOrFour = twoOrFour();
        gameTiles[idx].textContent = randomTwoOrFour;
        gameTiles[idx].style.background = colors[randomTwoOrFour].background;
        gameTiles[idx].style.color = colors[randomTwoOrFour].text;
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
            gameBoard.removeEventListener("swiped", boardSwipe);
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

// function that moves on keypress
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

// function that moves on swipe
function boardSwipe(keyCode){
    let beforeMove = gameTiles.map(tile => tile.textContent);
    let afterMove;
    switch(keyCode.detail.dir){
        case "up":
            moveUp();
            combineColumnUp();
            moveUp();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "right":
            moveRight();
            combineRowRight();
            moveRight();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "down":
            moveDown();
            combineColumnDown();
            moveDown();
            afterMove = gameTiles.map(tile => tile.textContent);
            if(!arraysEqual(beforeMove, afterMove)) spawnNumOnEmptyTile();
            break;
        case "left":
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
            gameTiles[i + (j * 4)].style.background = colors[newRow[j]].background;
            gameTiles[i + (j * 4)].style.color = colors[newRow[j]].text;
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
                gameTiles[i + j].style.background = colors[newRow[j]].background;
                gameTiles[i + j].style.color = colors[newRow[j]].text;
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
            gameTiles[i + (j * 4)].style.background = colors[newRow[j]].background;
            gameTiles[i + (j * 4)].style.color = colors[newRow[j]].text;
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
                gameTiles[i + j].style.background = colors[newRow[j]].background;
                gameTiles[i + j].style.color = colors[newRow[j]].text;
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
            gameBoard.removeEventListener("swiped", boardSwipe);
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
    let gameBoardValues = [];
    gameTiles.forEach(tile => gameBoardValues.push(tile.textContent));
    localStorage.setItem("gameBoard", JSON.stringify(gameBoardValues));
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


// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("./sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
  }