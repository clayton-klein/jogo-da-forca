"use strict";

let clickAudio = new Audio("sounds/mixkit-retro-game-notification-212.mp3");
let hangmanImg = document.querySelector(".hangman-img");
//let tip = document.querySelector(".tip");
let wrongLettersLegend = document.querySelector(".wrong-letters-legend");
let lettersBox = document.querySelector(".letters-box");
let wrongLettersBox = document.querySelector(".wrong-letters-box");
let playBtn = document.querySelector(".start-btn");
let quitBtn = document.querySelector(".quit-btn");
let addWordBtn = document.querySelector(".add-word-btn");
let saveAddedWordBtn = document.querySelector(".confirm-added-word-btn");
//let playAgainBtn = document.querySelector(".play-again-btn");
let addWordDialog = document.querySelector(".add-word-dialog");
let invalidInputDialog = document.querySelector("#invalidInputDialog");
let repeatedLetterDialog = document.querySelector("#repeatedLetterDialog");
let repeatedWordDialog = document.querySelector("#repeatedWordDialog");
let winDialog = document.querySelector(".win-dialog");
let loseDialog = document.querySelector(".lose-dialog");
let fakeInput = document.querySelector("#fakeInput");

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
  "genesys",
];

let secretWord = "";
let remainingLetters;
let lettersArray = [];
let rightLetters = [];
let wrongLetters = [];
let mistakes = 0;
let regex = /^[a-zA-Z]+$/;

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

  drawSecretWord();

  document.addEventListener("click", () => {
    fakeInput.focus(); //foca o input fake no celular quando clicar na tela.
  });

  document.addEventListener("input", checkInput);
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
    lettersBox.appendChild(inputElement);
    inputElement.style.outline = "none";
  }

  //document.querySelector("#letterInput0").focus();

  return lettersArray;
}

function selectSecretWord() {
  secretWord = words[Math.floor(Math.random() * words.length)];

  return secretWord;
}

function checkInput(e) {
  let typedLetter = e.target.value.toLowerCase();
  //console.log(typedLetter);

  if (
    rightLetters.includes(typedLetter) ||
    wrongLetters.includes(typedLetter)
  ) {
    typedLetter = "repeated"; //segue a função, mas sem incrementar ou decrementar erros e acertos.
    repeatedLetterDialog.showModal();
    let closeRepeatedLetterDialogBtn = document.querySelector(
      "#closeRepeatedLetterDialogBtn"
    );
    closeRepeatedLetterDialogBtn.addEventListener("click", () => {
      clickAudio.play();
      repeatedLetterDialog.close();
    });
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
    wrongLettersBox.innerText = wrongLetters.map((letter) => {
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

  fakeInput.value = "";
  fakeInput.focus();

  if (remainingLetters === 0) {
    youWin();
  } else if (mistakes === 6) {
    gameOver();
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
    //console.log(wordInput);

    clickAudio.play();

    if (!regex.test(wordInput.value) || wordInput.value.length > 8) {
      invalidInputDialog.showModal();

      let closeInvalidInputDialogBtn = document.querySelector(
        "#closeInvalidInputDialogBtn"
      );
      closeInvalidInputDialogBtn.addEventListener("click", () => {
        clickAudio.play();
        invalidInputDialog.close();
      });
    } else if (words.includes(wordInput.value.toLowerCase())) {
      repeatedWordDialog.showModal();

      let closeRepeatedWordDialogBtn = document.querySelector(
        "#closeRepeatedWordDialogBtn"
      );
      closeRepeatedWordDialogBtn.addEventListener("click", () => {
        clickAudio.play();
        repeatedWordDialog.close();
      });

      wordInput.value = "";
      wordInput.focus();
      wordInput.placeholder = "";
    } else {
      words.push(wordInput.value.toLowerCase());
      wordInput.value = "";
      wordInput.focus();
      wordInput.placeholder = "Palavra adicionada!";
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
  document.removeEventListener("input", checkInput);

  let applause = new Audio(
    "sounds/mixkit-animated-small-group-applause-523.mp3"
  );
  applause.play();

  function showWinDialog() {
    winDialog.showModal();
  }
  setTimeout(showWinDialog, 650);

  let closeWinDialogBtn = document.querySelector("#closeWinDialogBtn");
  closeWinDialogBtn.addEventListener("click", () => {
    clickAudio.play();

    function closeWinDialog() {
      winDialog.close();
    }
    setTimeout(closeWinDialog, 650);

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
  document.removeEventListener("input", checkInput);

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
