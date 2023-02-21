'use strict';

$(console.log('ready'));

const game = {
  // variable to prevent additional clicks while we wait for cards to be turned back down
  preventClicks: false,
  // Array of all possible cards. Should exceed the max number of pairs needed for the game
  possibleCards: [
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
  ],
  /* Arrays used to draw, pair, and shuffle cards */
  drawnCards: [],
  cardPairs: [],
  shuffledPairs: [],
  init: () => {
    // event handler to read desired number of pairs and call dealer
    $('#deal-cards').on('click', () => {
      const numPairs = $('#num-pairs').val();
      game.dealCards(Number(numPairs));
    });
  },
  /* higher order function that clears the board and then deals cards */
  dealCards: function (numPairs = 1) {
    game.resetGameboard();
    game.resetCards();
    game.drawCards(numPairs);
    game.makePairs();
    game.shuffleCards();
    game.renderCards();
    game.activateCards();
  },
  /* Clear the DOM for a new round */
  resetGameboard: function () {
    $('#gameboard').html('');
  },
  /* reset the card Arrays to empty  */
  resetCards: function () {
    game.drawnCards = [];
    game.cardPairs = [];
    game.shuffledPairs = [];
  },
  /* populate the cardset array with unique elements from possible cards */
  drawCards: (numCards = 1) => {
    /* Before we enter the loop, check that a valid number of cards has been requested */
    if (numCards > game.possibleCards.length) {
      console.log('asking for more cards than exist');
      return;
    }

    // loop until the drawnCards array is filled with the specified number of cards
    while (game.drawnCards.length < numCards) {
      const randomIndex = Math.floor(Math.random() * game.possibleCards.length);
      /* check if the drawn card is already in the card set */
      if (game.drawnCards.indexOf(game.possibleCards[randomIndex]) >= 0) {
        continue;
      } else {
        game.drawnCards.push(game.possibleCards[randomIndex]);
      }
    }
    console.log('unique individual, cards', game.drawnCards);
  },
  /* concatenate drawnCards with itself so we have pairs of each drawn card */
  makePairs: function () {
    game.cardPairs = game.drawnCards.concat(game.drawnCards);
    console.log(game.cardPairs);
  },
  /* randomly pull from the ordered cardPairs Array and insert into shuffledCards */
  shuffleCards: function () {
    while (game.cardPairs.length > 0) {
      const randomIndex = Math.floor(Math.random() * game.cardPairs.length);
      const randomCard = game.cardPairs.splice(randomIndex, 1);
      game.shuffledPairs.push(randomCard[0]);
    }
    console.log(game.shuffledPairs);
  },
  /* Dynamically construct and insert a DOM element for each card */
  renderCards: function () {
    // loop through the array of shuffledPairs
    for (const item of game.shuffledPairs) {
      console.log(item);
      const cardDomString = `<div class="card">
          <div class="card-face-up">${item}</div>
          <div class="card-face-down"></div>
      </div>`;
      // use jquery to insert into the DOM
      $('#gameboard').append(cardDomString);
    }
  },
  /* Add click event listeners to all cards in the DOM */
  activateCards: function () {
    $('.card').on('click', function (event) {
      /* prevent clicking on more than 2 cards while waiting for match detection and possibly turn-down on unmatched  */
      if (!game.preventClicks) {
        /* The click actually happens on the inner (face down) div, but since we registered the event listener on the outer .card element use event.currentTarget */
        console.log(event.currentTarget);
        $(event.currentTarget)
          .addClass('selected')
          .children('.card-face-down')
          .slideUp();
        /* if there are two cards now selected, prevent clicks and check for match */
        if ($('.card.selected').length == 2) {
          console.log('check for match');
          game.preventClicks = true;
          game.checkForMatch();
        }
      }
    });
  },
  /* called when 2 cards have been selected */
  checkForMatch: function () {
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
      game.preventClicks = false;
    } else {
      console.log('nope');
      // no match, so turn them back to face down and unselected after 2 seconds
      setTimeout(game.deselectCards, 2000);
    }
  },
  /* called when there is no match.  unselect the currently selected 2 cards and turn them back to face down  */
  deselectCards: function () {
    $('.card.selected')
      .removeClass('selected')
      .children('.card-face-down')
      .slideDown();
    // allow user to click on cards to try again
    game.preventClicks = false;
  },
};

$(game.init());
