
//select all needed componenets
const titleMessage = document.querySelector('.title');
const playerOneDisplay = document.querySelector('.playerOne');
const playerTwoDisplay = document.querySelector('.playerTwo');
const resetBtn = document.querySelector('.reset');
const gameSquares = document.querySelectorAll('.board div');

let playerOneScore = playerOneDisplay.innerText;
let playerTwoScore = playerTwoDisplay.innerText;

let moveCounter = 0;
let roundCounter = 1;
let playerOneChoices = [];
let playerTwoChoices = [];

//checks if space is free then whose turn it is followed by incrememnting the move counter and lastly checks result after every turn
function moveDecider(evt) {
    if(evt.target.innerText === ''){
        if(moveCounter %2 === 0){
            handleMoveP1(evt)
        }else{
            handleMoveP2(evt)
        }
        moveCounter++;
        checkResult();
    }
}
//displays players move selection and pushes it into the corrosponding array
function handleMoveP1(evt) {
    let playerOneMove = evt.target;
    playerOneMove.innerText = 'X';
    playerOneChoices.push(Number(playerOneMove.dataset.index));
    
}
function handleMoveP2(evt) {
    let playerTwoMove = evt.target
    playerTwoMove.innerText = 'O'
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
            updateScores()     
            
        }
        
        if (playerTwoChoices.includes(a) && playerTwoChoices.includes(b) && playerTwoChoices.includes(c)) {
            titleMessage.innerText = 'Player 2 wins!';
            playerTwoScore++;
            disableClicks();
            updateScores()
            
        }
        if (moveCounter === 9 && !(playerTwoChoices.includes(a) && playerTwoChoices.includes(b) && playerTwoChoices.includes(c)) && !(playerOneChoices.includes(a) && playerOneChoices.includes(b) && playerOneChoices.includes(c))) {
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

function handleReset(){
    if(playerOneChoices.length > 2 || playerTwoChoices.length > 2){
        
        moveCounter = 0;
        playerOneChoices = [];
        playerTwoChoices = [];
        roundCounter++
        titleMessage.innerText = `Round ${roundCounter}`
        
        for(let square of gameSquares) {
            square.addEventListener('click', moveDecider);
            square.innerText = ''
        }
    }else{
        titleMessage.innerText = 'No sore Losers'
    }
}

//set up game board ready to respond to the user
for(let square of gameSquares) {
    square.addEventListener('click', moveDecider);
}
resetBtn.addEventListener('click', handleReset)




