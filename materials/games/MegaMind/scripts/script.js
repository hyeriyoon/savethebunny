'use strict';

/***********
The code below is intended just as snippets of useful functionality.
It is neither complete nor well organized, but hopefully gives a boost in terms of one way to handle some aspects of the logic behind this game.
Please make sure that you meet the Requirements for all Games in your project.
*************/

let numberOfSlots = 4;

// system generated secret array
const secretCode = [];

// player guesses
const playerGuesses = [];

// method to generate secret code
const generateSecret = () => {
  // read input to determine number of slots
  numberOfSlots = Number($('#slot-count').val());
  // empty the array
  secretCode.length = 0;

  for (let i = 0; i < numberOfSlots; i++) {
    let randomNum = Math.floor(Math.random() * 10);
    while (secretCode.indexOf(randomNum) >= 0) {
      randomNum = Math.floor(Math.random() * 10);
    }
    secretCode[i] = randomNum;
  }
  drawSolutionArea();
  drawPlayerSlots();
};

const drawSolutionArea = () => {
  // empty the solution part of the dom
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
  $('#guesses .slot').css('background-color', 'transparent');
  const thisGuess = [];
  const guessRow = `<div id='history-${playerGuesses.length}' class='history-row'></div>`;
  $('#history').append(guessRow);
  for (let i = 0; i < numberOfSlots; i++) {
    const num = Number($(`#slot-${i}`).val());
    thisGuess[i] = num;
    if (num == secretCode[i]) {
      $(`#slot-${i}`).css('background-color', 'green');
      const domString =
        '<div style="background-color:green;" class="slot"></div>';
      $(`#history-${playerGuesses.length}`).append(domString);
    } else if (secretCode.indexOf(num) >= 0) {
      $(`#slot-${i}`).css('background-color', 'yellow');
      const domString =
        '<div style="background-color:yellow;" class="slot"></div>';
      $(`#history-${playerGuesses.length}`).append(domString);
    } else {
      const domString =
        '<div style="background-color:transparent;" class="slot"></div>';
      $(`#history-${playerGuesses.length}`).append(domString);
    }
  }
  playerGuesses.push(thisGuess);
};

$('#generate').on('click', generateSecret);
$('#guess').on('click', checkGuess);
