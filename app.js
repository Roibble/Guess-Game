const container = document.querySelector(".container");
const guessBox = document.getElementById('guess-box');
let displayPrevious = document.getElementById('previous-display');
const lowHi = document.getElementById('low-hi');
const submit = document.querySelector('#submit-btn');
const displayDiv = document.getElementById('display-div')
let progressBar = document.getElementById('progress')



let randomNumber = Math.floor((Math.random()*100)+1)
console.log(randomNumber)
let guessednumber;
let newGame;
let turns = 0;
let alive = true;
const progressStage = ['5%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%','90%', '100%']
guessBox.focus()

displayPrevious.textContent = "Previous attempts: "

submit.addEventListener('click', checkGuess);



function checkGuess() {
    guessednumber = Number(guessBox.value) 
    turns ++;
    progressBar.style.width = progressStage[turns]
    displayPrevious.textContent += " " + guessednumber + " ";
    
   
    if (randomNumber == guessednumber) {
        lowHi.textContent = "You guessed right !!!"
        lowHi.style.backgroundColor = "green"
        alive = false;
        aliveCheck()

        
    } else if (randomNumber > guessednumber) {
        lowHi.textContent = 'Your guess is low';
        lowHi.style.backgroundColor = "rgb(200,0,90)"
        endGame()
    } else {
        lowHi.textContent = 'Your guess is high';
        lowHi.style.backgroundColor = "rgb(200, 0, 20)";
        endGame()
    }
    guessBox.focus()
}


function endGame() {
    if (turns === 10){
        guessBox.value = "";
        guessBox.disabled = true;
        submit.disabled = true;
        submit.style.display = "none"
        lowHi.textContent = 'Game Over';
        lowHi.style.backgroundColor = 'red';
        newGameBtn()
        // newGame = document.createElement('button');
        // newGame.innerHTML = "New Game"
        // displayDiv.appendChild(newGame)
        // newGame.addEventListener('click', function(){
        //     guessBox.value;
        //     guessBox.disabled = false;
        //     submit.disabled = false;
        //     submit.style.display = "block";
        //     lowHi.textContent = '';
        //     lowHi.style.backgroundColor = 'transparent';
        //     displayPrevious.textContent = "Previous attempts:"
        //     newGame.remove()
        //     randomNumber = Math.floor((Math.random()*100)+1)
        //     console.log(randomNumber)
            
        // })
    }
}

function aliveCheck() {
    if (alive == false ) {
        guessBox.disabled = true;
        submit.disabled = true;
        submit.style.display = "none"
        newGameBtn()
    }
}

function newGameBtn() {
    newGame = document.createElement('button');
        newGame.innerHTML = "New Game"
        displayDiv.appendChild(newGame)
        newGame.addEventListener('click', function(){
            guessBox.value = '';
            guessBox.disabled = false;
            submit.disabled = false;
            submit.style.display = "block";
            lowHi.textContent = '';
            lowHi.style.backgroundColor = 'transparent';
            progressBar.style.width = "0%"
            displayPrevious.textContent = "Previous attempts:"
            turns = 0;
            randomNumber = Math.floor((Math.random()*100)+1)
            console.log(randomNumber)
            newGame.remove()
            guessBox.focus()
            
        })
}