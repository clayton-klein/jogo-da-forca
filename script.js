"use strict";
// Requisitos:
// - Deve funcionar só com letras maiúsculas;
// - Não devem ser utilizadas letras com acentos nem caracteres especiais;
// - Ao completar o desenho da forca, deve ser exibida uma mensagem na tela de "Fim de Jogo";
// - Se completar a palavra correta antes de acabarem as tentativas, deve ser exibida na tela a mensagem "Você Venceu. Parabéns!";
// - A página deve ter os traços indicando cada letra da palavra, separados por espaço;
// - A página deve ter um botão de "Iniciar Jogo" para começar o jogo;
// - Só deve ser possívél escrever letras (os números não serão válidos)
// - As letras erradas devem aparecer na tela, mas não podem aparecer repetidamente;
// - As letras corretas devem ser mostradas na tela acima dos traços, nas posições corretas em relação à palavra.

// Extras:
// - A página deve conter um campo para inserção de texto com a finalidade de adicionar novas palavras ao jogo, e um botão "Adicionar nova palavra".

// HTML elements' selection
let clickAudio = new Audio("sounds/mixkit-retro-game-notification-212.mp3");
let hangmanImg = document.querySelector(".hangman-img");
let tip = document.querySelector(".tip");
let lettersBox = document.querySelector(".letters-box");
let wrongLettersBox = document.querySelector(".wrong-letters-box");
let playBtn = document.querySelector(".start-btn");
let quitBtn = document.querySelector(".quit-btn");
let addWordBtn = document.querySelector(".add-word-btn");
let saveAddedWordBtn = document.querySelector(".confirm-added-word-btn");
let playAgainBtn = document.querySelector(".play-again-btn");
let addWordDialog = document.querySelector(".add-word-dialog");
let invalidInputDialog = document.querySelector(".invalid-input-dialog");
let winDialog = document.querySelector(".win-dialog");
let loseDialog = document.querySelector(".lose-dialog");

let words = [
  "clayton",
  "rebecca",
  "gustavo",
  "weslley",
  "ellen",
  "raquel",
  "mauricio",
  "oracle",
  "alura",
  "marlene",
];

let secretWord = "";
let rightLetters = [];
let wrongLetters = [];

let mistakes = 0;

let regex = /[a-zA-Z]/;

playBtn.addEventListener("click", drawBoardGame);
function drawBoardGame() {
  clickAudio.play();
  hangmanImg.setAttribute("src", "images/forca.webp");

  createSecretWord();

  let bgMusic = new Audio("sounds/mixkit-quiet-forest-ambience-1220.mp3");
  bgMusic.play();
  bgMusic.loop = true;

  tip.style.visibility = "visible";
  wrongLettersBox.style.visibility = "visible";
  playBtn.style.display = "none";
  addWordBtn.style.display = "none";
  quitBtn.style.display = "inline-block";

  document.querySelector("header").style.marginTop = "6vh";
}

quitBtn.addEventListener("click", () => {
  clickAudio.play();
  setTimeout(resetGame, 650);
});

function createSecretWord() {
  secretWord = words[Math.floor(Math.random() * words.length)];

  for (let i = 0; i < secretWord.length; i++) {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("maxlength", "1");

    lettersBox.appendChild(inputElement);
  }

  return secretWord;
}

let remainingLetters = secretWord.length;

window.addEventListener("input", checkInput);
function checkInput(e) {
  if (!regex.test(e.input.value)) {
    invalidInputDialog.showModal();
  } else {
    e.input.value.toUpperCase();
  }

  for (let i = 0; i < secretWord.length; i++) {
    if (e.input.value === secretWord[i]) {
      writeCorrectLetter(e);
    } else {
      writeIncorrectLetter(e);
    }
  }
}

function writeCorrectLetter(e) {
  let correctSound = new Audio("sounds/mixkit-funny-squeaky-toy-hits-2813.mp3");
  correctSound.play();

  rightLetters[i] = e.input.value.toLowerCase();

  remainingLetters--;

  return rightLetters;
}

function youWin() {
  if (remainingLetters === 0) {
    let applause = new Audio(
      "sounds/mixkit-animated-small-group-applause-523.mp3"
    );
    applause.play();

    winDialog.showModal();

    let closeWinDialogBtn = document.querySelector("#closeWinDialogBtn");
    closeWinDialogBtn.addEventListener("click", () => {
      winDialog.close();
    });

    let playAgainBtn = document.querySelector("#playAgainBtn");
    playAgainBtn.addEventListener("click", () => {
      resetGame();
    });
  }
}

function writeIncorrectLetter(e) {
  let wrongSound = new Audio("sounds/mixkit-boxer-getting-hit-2055.mp3");
  wrongSound.play();

  wrongLetters = e.input.value.toUpperCase().push();

  mistakes++;

  drawHangman();

  return wrongLetters;
}

function drawHangman() {
  hangmanImg.setAttribute("src", `images/forca${mistakes}.webp`);
}

function gameOver() {
  if (mistakes === 6) {
    let bloodyAudio = new Audio("sounds/mixkit-video-game-blood-pop-2361.mp3");
    bloodyAudio.play();
    let gameOverTrombone = new Audio(
      "sounds/mixkit-sad-game-over-trombone-471.mp3"
    );
    gameOverTrombone.play();

    loseDialog.showModal();

    let loseDialogBtn = document.querySelector("#closeLoseDialogBtn");
    loseDialogBtn.addEventListener("click", () => {
      clickAudio.play();
      loseDialog.close();
    });

    let playAgainLostBtn = document.querySelector("#playAgainLostBtn");
    playAgainLostBtn.addEventListener("click", () => {
      clickAudio.play();
      resetGame();
    });
  }
}

addWordBtn.addEventListener("click", addWord);
function addWord() {
  clickAudio.play();

  addWordDialog.showModal();

  let wordInput = document.querySelector(".word-input");

  
  let saveAddedWordBtn = document.querySelector("#saveAddedWordBtn");
  saveAddedWordBtn.addEventListener('click', () => {
    clickAudio.play();
    if (!regex.test(wordInput) || wordInput.length > 8) {
      invalidInputDialog.showModal();
    };

    words.push(wordInput);
  });

  let closeDialogBtn = document.querySelector("#closeAddWordDialogBtn");
  closeDialogBtn.addEventListener("click", () => {
    clickAudio.play();
    addWordDialog.close();
  });

  return words;
}

function resetGame() {
  location.reload();
}
