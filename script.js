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

let secretWord =;
let rightLetters = [];
let wrongLetters = [];

let remainingLetters = secretWord.length;
let mistakes = 0;

let regex = /[a-zA-Z]/;
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
    let letters = document.querySelector('.letters-box');    
    showUnderlines[i] = '_';
    letters.innerText = showUnderlines;
  }
}


function checkKeyPressed() {
  window.addEventListener('input', (e)=> {
    if(!regex.test()) {
      alert('Utilize somente letras sem acentos');
    } else {

    }
  });
}

function writeCorrectWord() {
  rightLetters = ;
}

function writeIncorrectWord() {
  wrongLetters = ;
}

function drawHangman() {
  hangmanImg.setAttribute('src', '`images/forca${++}.webp`');

}

// function checkCorrectWord {
  // if(!regex) {
  //   alert('Utilize somente letras sem acentos')
  // }

// }

// function gameOver() {
// if (mistakes === 5) {

//}
// }

// function youWin() {
  // if(remainingLetters === 0) {
    
  // }

// }

// function addWord(word) {
  //words = words.push(word)
// }

while (mistakes <= 5 || remainingLetters > 0) {
  
}