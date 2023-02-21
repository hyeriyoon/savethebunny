'use strict';
////////////////////////////////////////////////////////
/********************* START PAGE *********************/
////////////////////////////////////////////////////////

///////////vanilla javascript//////////////
const $inputName = document.querySelector('#input-name');
const $buttonSubmit = document.querySelector('#btn-submit');
const $playerName = document.querySelector('#name-player');
let pName;

const getPlayerName = function () {
  $playerName.textContent = pName;
  $inputName.value = '';
  $inputName.parentNode.removeChild($inputName);
  $buttonSubmit.parentNode.removeChild($buttonSubmit);
};
const onInput = function (event) {
  pName = event.target.value;
};

$inputName.addEventListener('input', onInput);
$buttonSubmit.addEventListener('click', getPlayerName);

/******My Jquery is not working and I don'k know why...*******/

///////////////////JQuery////////////////
// let pName;
// const getPlayerName = function(){
// 		$('#name-player').textContent = pName;
// 		$('input-name').value = '';
// 	}
// 	const onInput = function(event){
// 		pName = event.target.value;
// 	}
// $('input-name').on('input', onInput);
// $('btn-submit').on('click', getPlayerName);//

///////////////////////////////////////////////////////
/********************* GAME PAGE *********************/
///////////////////////////////////////////////////////

let randomNumbersArray = [];
const $buttonLevel1 = document.querySelector('#btn-lv1');
const $buttonLevel2 = document.querySelector('#btn-lv2');
const $buttonLevel3 = document.querySelector('#btn-lv3');

/////make random number (4,5 or 6)
const doRandomNumbers = function (num) {
  console.log(num);
  for (let i = 0; i < num; i++) {
    let randomNumbers = Math.floor(Math.random() * 10);
    if (randomNumbersArray.indexOf(randomNumbers) === -1) {
      randomNumbersArray.push(randomNumbers);
    } else {
      i--;
    }
  }
  return randomNumbersArray;
};

////// select the level(level1=4digit, level2=5digit, level3=6digit)
const innerSelectLevel = number => {
  console.log('innerSelectNumber received ', number, typeof number);
  switch (number) {
    case 4:
      console.log('calling doRandomNUmbers from switch');
      doRandomNumbers(4);
      break;
    case 5:
      doRandomNumbers(5);
      break;
    case 6:
      doRandomNumbers(6);
      break;
  }
};

////////////////////////////////////
//my doRandomNumbers function is make the randomnumbers by the level 4,5 or 6 digits.
// and this is working when I type it in a console but not working when I use it in the code.
//Also, when I type doRandomNumbers(4) is working well, but after that I type doRandomNumber(5) then,
//it makes 9digits and also righth after that I type doRandomNumber(6) then, it maks infinite loop.
/////////////////////////////////////

// const selectLevel1 = innerSelectLevel(4);

$buttonLevel1.addEventListener('click', () => {
  console.log('button 1 was clicked');
  innerSelectLevel(4);
});

///////////////////////////////////
//I want to make button for each level to generate secret code.
//I tried level1 for 4digits and this doesn't work.I don't know why T_T..
