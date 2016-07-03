/*global
$
*/

// ================== globals ==================
var word = null;
var correct = null;
var wrong = null;

var $message = null;
var $word = null;
var $hangman = null;
var $newGame = null;

// ================== view helpers ==================
var updateHangman = function (numWrong) {
  $hangman.attr('src', 'Hangman-' + numWrong + '.png');
};

var getDisplayedWord = function (word, correct) {
  var displayedWord = '';
  for (var i = 0; i < word.length; i++) {
    var correctLetter = word.charAt(i);
    var displayedLetter = '_';
    if (correct.includes(correctLetter)) {
      displayedLetter = correctLetter;
    }
    displayedWord = displayedWord + displayedLetter;
  }
  return displayedWord;
};

var displayMessage = function (message) {
  $message.show();
  $message.text(message);
};

// ================== game logic ==================

var endGame = function (message) {
  $newGame.show();
  displayMessage(message);
};

var guessLetter = function (guess) {
  $message.hide();
  if (wrong.includes(guess) || correct.includes(guess)) {
    onAlreadyGuessed(guess);
  } else if (word.match(guess)) {
    onCorrect(guess);
  } else {
    onWrong(guess);
  }
};

// ================== game actions ==================

var onAlreadyGuessed = function (letter) {
  displayMessage('You already guessed ' + letter);
};

var onWrong = function (letter) {
  wrong.push(letter);
  updateHangman(wrong.length);
};

var onCorrect = function (letter) {
  correct.push(letter);
  var displayedWord = getDisplayedWord(word, correct);
  $word.text(displayedWord);
  if (displayedWord === word) {
    onWon();
  } else if (wrong.length >= 6) {
    onLose();
  }
};

var onWon = function () {
  endGame('You Won!');
};

var onLose = function () {
  endGame('You Lose :(');
};

// ================== view actions ===============

var onKeyPress = function (event) {
  var guess = event.key.toUpperCase();
  guessLetter(guess);
};

var onNewGameClick = function () {
  reset();
};

// ================== game ==================

var reset = function () {
  correct = [];
  wrong = [];
  word = 'ABALONE';
  $message.hide();
  $newGame.hide();
  var displayedWord = getDisplayedWord(word, correct);
  $word.text(displayedWord);
};

var setup = function () {
  $word = $('#word');
  $message = $('#message');
  $newGame = $('#newGame');
  $hangman = $('#hangman');
  $(document).keypress(onKeyPress);
  $newGame.click(onNewGameClick);
};

// ================== ready ==================

var onReady = function () {
  setup();
  reset();
};

$(document).ready(onReady);
