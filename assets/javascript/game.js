// Global Variables
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Arrays and Variables for holding data
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordOptions = ["apple", "banana","pineapple","peach","cherry","pears","coconut","watermelon","grape","blueberry","apricot","papaya"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
var letterGuessed = "";

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//Functions (These blocks of code that I will call upon when needed)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function startGame() {


     //computer generates random word from words array
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersinWord = selectedWord.split("");

    //store length of word in blanks, for later use
    numBlanks = lettersinWord.length;

    // testing for lettersinWord
    //console.log(lettersinWord);


    
    //Populate a loop to generate "_" for each letter in array stored in blanks
     for (var i = 0; i<numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    //Change Html to reflect round conditions

    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join (" ");
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
   
}

 //RESET FUNCTION
 function reset(){
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];
    document.getElementById("wrongGuesses").innerHTML = "";
    startGame();
 }
 

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    // Check if letter exist in code at all
    var letterInWord = false;
 
    for (var  i = 0; i < numBlanks; i++){
        if(selectedWord[i] === letter){
            letterInWord = true;
            
        }
    }

    //Check where in word letter exist, then populate out blanksAndSuccesses array.
    if(letterInWord){
        for (var i = 0 ; i < numBlanks; i++) {
            if(selectedWord[i] === letter){
                blanksAndSuccesses[i]= letter ;
            }
        }

    }
    //letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
     

    }
    //Testing  & Debugging
    //console.log(blanksAndSuccesses);

}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...

function complete(){
    // Debugging
    //console.log("Win Count: "+ winCount + "| Loss Count" + lossCount +  " | Guesses Left" + guessesLeft);
    // Update the HTML to show the guesses left number
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


//if WON...then alert, display image and reset new round
if (lettersinWord.toString() === blanksAndSuccesses.toString()){
    winCount ++;

//display wins on screen
    document.getElementById("winCounter").innerHTML = " " + winCount;

//start the new round   
   document.getElementById("restart").innerHTML = "You won! The word is <b>" + selectedWord + "</b>. If you want to continue: <button type=button class='btn btn-success' onclick='reset();'>GO</button>";

}  
//if LOST...then alert and reset new round
else if (guessesLeft === 0) {

    lossCount ++;
    document.getElementById("restart").innerHTML = "You failed! The word is <b>" + selectedWord + "</b>. If you want to try again: <button type=button class='btn btn-danger' onclick='reset();'>GO</button>";
   
    document.getElementById("lossCounter").innerHTML = " " + lossCount;
    }
}

//Main Process
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Initiates the code  the first time
startGame();

//check for keyup, and convert to lowercase then store in guesses

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    if (letters.includes(letterGuessed)) {
    } else {
      return false;
    }
    //check to see if guess entered matches value of random word
    checkLetters(letterGuessed);

    //process wins/loss 
    complete() ;

    //store player guess in console for reference 
    //console.log(letterGuessed);

};