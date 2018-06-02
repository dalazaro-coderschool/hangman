// Global variables
var word, // store player 1's input word 
answerArray, // tracks player 2's progress of guessing letters
gameInProgress, // is game active or not
numberOfLives, // tracks lives count
remainingLetters, // tracks how many letters left to guess
guessedLetters; // array to hold history of guessed letters

// Load conditions for a new game on initial page load
$(document).ready(function(){
  newGame();
})

// Helper function to start a new game on page load or when new game button is clicked
function newGame() {
  word = null;
  answerArray = [];
  gameInProgress = false;
  numberOfLives = 5;
  remainingLetters = null;
  guessedLetters = [];

  $('#player-2').hide();
  $('#player-1').show();
}

// The game will only start when player 1 clicks the start button 
function startGame() {

  word = document.getElementById("input-word").value;
  
  // Check if player 1 actually input a word. Including a space assumes more than one word
  if (word.length === 0 || word.includes(' ')) {
    alert("Please enter a single word.");
  } else {
    word = document.getElementById("input-word").value.toLowerCase();
    console.log(word);
    document.getElementById("input-word").value = ""

    // Set up the missing letter field
    for (var i = 0; i < word.length; i++) {
      answerArray[i] = "_";
    };

    gameInProgress = true;
    remainingLetters = word.length;

    $('#player-1').hide();
    $('#player-2').show();

    renderLetters();
  }

};

function guessLetter() {
  
  if (gameInProgress === true && remainingLetters > 0) {
    // Get a guess from the player
    var guess = document.getElementById("input-guess").value.toLowerCase();
    console.log(guess);
    document.getElementById("input-guess").value = "";

    if (guess.length !== 1) { // If the guess is not a single letter
      alert("Please enter a single letter.");
    } else if (guessedLetters.includes(guess)){ // If the player has guessed a letter more than once
      alert("You have already guessed that letter. Please try a different letter.")
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);

      // If player 2 incorrectly guessed a letter
      if (!word.includes(guess)) {
        numberOfLives--;
        console.log("Lost a life ", numberOfLives);
        alert("Lost a life");
      } else {
        // Update the game state with the guess
        for (var j = 0; j < word.length; j++) {
          if (word[j] === guess) {
            answerArray[j] = guess;
            remainingLetters--;
          }
        }
        renderLetters();
      }
    };    
  }

  checkForWin();
}

// Function to change underscores to guessed letters
function renderLetters() {
  return $('#answer-array').text(answerArray.join(" "));
}

function checkForWin() {
  // Once remaining letters hits zero, show the answer and congratulate the player
  if (gameInProgress === true && remainingLetters === 0) {
    alert("Congratulations! The answer was " + word + "!");
    gameInProgress = false;
  }

  if (gameInProgress === true && numberOfLives === 0) {
    alert("Sorry, you have lost all your lives.");
    alert("The answer was " + word + ".");
    gameInProgress = false;
  }
}