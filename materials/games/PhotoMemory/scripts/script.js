'use strict';

/***********
The code below is intended just as snippets of useful functionality.
It is neither complete nor well organized, but hopefully gives a boost in terms of one way to handle some aspects of the logic behind this game.
Please make sure that you meet the Requirements for all Games in your project.
*************/

// event handler to read desired number of pairs from the DOM input and call dealer
$('#deal-cards').on('click', () => {
  const numPairs = $('#num-pairs').val();
  dealCards(Number(numPairs));
});

// variable to prevent additional clicks while we wait for cards to be turned back down
let preventClicks = false;

// Array of all possible cards. This should exceed the max number of pairs needed for the game.
// Though these are letters in this example, they could just as easily be img elements

const possibleCards = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

/* Arrays used to draw, pair, and shuffle cards */
let drawnCards = [];
let cardPairs = [];
let shuffledPairs = [];

/* higher order function that clears the board and then deals cards */
const dealCards = function (numPairs = 1) {
  resetGameboard();
  resetCards();
  drawCards(numPairs);
  makePairs();
  shuffleCards();
  renderCards();
  activateCards();
};

/* Clear the DOM for a new round */
const resetGameboard = function () {
  $('#gameboard').html('');
};

/* reset the card Arrays to empty  */
const resetCards = function () {
  drawnCards = [];
  cardPairs = [];
  shuffledPairs = [];
};

/* populate the cardset array with unique elements from possible cards */
const drawCards = function (numCards = 1) {
  /* Before we enter the loop, check that a valid number of cards has been requested */
  if (numCards > possibleCards.length) {
    console.log('asking for more cards than exist');
    return;
  }

  // loop until the drawnCards array is filled with the specified number of cards
  while (drawnCards.length < numCards) {
    const randomIndex = Math.floor(Math.random() * possibleCards.length);
    /* check if the drawn card is already in the card set */
    if (drawnCards.indexOf(possibleCards[randomIndex]) >= 0) {
      continue;
    } else {
      drawnCards.push(possibleCards[randomIndex]);
    }
  }
  console.log('unique individual, cards', drawnCards);
};

/* concatenate drawnCards with itself so we have pairs of each drawn card */
const makePairs = function () {
  cardPairs = drawnCards.concat(drawnCards);
  console.log(cardPairs);
};

/* randomly pull from the ordered cardPairs Array and insert into shuffledCards */
const shuffleCards = function () {
  while (cardPairs.length > 0) {
    const randomIndex = Math.floor(Math.random() * cardPairs.length);
    const randomCard = cardPairs.splice(randomIndex, 1);
    shuffledPairs.push(randomCard[0]);
  }
  console.log(shuffledPairs);
};

/* Dynamically construct and insert a DOM element for each card */
const renderCards = function () {
  // loop through the array of shuffledPairs
  for (const item of shuffledPairs) {
    console.log(item);
    const cardDomString = `<div class="card">
          <div class="card-face-up">${item}</div>
          <div class="card-face-down"></div>
      </div>`;
    // use jquery to insert into the DOM
    $('#gameboard').append(cardDomString);
  }
};

/* 
Add click event listeners to all cards in the DOM 
This gets called after the cards are added to the DOM
*/
const activateCards = function () {
  $('.card').on('click', function (event) {
    /* prevent clicking on more than 2 cards while waiting for match detection and possibly turn-down on unmatched  */
    if (!preventClicks) {
      /* The click actually happens on the inner (face down) div, but since we registered the event listener on the outer .card element use event.currentTarget */
      console.log(event.currentTarget);
      $(event.currentTarget)
        .addClass('selected')
        .children('.card-face-down')
        .slideUp();
      /* if there are two cards now selected, prevent clicks and check for match */
      if ($('.card.selected').length == 2) {
        console.log('check for match');
        preventClicks = true;
        checkForMatch();
      }
    }
  });
};

/* called when 2 cards have been selected */
const checkForMatch = function () {
  /* extract the innerHTML of the 2 cards so that we can compare them */
  const card1 = $('.card.selected').eq(0).children('.card-face-up').html();
  console.log('card 1 contains', card1);
  const card2 = $('.card.selected').eq(1).children('.card-face-up').html();
  console.log('card 2 contains', card2);
  if (card1 == card2) {
    console.log('MATCH!');
    // cards stay face up but remove the selected class
    $('.card.selected').removeClass('selected');
    // allow user to start clicking in serach of another matching pair
    preventClicks = false;
  } else {
    console.log('nope');
    // no match, so turn them back to face down and unselected after 2 seconds
    setTimeout(deselectCards, 2000);
  }
};

/* called when there is no match.  unselect the currently selected 2 cards and turn them back to face down  */
const deselectCards = function () {
  $('.card.selected')
    .removeClass('selected')
    .children('.card-face-down')
    .slideDown();
  // allow user to click on cards to try again
  preventClicks = false;
};
