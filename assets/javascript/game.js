/*** Pokemon arry and its objects ***/

var pokemonArray = [
    {
        word: "charmander",
        image1: "assets/images/charmander.png",
        image2: "assets/images/charmander_k.png"
    },

    {
        word: "squirtle",
        image1: "assets/images/squirtle.png",
        image2: "assets/images/squirtle_k.png"
    },

    {
        word: "bulbasaur",
        image1: "assets/images/bulbasaur.png",
        image2: "assets/images/bulbasaur_k.png"
    },

    {
        word: "pikachu",
        image1: "assets/images/pikachu.png",
        image2: "assets/images/pikachu_k.png"
    },

    {
        word: "eevee",
        image1: "assets/images/eevee.png",
        image2: "assets/images/eevee_k.png"
    },

    {
        word: "articuno",
        image1: "assets/images/articuno.png",
        image2: "assets/images/articuno_k.png"
    },

    {
        word: "zapdos",
        image1: "assets/images/zapdos.png",
        image2: "assets/images/zapdos_k.png"
    },

    {
        word: "moltres",
        image1: "assets/images/moltres.png",
        image2: "assets/images/moltres_k.png"
    },

    {
        word: "ditto",
        image1: "assets/images/ditto.png",
        image2: "assets/images/ditto_k.png"
    },

    {
        word: "mew",
        image1: "assets/images/mew.png",
        image2: "assets/images/mew_k.png"
    }]

// gameStatus variable  for starting and stopping the game. set the var to a falsy
var gameStatus = false;

// generates randomNumber variable
var randomNumber = Math.floor(Math.random() * pokemonArray.length);

// applies the var randomNumber to obtain random answer ojbect form my pokemonArray
var pokemon = pokemonArray[randomNumber].word;
var pokemonImage1 = pokemonArray[randomNumber].image1
var pokemonImage2 = pokemonArray[randomNumber].image2

// shows array length of pokemon variable to determin the letters remaining
var lettersRemaining = pokemon.length;

// creates answer that can have values pushed into
var answerArray = [];

/*** event listeners ***/

// on key event listeners that does an onkeyup event
document.addEventListener("keyup", function(event){

  if(gameStatus) {
    letterCheck(event);

  } else {
      init();
  }
});

// setup letter check array
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
"t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {

  if (alphabetArray.indexOf(guess.key) > -1) {
    correctGuessCheck(guess);
  }
}

//checks if guess is correct

var winScore = 0;
var lossesShown = 0;
function correctGuessCheck(guess) {

  if (pokemon.indexOf(guess.key) >= 0) {
    correctGuess(guess);

  } else {
      incorrectGuess(guess);
  }
}

function correctGuess(guess) {

  if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
    addCorrectLetter(guess);
  }
}

function addCorrectLetter(guess) {
  for (var l = 0; l < pokemon.length; l++) {

    // if the letter matches an existing letter in the answer this if statement pushes the correct letter to answerArray in upperCase method
    if (guess.key === pokemon[l]) {
      answerArray[l] = guess.key.toUpperCase();
      displayCurrentWord();
      lettersRemaining--;

      // if all letters have been guess this conditional makes user wins go up
      if (lettersRemaining === 0) {
        winScore++;

        displayWins();
        changeImage();
        addCorrect();
        displayCurrentWord();
      }
    }
  }
}

//creates incorrect guesses array
var incorrectGuessesMade = [];

// creates the number of guesses var
var guessesLeft = 6;

function incorrectGuess(guess) {
  if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
    addIncorrectLetter(guess);
  }
}

function addIncorrectLetter(guess) {

  // push incorrect guess to incorrectGuessesMade array
  incorrectGuessesMade.push(guess.key.toUpperCase());

  // displays if incorrect letter is guessed
  displayGuessesMade();
  guessesLeft--;

  // shows guesses left
  displayGuessesLeft();
  if (guessesLeft === 0) {
    lossesShown++;

    changeImage();
    displayLosses();
    displayAnswer();
  }
}

/*** Functions ***/

// displays number of wins
function displayWins() {
  var winsDisplay = document.querySelector("#winsDisplay");
  winsDisplay.textContent = winScore;
}

// displays number of losses
function displayLosses() {
  // var lossesShown = 0;
  var lossesDisplay = document.querySelector("#lossesDisplay");
  lossesDisplay.textContent = lossesShown;
}

// displays letters already guessed
function displayGuessesMade() {
  var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
  guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

// displays how many remaining guesses are left
function displayGuessesLeft() {
  var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
  guessesLeftDisplay.textContent = guessesLeft;
}

// displays current solvd state of answerArray
function displayCurrentWord() {
  var currentWordDisplay = document.querySelector("#currentWordDisplay");
  currentWordDisplay.innerHTML = answerArray.join(" ");
}

// displays silhouette of pokemon like who's that pokemon
function displayImage() {
  var pictureDisplay = document.querySelector("#pictureDisplay");
  pictureDisplay.src = pokemonImage2;
}

// reveals pokemon identiy on win or loss
function changeImage() {
  var pictureDisplay = document.querySelector("#pictureDisplay");
  pictureDisplay.src = pokemonImage1;
  gameStatus = false;
}

// showS answer if user fails
function displayAnswer() {
  var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
  revealedAnswerDisplay.textContent = pokemon.toUpperCase();
}

// turns current word to green
function addCorrect() {
  var currentWordDisplay = document.querySelector("#currentWordDisplay");
  currentWordDisplay.classList.add('correct');
}

// removes green color when restarting guess game
function removeCorrect() {
  var currentWordDisplay = document.querySelector("#currentWordDisplay");
  currentWordDisplay.classList.remove('correct');
}


/* Starting and restarting the game functions */

function init() {

  // changes gaemStatus to true
  gameStatus = true;

  // generates random number with math.floor and multiplying pokemon array's length
  randomNumber = Math.floor(Math.random() * pokemonArray.length);

  // apply randomNumber to fetch random word which is the answer, and its synced Images

  pokemon = pokemonArray[randomNumber].word;
  pokemonImage1 = pokemonArray[randomNumber].image1;
  pokemonImage2 = pokemonArray[randomNumber].image2;

  // shows the arrany length for lettersRemaining till the win
  lettersRemaining = pokemon.length;

  // sets the array to an empty string
  answerArray = [];

  // for loop converts word answer into an array instead of using a push command. pushes the length and increments
  for (var i = 0; i < pokemon.length; i++) {
    if (pokemon[i] === "+") {
      answerArray[i] = "&nbsp;";
    } else {

      //this makes sure a string value of _ is show isntead of the actual word
      answerArray[i] = "_";
      }
    }

    lettersRemaining = pokemon.length;

    // value for how many guesses you get
    guessesLeft = 6;
    displayGuessesLeft()

    // restarts guessesMade array like executing functions from jQuery calculator
    incorrectGuessesMade = [];
    displayGuessesMade()

    displayCurrentWord();
    displayImage();

    // empites the text content for revealedAnswerDisplay
    revealedAnswerDisplay.textContent = "";

    // pllays audio for the clip whos that pokemon?
    document.getElementById('whosThatPokemon').play();

    document.getElementById("playMusic").addEventListener("click", function(){
      document.getElementById("pokemonTheme").play();
    });

    document.getElementById("pauseMusic").addEventListener("click", function(){
      document.getElementById("pokemonTheme").pause();
    });

    // removes correct color on word when finished and restarting game
    removeCorrect();
}
