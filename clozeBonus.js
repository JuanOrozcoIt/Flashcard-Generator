// Requ cloze card constructor, cardData JSON and inquirer package for prompts

var ClozeCard = require("./lib/ClozeCard");

var cardData = require("./cloze.json");

var inquirer = require("inquirer");

// Start game for 1st time
initGame();
function initGame() {

  // Create variables to initialize cards, score, and initial card index
  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;

  // Creating a new card for each question using our ClozeCard constructor
  for (var i = 0; i < cardData.length; i++) {
    currentCard = new ClozeCard(cardData[i].partial, cardData[i].cloze);
    cardArray.push(currentCard);
  }

  // Play the first round
  playRound(initialScore, cardArray, initialIndex);
}

// This function handles ending the game
function endGame(score) {

  // Alert user of their final score
  console.log("Game Over!");
  console.log("Your score is:", score);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Play again?"
  }]).then(function(answer) {

    // This lets the user just type in "y" to continue.
    // Will also work for "yes" or "yeah" or any answer begining with "y"
    if (answer.text.charAt(0).toLowerCase() === "y") {
      // Restarts the game from scratch if desired
      initGame();
    } 
    else {
      // Otherwise the game ends here since we aren't calling any other functions
      console.log("Thanks for playing!");
      console.log("Goodbye!");
    }
  });
}
function playRound(currentScore, cardArray, currentIndex) {

  // If we have't gone through all the cards, ask the user the next question
  if (currentIndex < cardArray.length) {
    promptUser(cardArray, currentIndex, currentScore);
  }

  // Otherwise end the game
  else {
    endGame(currentScore);
  }
}
function promptUser(cardArray, currentIndex, currentScore) {

  // Storing our current card in the card variable
  var card = cardArray[currentIndex];

  // Show the user the card partial, ask for an answer
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.partial + "\nAnswer:"
  }]).then(function(answer) {

    // Check if answer was correct, regardless of casing
    if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {

      // When user is correct, increase score by 1
      currentScore++;
      console.log("\nYou are correct!");
    }
    else {
      // Otherwise let them know they were incorrect
      console.log("\nIncorrect!");
    }
    // Use displayCard method to show user the entire card text
    console.log(card.displayCard());

    // Increase current card index
    currentIndex++;

    // Just a seperator
    console.log("-------------------------\n");

    // Play next round with updated score and card index
    playRound(currentScore, cardArray, currentIndex);
  });
}