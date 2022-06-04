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
let wrongLettersLegend = document.querySelector(".wrong-letters-legend");
let lettersBox = document.querySelector(".letters-box");
let wrongLettersBox = document.querySelector(".wrong-letters-box");
let playBtn = document.querySelector(".start-btn");
let quitBtn = document.querySelector(".quit-btn");
let addWordBtn = document.querySelector(".add-word-btn");
let saveAddedWordBtn = document.querySelector(".confirm-added-word-btn");
let playAgainBtn = document.querySelector(".play-again-btn");
let addWordDialog = document.querySelector(".add-word-dialog");
let invalidInputDialog = document.querySelector("#invalidInputDialog");
let repeatedLetterDialog = document.querySelector("#repeatedLetterDialog");
let repeatedWordDialog = document.querySelector("#repeatedWordDialog");
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
let remainingLetters;
let lettersArray = [];
let rightLetters = [];
let wrongLetters = [];
let mistakes = 0;
let regex = /^[a-z]+$/i;

playBtn.addEventListener("click", drawBoardGame);
function drawBoardGame() {
  clickAudio.play();

  hangmanImg.setAttribute("src", "images/forca.webp");

  let bgMusic = new Audio("sounds/mixkit-quiet-forest-ambience-1220.mp3");
  bgMusic.play();
  bgMusic.loop = true;

  //tip.style.visibility = "visible";
  wrongLettersLegend.style.visibility = "visible";
  wrongLettersBox.style.visibility = "visible";
  playBtn.style.display = "none";
  addWordBtn.style.display = "none";
  quitBtn.style.display = "inline-block";
  document.querySelector("header").style.marginTop = "10vh";

  drawSecretWord();

  document.addEventListener("keydown", checkInput);
}

function drawSecretWord() {
  selectSecretWord();
  lettersArray = Array.from(secretWord);
  //console.log(lettersArray);
  remainingLetters = lettersArray.length;

  for (let i = 0; i < lettersArray.length; i++) {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("id", `letterInput${i}`);
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("maxlength", "1");
    inputElement.setAttribute("readonly", "");
    //inputElement.value = lettersArray[i].toUpperCase();
    //inputElement.style.color = "white";
    lettersBox.appendChild(inputElement);
    inputElement.focus();
    inputElement.style.outline = "none";
  }

  return lettersArray;
}

function selectSecretWord() {
  secretWord = words[Math.floor(Math.random() * words.length)];

  return secretWord;
}

function checkInput(e) {
  let typedLetter = e.key.toLowerCase();
  console.log(typedLetter);

  if (
    rightLetters.includes(typedLetter) ||
    wrongLetters.includes(typedLetter)
  ) {
    repeatedLetterDialog.showModal();
    let closeRepeatedLetterDialogBtn = document.querySelector(
      "#closeRepeatedLetterDialogBtn"
    );
    closeRepeatedLetterDialogBtn.addEventListener("click", () => {
      clickAudio.play();
      repeatedLetterDialog.close();
    });
    return;
  }

  for (let i = 0; i < lettersArray.length; i++) {
    if (typedLetter === lettersArray[i]) {
      let letterInput = document.querySelector(`#letterInput${i}`);
      letterInput.value = lettersArray[i].toUpperCase();

      let correctSound = new Audio(
        "sounds/mixkit-funny-squeaky-toy-hits-2813.mp3"
      );
      correctSound.play();

      rightLetters.push(typedLetter.toLowerCase());
      //console.log(rightLetters);

      remainingLetters--;
    }
  }

  if (
    !lettersArray.includes(typedLetter) &&
    typedLetter.length === 1 &&
    regex.test(typedLetter) &&
    !wrongLetters.includes(typedLetter)
  ) {
    wrongLetters.push(typedLetter.toLowerCase());
    //console.log(wrongLetters);
    wrongLettersBox.textContent = wrongLetters.map((letter) => {
      return letter.toUpperCase();
    });

    let wrongSound = new Audio("sounds/mixkit-boxer-getting-hit-2055.mp3");
    wrongSound.play();

    mistakes++;

    drawHangman();
  }

  if (!regex.test(typedLetter)) {
    invalidInputDialog.showModal();
    let closeInvalidInputDialogBtn = document.querySelector(
      "#closeInvalidInputDialogBtn"
    );
    closeInvalidInputDialogBtn.addEventListener("click", () => {
      clickAudio.play();
      invalidInputDialog.close();
    });
  }

  if (remainingLetters === 0) {
    youWin();
  } else if (mistakes === 6) {
    gameOver();
    document.removeEventListener("keydown", checkInput);
  }
}

