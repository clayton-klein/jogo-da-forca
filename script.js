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

window.onload = function (

  let bgMusic = new sound("sons/mixkit-quiet-forest-ambience-1220.mp3");
  bgMusic.play();
);

let hangmanImg = document.querySelector(".img-forca");
let wrongLettersBox = document.querySelector(".wrong-letters-box");
let rightLettersBox = document.querySelector("right-letters-box");
let playBtn = document.querySelector(".start");
let addWordBtn = document.querySelector(".add-word");


let regex = /^[a-zA-Z]$/;

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

let rightLetters = [];
let wrongLetters = [];

// function desenhaTabuleiro {

// }

// function criarPalavraSecreta {

// }

// function criarTracosPalavraSecreta {

// }

// function verificarLetraPressionada {

// }

// function escreverLetraCorreta {

// }

// function escreverLetraIncorreta {

// }

// function desenharForca {

// }

// function verificarLetraCorreta {

// }

// function gameOver {

// }

// function youWin {

// }

// function addWord {

// }
