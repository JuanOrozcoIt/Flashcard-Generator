// Reqing the basic card constructor, cardData JSON and inquirer package for prompts

var BasicCard = require("./lib/BasicCard");

var cardData = require("./basic.json");

var inquirer = require("inquirer");

// Start game (1st time)
initGame();
function initGame() {

  // Create variables to initialize the cards, score, and leadoff card-index
  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;

  // Create new card for each question using the BasicCard constr
  for (var i = 0; i < cardData.length; i++) {
    currentCard = new BasicCard(cardData[i].front, cardData[i].back);
    cardArray.push(currentCard);
  }

  // Play 1st round
  playRound(initialScore, cardArray, initialIndex);
}
function endGame(score) {

  // Show final score to user
  console.log("Game Over!");
  console.log("Your score is:", score);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Play again?"
  }]).then(function(answer) {

    // This allows user to enter "y" to continue playing
    // Also works for "yes" or any answer begining with "y"
    if (answer.text.charAt(0).toLowerCase() === "y") {

      // Restarts game from scratch if wanted.
      initGame();
    } 
    else {

      // Game ends here since no other functions are called
      console.log("Thanks for playing!");
      console.log("Goodbye!");
    }
  });
}
function playRound(currentScore, cardArray, currentIndex) {

  // If all cards are not through yet, ask next question to user
  if (currentIndex < cardArray.length) {
    promptUser(cardArray, currentIndex, currentScore);
  }

  // Otherwise end the game
  else {
    endGame(currentScore);
  }
}
function promptUser(cardArray, currentIndex, currentScore) {

  // Store current card in the card variable
  var card = cardArray[currentIndex];

  // Show user the front of card, ask for answer
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.front + "\nAnswer:"
  }]).then(function(answer) {

    // Check to see if answer is correct, regardless of casing
    if (answer.text.trim().toLowerCase() === card.back.trim().toLowerCase()) {

      // When user is correct, increase score by 1
      currentScore++;
      console.log("You are correct!");
    } 
    else {

      // Otherwise let them know they were incorrect
      console.log("Incorrect! The correct answer is '" + card.back + "'.");
    }

    // Increase current card index
    currentIndex++;

    // Just a seperator
    console.log("-------------------------");

    // Play next round with updated score and card index
    playRound(currentScore, cardArray, currentIndex);
  });
}