quitBtn.addEventListener("click", () => {
  clickAudio.play();
  setTimeout(resetGame, 650);
});

addWordBtn.addEventListener("click", addWord);
function addWord() {
  clickAudio.play();
  addWordDialog.showModal();
  let saveAddedWordBtn = document.querySelector("#saveAddedWordBtn");
  saveAddedWordBtn.addEventListener("click", () => {
    let wordInput = document.querySelector("#wordInput");
    clickAudio.play();
    //console.log(wordInput);
    if (!regex.test(wordInput.value) || wordInput.value.length > 8) {
      invalidInputDialog.showModal();
      let closeInvalidInputDialogBtn = document.querySelector(
        "#closeInvalidInputDialogBtn"
      );
      closeInvalidInputDialogBtn.addEventListener("click", () => {
        clickAudio.play();
        invalidInputDialog.close();
      });
    } else if (words.includes(wordInput.value)) {
      repeatedWordDialog.showModal();
      let closeRepeatedWordDialogBtn = document.querySelector(
        "#closeRepeatedWordDialogBtn"
      );
      closeRepeatedWordDialogBtn.addEventListener("click", () => {
        clickAudio.play();
        repeatedWordDialog.close();
      });
    } else {
      words.push(wordInput.value);
      wordInput.focus();
      wordInput.value = "";
      //addWordDialog.close();
    }
  });

  let closeAddWordDialogBtn = document.querySelector("#closeAddWordDialogBtn");
  closeAddWordDialogBtn.addEventListener("click", () => {
    clickAudio.play();
    addWordDialog.close();
  });

  return words;
}

function youWin() {
  let applause = new Audio(
    "sounds/mixkit-animated-small-group-applause-523.mp3"
  );
  applause.play();

  winDialog.showModal();

  let closeWinDialogBtn = document.querySelector("#closeWinDialogBtn");
  closeWinDialogBtn.addEventListener("click", () => {
    clickAudio.play();

    function showWinDialog() {
      winDialog.close();
    }
    setTimeout(showWinDialog, 650);

    setTimeout(resetGame, 651);
  });

  // let playAgainBtn = document.querySelector("#playAgainBtn");
  // playAgainBtn.addEventListener("click", () => {
  //   clickAudio.play();
  //   setTimeout(drawBoardGame(), 1000);
  //   winDialog.close();
  // });
}

function drawHangman() {
  hangmanImg.setAttribute("src", `images/forca${mistakes}.webp`);
}

function gameOver() {
  let bloodyAudio = new Audio("sounds/mixkit-video-game-blood-pop-2361.mp3");
  bloodyAudio.play();
  let gameOverTrombone = new Audio(
    "sounds/mixkit-sad-game-over-trombone-471.mp3"
  );

  function playTrombone() {
    gameOverTrombone.play();
  }
  setTimeout(playTrombone, 1000);

  function showGameOverDialog() {
    loseDialog.showModal();
  }
  setTimeout(showGameOverDialog, 1000);

  let closeLoseDialogBtn = document.querySelector("#closeLoseDialogBtn");
  closeLoseDialogBtn.addEventListener("click", () => {
    clickAudio.play();

    function closeGameOverDialog() {
      loseDialog.close();
    }
    setTimeout(closeGameOverDialog, 650);

    setTimeout(resetGame, 651);
  });

  // let playAgainLostBtn = document.querySelector("#playAgainLostBtn");
  // playAgainLostBtn.addEventListener("click", () => {
  //   clickAudio.play();
  //   setTimeout(drawBoardGame(), 650);
  // });
}

function resetGame() {
  remainingLetters = 0;
  wrongLetters = 0;
  location.reload();
}
