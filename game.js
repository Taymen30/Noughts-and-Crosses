const titleMessage = document.querySelector('.title');
const playerOneDisplay = document.querySelector('.playerOne');
const playerTwoDisplay = document.querySelector('.playerTwo');
const resetBtn = document.querySelector('.reset');
const gameSquares = document.querySelectorAll('.board div');
const xBtn = document.querySelector('#x')
const oBtn = document.querySelector('#o')
const gameDiv = document.querySelector('.gameWrapper')
const selectionDiv = document.querySelector('.selection')

let playerOneScore = playerOneDisplay.innerText;
let playerTwoScore = playerTwoDisplay.innerText;

let playerOneToken = ''
let playerTwoToken
let moveCounter = 0;
let roundCounter = 1;
let playerOneChoices = [];
let playerTwoChoices = [];

function handleSelection(evt) {
    if (evt.target === xBtn) {
        playerOneToken = 'X';
        playerTwoToken = 'O'
        gameDiv.style.display = 'block'
        selectionDiv.style.display = 'none'

    } else if (evt.target === oBtn) {
        playerOneToken = 'O'
        playerTwoToken = 'X'
        gameDiv.style.display = 'block'
        selectionDiv.style.display = 'none'
    }

}

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
        
        if (playerTwoChoices.includes(a) && playerTwoChoices.includes(b) && playerTwoChoices.includes(c)) {
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

function disableClicks() {
    for (let square of gameSquares) {
        square.removeEventListener('click', moveDecider);
    }
}

function updateScores() {
    playerOneDisplay.innerText = playerOneScore;
    playerTwoDisplay.innerText = playerTwoScore;
}

function handleReset() {
    if (playerOneChoices.length > 2 || playerTwoChoices.length > 2) {

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

for (let square of gameSquares) {
    square.addEventListener('click', moveDecider);
}
resetBtn.addEventListener('click', handleReset);
xBtn.addEventListener('click', handleSelection)
oBtn.addEventListener('click', handleSelection)