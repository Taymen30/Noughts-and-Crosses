const titleMessage = document.querySelector('.title');
const playerOneDisplay = document.querySelector('.playerOne');
const playerTwoDisplay = document.querySelector('.playerTwo');
const resetBtn = document.querySelector('.reset');
const gameSquares = document.querySelectorAll('.board div');
const gameSquares2 = document.querySelectorAll('.board2 div');
const xBtn = document.querySelector('#x')
const oBtn = document.querySelector('#o')
const gameDiv = document.querySelector('.gameWrapper')
const gameDiv2 = document.querySelector('.gameWrapper2')
const selectionDiv = document.querySelector('.selection')
const boardSizeDiv = document.querySelector('.boardsize')
const resetBtn2 = document.querySelector('.reset2')
const threeByThreeBtn = document.querySelector('#btn3x3')
const fourByFourBtn = document.querySelector('#btn4x4')


let playerOneScore = playerOneDisplay.innerText;
let playerTwoScore = playerTwoDisplay.innerText;

let gameSize = 0;
let playerOneToken = '';
let playerTwoToken = '';
let moveCounter = 0;
let roundCounter = 1;
let playerOneChoices = [];
let playerTwoChoices = [];



function moveDecider(evt) {
    if (evt.target.innerText === '') {
        if (moveCounter % 2 === 0) {
            handleMoveP1(evt)
        } else {
            handleMoveP2(evt)
        }
        moveCounter++;
        checkResult();
    }
}

function moveDecider2(evt) {
    if (evt.target.innerText === '') {
        if (moveCounter % 2 === 0) {
            handleMoveP1(evt)
        } else {
            handleMoveP2(evt)
        }
        moveCounter++;
        checkResult2();
    }
}

function handleMoveP1(evt) {
    let playerOneMove = evt.target;
    playerOneMove.innerText = playerOneToken;
    playerOneChoices.push(Number(playerOneMove.dataset.index));
}
function handleMoveP2(evt) {
    let playerTwoMove = evt.target
    playerTwoMove.innerText = playerTwoToken
    playerTwoChoices.push(Number(playerTwoMove.dataset.index))
}

function checkResult() {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;

        if (playerOneChoices.includes(a) && playerOneChoices.includes(b) && playerOneChoices.includes(c)) {
            titleMessage.innerText = 'Player 1 wins!';
            playerOneScore++;  
            disableClicks();
            updateScores();
            break
        }
        
        if (playerTwoChoices.includes(a) &&playerTwoChoices.includes(b) && playerTwoChoices.includes(c)) {
            titleMessage.innerText = 'Player 2 wins!';
            playerTwoScore++;
            disableClicks();
            updateScores();
            break
        }

        if (moveCounter === 9) {
            titleMessage.innerText = "It's a draw!";
        }
    }
}

function checkResult2() {
    let winningCombinations2 = [
        [0, 1, 2],
        [1, 2, 3],
        [4, 5, 6],
        [5, 6, 7],
        [8, 9, 10],
        [9, 10, 11],
        [12, 13, 14],
        [13, 14, 15],
        [0, 5, 10],
        [1, 6, 11],
        [2, 5, 8],
        [3, 6, 9],
        [6, 9, 12],
        [7, 10, 13],
        [0, 4, 8],
        [4, 8, 12],
        [1, 5, 9],
        [5, 9, 13],
        [2, 6, 10],
        [6, 10, 14],
        [3, 7, 11],
        [7, 11, 15]
    ];

    for (let combination of winningCombinations2) {
        let [a, b, c,] = combination;

        if (playerOneChoices.includes(a) && playerOneChoices.includes(b) && playerOneChoices.includes(c)) {
            titleMessage.innerText = 'Player 1 wins!';
            playerOneScore++;  
            disableClicks2();
            updateScores();
            break
        }
        
        if (playerTwoChoices.includes(a) &&playerTwoChoices.includes(b) && playerTwoChoices.includes(c)) {
            titleMessage.innerText = 'Player 2 wins!';
            playerTwoScore++;
            disableClicks2();
            updateScores();
            break
        }

        if (moveCounter === 16) {
            titleMessage.innerText = "It's a draw!";
        }
    }
}

function disableClicks() {
    for (let square of gameSquares) {
        square.removeEventListener('click', moveDecider);
    }
}

function disableClicks2() {
    for (let square of gameSquares2) {
        square.removeEventListener('click', moveDecider2);
    }
}

function updateScores() {
    playerOneDisplay.innerText = playerOneScore;
    playerTwoDisplay.innerText = playerTwoScore;
}

function handleReset() {
    if (playerOneChoices.length > 2 || playerTwoChoices.length > 2){
        
        moveCounter = 0;
        playerOneChoices = [];
        playerTwoChoices = [];
        roundCounter++
        titleMessage.innerText = `Round ${roundCounter}`
        
        for (let square of gameSquares) {
            square.addEventListener('click', moveDecider);
            square.innerText = ''
        }
    } else {
        titleMessage.innerText = 'No sore Losers'
    }
}

function handleReset2() {
    if (playerOneChoices.length > 2 || playerTwoChoices.length > 2){
        
        moveCounter = 0;
        playerOneChoices = [];
        playerTwoChoices = [];
        roundCounter++
        titleMessage.innerText = `Round ${roundCounter}`
        
        for (let square of gameSquares2) {
            square.addEventListener('click', moveDecider);
            square.innerText = ''
        }
    } else {
        titleMessage.innerText = 'No sore Losers'
    }
}

function handleTokenSelection(evt) {
    if (evt.target === xBtn && gameSize === 3) {
        playerOneToken = 'X';
        playerTwoToken = 'O'
        gameDiv.style.display = 'block'
        selectionDiv.style.display = 'none'

    } else if (evt.target === oBtn && gameSize === 3) {
        playerOneToken = 'O'
        playerTwoToken = 'X'
        gameDiv.style.display = 'block'
        selectionDiv.style.display = 'none'
    } else if (evt.target === xBtn && gameSize === 4) {
        playerOneToken = 'X'
        playerTwoToken = 'O'
        gameDiv2.style.display = 'block'
        selectionDiv.style.display = 'none'
    } else if (evt.target === oBtn && gameSize === 4) {
        playerOneToken = 'O'
        playerTwoToken = 'X'
        gameDiv2.style.display = 'block'
        selectionDiv.style.display = 'none'
    }
}

function handleSizeSelection(evt){
    if (evt.target === threeByThreeBtn) {
        gameSize = 3
        selectionDiv.style.display = 'block'
        boardSizeDiv.style.display = 'none'
    } else if (evt.target === fourByFourBtn) {
        gameSize = 4
        selectionDiv.style.display = 'block'
        boardSizeDiv.style.display = 'none'
    }
}

for(let square of gameSquares) {
    square.addEventListener('click', moveDecider);
}
for(let square of gameSquares2) {
    square.addEventListener('click', moveDecider2);
}
resetBtn2.addEventListener('click', handleReset2)
resetBtn.addEventListener('click', handleReset);
xBtn.addEventListener('click', handleTokenSelection)
oBtn.addEventListener('click', handleTokenSelection)
threeByThreeBtn.addEventListener('click', handleSizeSelection)
fourByFourBtn.addEventListener('click', handleSizeSelection)


