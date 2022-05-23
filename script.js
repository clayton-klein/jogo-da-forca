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

// HTML elements selection

let hangmanImg = document.querySelector(".img-forca");
let wrongLettersBox = document.querySelector(".wrong-letters-box");
let lettersBox = document.querySelector("letters-box");
let playBtn = document.querySelector(".start");
let addWordBtn = document.querySelector(".add-word");

addWordBtn.addEventListener("click", () => {
  let clickAudio = new Audio("sounds/mixkit-retro-game-notification-212.mp3");
  clickAudio.play();
  document.querySelector(".addWord").showModal();
});

let words = [
  "clayton",
  "rebecca",
  "gustavo",
  "weslley",
  "ellen",
  "raquel",
  "mauricio",
  "ricardo",
  "bruno",
  "marlene",
];

let secretWord = "";
let placeHolder = [];
let rightLetters = [];
let wrongLetters = [];

let remainingLetters = secretWord.length;
let mistakes = 0;

let regexLowerCase = /[a-z]/;
let regexUpperCase = /[A-Z]/;

// function drawBoard {
//let bgMusic = new Audio('sounds/mixkit-quiet-forest-ambience-1220.mp3');
//   bgMusic.play();
//   bgMusic.loop = true;
// }

function createSecretWord() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  return secretWord;
}

function createUnderlines() {
  for (let i = 0; i < secretWord.length; i++) {
    placeHolder[i] = "_";
    lettersBox.innerText = placeHolder;
  }
}

function checkKeyPressed() {
  window.addEventListener("input", (e) => {
    if (e.input != regex.test()) {
      alert("Utilize somente letras sem acentos");
    } else {
    }
  });
}

function writeCorrectWord(e) {
  let correctSound = new Audio("sounds/mixkit-funny-squeaky-toy-hits-2813.mp3");
  correctSound.play();
  rightLetters = e.input;
  return rightLetters;
}

function writeIncorrectWord(e) {
  let wrongSound = new Audio("sounds/mixkit-boxer-getting-hit-2055.mp3");
  wrongSound.play();
  wrongLetters = e.input;
  return wrongLetters;
}

function drawHangman() {
  hangmanImg.setAttribute("src", `images/forca${mistakes}.webp`);
}

function checkCorrectWord() {
  if (!regexLowerCase.test() || !regexUpperCase) {
    alert("Utilize somente letras sem acentos");
  }
}

function gameOver() {
  if (mistakes === 5) {
    let bloodyAudio = new Audio("sounds/mixkit-video-game-blood-pop-2361.mp3");
    let gameOverTrombone = new Audio(
      "sounds/mixkit-sad-game-over-trombone-471.mp3"
    );
    bloodyAudio.play();
    gameOverTrombone.play();
  }
}

function youWin() {
  if (remainingLetters === 0) {
    let applause = new Audio(
      "sounds/mixkit-animated-small-group-applause-523.mp3"
    );
    applause.play();
  }
}

function addWord(word) {
  words.push(word);
}

// while (mistakes <= 5 || remainingLetters > 0) {

// }
