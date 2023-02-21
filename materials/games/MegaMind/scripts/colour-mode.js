'use strict';

/***********
The code below is intended just as snippets of useful functionality.
It is neither complete nor well organized, but hopefully gives a boost in terms of one way to handle some aspects of the logic behind this game.
Please make sure that you meet the Requirements for all Games in your project.
*************/

// variable to control whether to use colours or numbers
// currently, if not set to colours, numbers is assumed
let mode = 'colours';

const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

let numberOfSlots = 4;
let numberOfOptions;

if (mode === 'colours') {
  numberOfOptions = colours.length;
} else {
  numberOfOptions = 10;
}

// array to hold the system generated sequence
const secretCode = [];

// Array to hold player guesses
const playerGuesses = [];

// method to generate secret code
const generateSecret = () => {
  // read input to determine number of slots
  numberOfSlots = Number($('#slot-count').val());
  // empty the array
  secretCode.length = 0;

  for (let i = 0; i < numberOfSlots; i++) {
    let randomNum = Math.floor(Math.random() * numberOfOptions);

    if (mode === 'colours') {
      // This keeps drawing from the available options until is selects on that isn't yet in the Array
      // Be careful with indexOf.  The first index in an Array is 0 which is falsy.
      while (secretCode.indexOf(colours[randomNum]) >= 0) {
        randomNum = Math.floor(Math.random() * numberOfOptions);
      }
      secretCode[i] = colours[randomNum];
    } else {
      while (secretCode.indexOf(randomNum) >= 0) {
        randomNum = Math.floor(Math.random() * numberOfOptions);
      }
      secretCode[i] = randomNum;
    }
  }
  // You may or may not want to have insert the solution into the DOM... I did for demo purposes mainly
  drawSolutionArea();
  // This just clears out the area where the user will input guesses and then inserts an input for each digit in the solution
  drawPlayerSlots();
};

const drawSolutionArea = () => {
  // empty the solutions section of the dom
  $('#solution').html('');
  for (let secret of secretCode) {
    const domString = `<div class='face-down code'>${secret}</div>`;
    $('#solution').append(domString);
  }
};

const drawPlayerSlots = () => {
  $('#guesses').html('');
  for (let i = 0; i < numberOfSlots; i++) {
    const domString = `<input type='text' id='slot-${i}' class='slot' size='1'>`;
    $('#guesses').append(domString);
  }
};

const checkGuess = () => {
  // If colourizing the inputs, make sure to clear out from previous guesses
  $('#guesses .slot').css('background-color', 'transparent');
  // Array to hold this user guess
  const thisGuess = [];

  // Container for the user feedback on the current guess
  const guessRow = `<div id='history-${playerGuesses.length}' class='history-row'></div>`;
  $('#history').append(guessRow);

  // Loop over each of the digits and compare user guess to the secret code
  for (let i = 0; i < numberOfSlots; i++) {
    const guessItem = $(`#slot-${i}`).val();
    // Check for exact match
    if (guessItem == secretCode[i]) {
      $(`#slot-${i}`).css('background-color', 'green');
      const domString =
        '<div style="background-color:green;" class="slot"></div>';
      $(`#history-${playerGuesses.length}`).append(domString);
    } else if (secretCode.indexOf(guessItem) >= 0) {
      // If not an exact match, check for correct item but wrong position
      $(`#slot-${i}`).css('background-color', 'yellow');
      const domString =
        '<div style="background-color:yellow;" class="slot"></div>';
      $(`#history-${playerGuesses.length}`).append(domString);
    } else {
      // item isn't in secret, but we still want feedback placeholder in DOM
      const domString =
        '<div style="background-color:transparent;" class="slot"></div>';
      $(`#history-${playerGuesses.length}`).append(domString);
    }
    thisGuess[i] = guessItem;
  }
  playerGuesses.push(thisGuess);
};

$('#generate').on('click', generateSecret);
$('#guess').on('click', checkGuess);
