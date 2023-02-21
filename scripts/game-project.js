'use strict';

//property for start page
const $sectionStart = document.querySelector('#section-start');
const $inputName = document.querySelector('#input-name');
const $buttonSubmitName = document.querySelector('#btn-submit-name');
const $playerName = document.querySelector('#name-player');
let pName;

//property for game page
const $sectionGame = document.querySelector('#section-game');
const $sectionLevel = document.querySelector('#section-level');
const $sectionGuess = document.querySelector('#section-guess');
const $sectionOver = document.querySelector('#section-game-over');
const $buttonStart = document.querySelector('#btn-start');
const $buttonPlay = document.querySelector('#btn-play');
const $buttonLevel1 = document.querySelector('#btn-lv1');
const $buttonLevel2 = document.querySelector('#btn-lv2');
const $buttonLevel3 = document.querySelector('#btn-lv3');
const $inputGuess = document.querySelector('#input-guess');
const $buttonSubmitGuess = document.querySelector('#btn-submit-guess');
const $logs = document.querySelector('#logs');
const $attempts = document.querySelector('#attempts');
const $buttonAgain = document.querySelector('#btn-again');
const $imageCage=document.querySelector("#image-cage");
const $imageReleased=document.querySelector("#image-released");



//information property
const $buttonInfo = document.querySelector('#btn-info');
const $sectionPopup = document.querySelector('#section-popup');


////////////////////////////////////////////////////////
/********************* START PAGE *********************/
////////////////////////////////////////////////////////
const setting = function(){
	$sectionLevel.style.display = 'none';
	$sectionGuess.style.display = 'none';
	$sectionOver.style.display = 'none';
	$sectionPopup.style.display = 'none';
	$buttonAgain.style.display = 'none';
	$buttonStart.style.display = 'block';
	$imageReleased.style.display = 'none';
}
setting();

//name
$inputName.focus();
const getPlayerName = function(){
	$playerName.textContent = pName;
	$inputName.parentNode.removeChild($inputName);
	$buttonSubmitName.parentNode.removeChild($buttonSubmitName);
}
const onInput = function(event){
	pName = event.target.value;
}
$inputName.addEventListener('input',onInput);
$buttonSubmitName.addEventListener('click',getPlayerName);

//info
$buttonInfo.addEventListener('click', ()=>{
	$sectionPopup.style.display = 'block';
})
$sectionPopup.addEventListener('click',()=>{
	$sectionPopup.style.display = 'none';
})


///////////////////////////////////////////////////////
/********************* GAME PAGE *********************/
///////////////////////////////////////////////////////

$buttonStart.addEventListener('click',() => {
	if(pName){
	$buttonStart.style.display = 'none';
	$sectionLevel.style.display = 'block';
	}else{
		alert('Enter the name please.')
	}
})

/********* make random number (4,5 or 6 digits) **********/
let randomNumbersArray = [];
const doRandomNumbers= function(num){
	for(let i=0; i<num; i++){
		let randomNumbers = Math.floor(Math.random()*10);
		if(randomNumbersArray.indexOf(randomNumbers) === -1){
			randomNumbersArray.push(randomNumbers);
		} else{
			i--;
		}
	}return randomNumbersArray;
};

/********* button activation/ inactivation **********/
const activeBtn = function(button){
	button.classList.add("active");
}
const inactiveBtn = function(button){
	button.classList.remove("active");
}

/************* generating secret numbers **************/
const generateSecret = function(number, button){
	button.addEventListener('click', ()=>{
		if(randomNumbersArray.length == 0){
			activeBtn(button);
			doRandomNumbers(number);
		}else if(randomNumbersArray.length == number){
			randomNumbersArray.length = 0
			inactiveBtn(button);
		}
	});

}

/************* Selecting levels (toggle)**************/
generateSecret(4, $buttonLevel1);
generateSecret(5, $buttonLevel2);
generateSecret(6, $buttonLevel3);

/************* play the game **************/
$buttonPlay.addEventListener('click',() => {
	if($buttonPlay.textContent == "Play"){
	$buttonSubmitGuess.disabled = false;

	if(randomNumbersArray.length){
		$sectionGuess.style.display = 'block';
		$buttonPlay.textContent = 'Pause';
		$buttonAgain.style.display = 'none';		
	}else{
		alert('Select the level!');
	}
    }else if($buttonPlay.textContent == "Pause"){
	$buttonPlay.textContent = 'Play';
	$buttonSubmitGuess.disabled = true;
	$buttonAgain.style.display = 'block';
  }})

/////stack 'guesses' into log position
const addTextNode = function(text){
	const newText = document.createTextNode(text);
	$logs.append(newText,document.createElement('br'));
}

/************* check(match) input with secret number **************/
const tries=[];
let strike;
let ball;	
let value;
let i;
const message = document.querySelector("#game-over-message")

const checkInput = () => {
	value = $inputGuess.value;
	if(randomNumbersArray.join('') === value){
		message.textContent = `Success! The secret number is ${randomNumbersArray}`;
		$buttonAgain.style.display = 'block';
		$sectionOver.style.display = 'block';
		$buttonSubmitGuess.disabled = true;
		$imageCage.style.display = 'none';
		$imageReleased.style.display = 'block';
	}
	strike = 0;
	ball = 0;
	for(i=0; i<randomNumbersArray.length; i++){
		const index = value.indexOf(randomNumbersArray[i]);
		if(index>-1){
			if(index == i){
				console.log(value[index]);
				strike +=1;
			}else{
				console.log(value[index]);
				ball +=1;
			}
		}
	}$logs.append(`${value} : ${strike}stike(s) ${ball}ball(s)`, document.createElement('br'));
	tries.push(value);
	$attempts.textContent = `${tries.length}`;
	$inputGuess.value = '';
	$inputGuess.focus();
}
///////////////////////////////////////////////////
/*************** game over page ******************/
///////////////////////////////////////////////////

let overMessage;
$buttonSubmitGuess.addEventListener('click',()=>{
	if(tries.length < 10){
		checkInput();
	}else{
		$sectionOver.style.display = 'block';
		message.textContent = 'Your 10 time challenge is over';
		$buttonAgain.style.display = 'block';
		$buttonSubmitGuess.disabled = true;
	}
	});
$sectionOver.addEventListener('click',()=>{
	$sectionOver.style.display = 'none';
})


