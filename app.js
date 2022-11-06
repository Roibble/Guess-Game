const container = document.querySelector(".container");
const guessBox = document.getElementById('guess-box');
let displayPrevious = document.getElementById('previous-display');
const lowHi = document.getElementById('low-hi');
const submit = document.querySelector('#submit-btn');
const displayDiv = document.getElementById('display-div')
const progressBar = document.getElementById('progress')
const nextNumber = document.getElementById('next-number')
let secondStageBtn = document.createElement('button');






let guessednumber;
let newGame;

// +++ to check for the number of trials for each stage, if equal to 10 game over
let turns = 0;

// +++++ to identify which stage of the game you are in
let stageCount = 0;

// +++++ used to check if the player guessed right
let alive = false; 

// width of progress bar of turns indicator 
const progressStage = ['5%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%','90%', '100%']

// +++ number ot guess
let stageDifficulty = [100, 150, 200, 300, 350, 400, 500, 600, 800, 1000 ]
let stageColour = ['tomato', 'greenyellow', 'khaki', 'pink', 'peru', 'fuschia', 'wheat', 'brown', 'silver', 'chartreuse']

let randomNumber = Math.floor((Math.random()*stageDifficulty[stageCount])+1)

// +++ indicating the color of each stage
progressBar.style.backgroundColor = stageColour[stageCount];
guessBox.style.borderColor = stageColour[stageCount];
secondStageBtn.style.backgroundColor = stageColour[stageCount];
submit.style.backgroundColor = stageColour[stageCount];
nextNumber.style.color = stageColour[stageCount];

// to focus the input box after submitting a guess
guessBox.focus()

displayPrevious.textContent = "Previous attempts: "

// +++ to execute checkguess function when submit is clicked
submit.addEventListener('click', checkGuess);



function checkGuess() {
    
    console.log(randomNumber) // ++++ cheat to view number generated
    guessednumber = Number(guessBox.value)  // +++ to get the value of the input box
    turns ++;
    progressBar.style.width = progressStage[turns] // each turn get a % of width from the progressbar array

    displayPrevious.textContent += " " + guessednumber + " "; // to display the previous guesses
    
   // ++++ SERIES OF CONDITION TO CHECK IF THE NUMBER INPUTED IS =, >, < THE GENERATED NUMBER ++++++
    if (randomNumber == guessednumber) {
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

// ++++ IF THE NUMBER OF TURNS IS 10, THE GUESS BOX AND SUBMIT BUTTON IS DISABLED ++++++
function endGame() {
    if (turns == 10){
        guessBox.value = "";
        guessBox.disabled = true;
        submit.disabled = true;
        submit.style.display = "none"
        lowHi.textContent = 'Game Over';
        lowHi.style.backgroundColor = 'red';
        newGameBtn()
       
    }
}

// +++++ IF THE PLAYER GUESSED RIGHT AND CHECKS IF STAGE IS THE FINAL TO END GAME AND CONGRAT HIM, IF NOT PROVIDE A NEXT STAGE BUTTON
function aliveCheck() {
    if (alive == false && stageCount == 9 ) {
        guessBox.disabled = true;
        submit.disabled = true;
        submit.style.display = "none"
        lowHi.textContent = 'You are a Champion !!! End of Game';
        lowHi.style.backgroundColor = 'black';
        
        newGameBtn()
       
    } else if (alive == false && stageCount < 9) {
        stageCount ++;
        console.log(stageCount);
        guessBox.disabled = true;
        submit.disabled = true;
        submit.style.display = "none"
        lowHi.textContent = "You guessed right !!!"
        lowHi.style.backgroundColor = "green"
        secondStageBtn.innerHTML = "Next Stage";
        // secondStageBtn.style.backgroundColor = stageColour[stageCount]
        displayDiv.appendChild(secondStageBtn)
        secondStageBtn.addEventListener('click', function(){

            utilityReset()
            randomNumber = Math.floor((Math.random()*stageDifficulty[stageCount])+1);
            nextNumber.textContent = stageDifficulty[stageCount];
            secondStageBtn.remove();
        })
        
    }
}



function newGameBtn() {
    stageCount = 0;
    nextNumber.textContent = stageDifficulty[stageCount]
    
    newGame = document.createElement('button');
    newGame.style.backgroundColor = stageColour[stageCount]
        newGame.innerHTML = "New Game"
        displayDiv.appendChild(newGame)
        newGame.addEventListener('click', function(){
            utilityReset()
            // stageCount = 0;
            randomNumber = Math.floor((Math.random()*stageDifficulty[stageCount])+1)
            newGame.remove()
            
            
        })
}
// +++++++++++++++++ RESETTING THE INPUT BOX, ENABLING THE SUBMIT, TURN = 0, DISPLAY GUESS TO EMPTY,  STAGE COLOR RESET ++++++++++++++++
function utilityReset(){
    guessBox.value = '';
    guessBox.disabled = false;
    submit.disabled = false;
    guessBox.style.borderColor = stageColour[stageCount];
    submit.style.backgroundColor= stageColour[stageCount];
    progressBar.style.backgroundColor = stageColour[stageCount];
    secondStageBtn.style.backgroundColor = stageColour[stageCount]
    nextNumber.style.color = stageColour[stageCount]
    submit.style.display = "block";
    lowHi.textContent = '';
    lowHi.style.backgroundColor = 'transparent';
    progressBar.style.width = "0%"
    displayPrevious.textContent = "Previous attempts:"
    turns = 0;
    guessBox.focus()
}






