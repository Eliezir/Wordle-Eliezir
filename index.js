import { wordleDictionary, wordleDictionaryNoAccents } from "https://eliezir.github.io/Wordle-Eliezir/dictionary.js";

const dictionaryNoAccents = wordleDictionaryNoAccents;
const dictionary = wordleDictionary;

/* p = p.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); */

const tiles = document.querySelector(".tile-container");
const games = [];
/* variaveis para navegação entre linhas e colunas */
const rows = 6;
const columns = 5;
var activeRowIndex = 0;
var activeCol = 0;
var activeRow;
var wordIndex = 0;

console.log(
  "Ta olhando o console por que? tu n vai pescar no joguinho de palavras n né?"
);

/* sortear a palavra*/

var palavraIndex = Math.floor(Math.random() * dictionaryNoAccents.length);
var termo = dictionaryNoAccents[palavraIndex].toUpperCase();

const msgWin = "Parabéns, você ganhou!";
const txtWin =
  "Obrigado por jogar, caso tenha alguma dica ou sugestão, sinta-se livre para entrar em contato, ficarei mais do que feliz em ouvir-lo";
const msgLose = "Sinto muito, tente novamente!";
const txtLose =
  "Não foi dessa vez!<br> A palavra da vez era: " +
  dictionary[palavraIndex].toUpperCase() +
  " <br> clique no botão abaixo para jogar novamente :D";
/* var termo = "MEXER"; */

/* teclado virtual */
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

/* Cria o tabuleiro para jogo */
function CreateGame(modo) {
  for (let i = 0; i < modo; i -= -1) {
    var gameSet = i;
    games[i] = document.createElement("div");
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const tileRow = document.createElement("div");
      tileRow.setAttribute("id", "game" + gameSet + "row" + rowIndex);
      tileRow.setAttribute("class", "tile-row");
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const tileColumn = document.createElement("div");
        tileColumn.setAttribute(
          "id",
          "game" + gameSet + "row" + rowIndex + "column" + columnIndex
        );
        tileColumn.setAttribute("class", "tile-column");
        tileRow.append(tileColumn);
      }
      games[i].append(tileRow);
      tiles.append(games[i]);
    }
  }
}

CreateGame(1);

/* função para mudar a cor das teclas do teclado virtual */
function changeKeyBoardColor(key, color) {
  var k = document.getElementById(key);
  k.classList.add(color);
  if (k.classList.contains("right")) {
    k.classList.remove("letter-used");
    k.classList.remove("displaced");
  } else if (k.classList.contains("displaced")) {
    k.classList.remove("letter-used");
  }
}

/* função para checar se a palavra existe  */
function checkWord(word) {
  var wordLowerCase = word.toLowerCase();
  if (dictionaryNoAccents.includes(wordLowerCase)) {
    wordIndex = dictionaryNoAccents.indexOf(wordLowerCase);
    return true;
  } else {
    return false;
  }
}

/* substitui o caractere de um index especifico */
String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  var chars = this.split("");
  chars[index] = replacement;
  return chars.join("");
};

/* Funções de teclado */
function handleBackspace() {
  if (activeCol == -1) {
    activeRow[4].classList.toggle("letter-focus");
    activeCol = 4;
  }

  var activeCell = document.getElementsByClassName("letter-focus");
  if (activeCell[0].childNodes.length == 0 && activeCol > 0) {
    activeRow[activeCol].classList.toggle("letter-focus");
    activeCol--;
    activeRow[activeCol].classList.toggle("letter-focus");
    var activeCell = document.getElementsByClassName("letter-focus");
  }
  activeCell[0].innerHTML = "";
}
function handleEnter() {
  var palavra = "";
  var termoEdit = termo;
  var answers = ["", "", "", "", ""];
  for (var x = 0; x < columns; x++) {
    palavra += activeRow[x].innerHTML;
  }

  if (palavra.length == 5)
    if (checkWord(palavra)) {
      {
        for (var x = 0; x < 5; x++) {
          if (palavra[x] == termoEdit[x]) {
            answers[x] = "right";
            changeKeyBoardColor(palavra[x], "right");
            termoEdit = termoEdit.replaceAt(x, "0");
          }
        }
        for (var x = 0; x < 5; x++) {
          if (termoEdit.includes(palavra[x]) && termoEdit[x] != "0") {
            answers[x] = "displaced";
            changeKeyBoardColor(palavra[x], "displaced");
            var letterIndex = termoEdit.indexOf(palavra[x]);
            termoEdit = termoEdit.replace(termoEdit[letterIndex], "1");
          } else if (!termoEdit.includes(palavra[x]) && termoEdit[x] != "0") {
            answers[x] = "wrong";
            if (!termo.includes(palavra[x]))
              changeKeyBoardColor(palavra[x], "letter-used");
          }
        }

        for (let i = 0; i < 5; i++) {
          const word = wordleDictionary[wordIndex].toUpperCase();
          const keyTile = activeRow[i];
          const color = answers[i];
          setTimeout(() => {
            keyTile.classList.add("animated");
            keyTile.innerHTML = word[i];
            keyTile.classList.add(color);
          }, i * 500);
        }

        setTimeout(() => {
          if (palavra == termo) {
            letterFocus(activeCol);
            setRow(activeRowIndex);
            changeEventListener("remove");
            document.getElementById("modalLabel").innerHTML = msgWin;
            document.getElementById("modal-txt").innerHTML = txtWin;
            document.getElementById("btn-modal").click();
          } else if (activeRowIndex == 5) {
            letterFocus(activeCol);
            setRow(activeRowIndex);
            changeEventListener("remove");
            document.getElementById("modalLabel").innerHTML = msgLose;
            document.getElementById("modal-txt").innerHTML = txtLose;
            document.getElementById("btn-modal").click();
          } else {
           var confirmRow1 = document.getElementById("game0row"+activeRowIndex+"column0")
           var confirmRow2 = document.getElementById("game0row"+activeRowIndex+"column2")
           var confirmRow3 = document.getElementById("game0row"+activeRowIndex+"column4")

            if(confirmRow1.innerHTML != "" && confirmRow2.innerHTML != "" && confirmRow3.innerHTML !=""){
            letterFocus(activeCol);
            setRow(activeRowIndex);
            activeCol = 0;
            changeEventListener("remove");
            activeRowIndex++;
            setRow(activeRowIndex);
            letterFocus(activeCol);
            changeEventListener("add");
            }}
        }, 5 * 510);
      }
    } else {
      const active = document.getElementById("palavraInvalida");
      setTimeout(() => {
        active.classList.remove("showMsg");
      }, 3000);
      active.classList.add("showMsg");
    }
}

function handleText(key) {
  var filled = 0;
  var activeCell = document.getElementsByClassName("letter-focus");
  activeCell[0].innerHTML = key;
  changeKey("forward");
  if (activeCell[0].innerHTML != "") {
    while (activeCell[0].innerHTML != "" && filled < 4) {
      filled++;
      changeKey("forward");
    }
    if (filled == 4) {
      letterFocus(activeCol);
      activeCol = -1;
    }
  }
}

/* define a linha da rodada */
function setRow(row) {
  for (let col = 0; col < columns; col++) {
    var active_columns = document.getElementById(
      "game0row" + row + "column" + col
    );
    active_columns.classList.toggle("typing");
  }
}

/* define a tecla em foco */
function letterFocus(x) {
  if (x > -1) {
    activeRow = document.querySelectorAll(".typing");
    activeRow[x].classList.toggle("letter-focus");
  }
}

function changeKey(type) {
  var emptyTiles = activeRow.length;
  if (activeCol > -1) letterFocus(activeCol);
  if (type == "backward") {
    activeCol--;
    if (activeCol < 0) activeCol = emptyTiles - 1;
  } else if (type == "forward") {
    activeCol++;
    if (activeCol > emptyTiles - 1) activeCol = 0;
  }
  letterFocus(activeCol);
}

/* event listeners do teclado*/
document.addEventListener("keydown", function (event) {
  /*  mover entre as teclas com o teclado  */

  switch (event.key) {
    case "ArrowRight":
      changeKey("forward");
      break;
    case "ArrowLeft":
      changeKey("backward");
      break;
    case "Backspace":
      handleBackspace();
      break;
    case "Enter":
      handleEnter();
      break;
  }

  var key = event.key.toUpperCase();
  if (
    key.length == 1 &&
    key.charCodeAt() >= 65 &&
    key.charCodeAt() <= 90 &&
    activeCol > -1
  ) {
    handleText(key);
  }
});

/* event listeners para mover entre as teclas com o mouse */
function changeEventListener(type) {
  activeRow.forEach((cel) => {
    if (type == "add") {
      cel.addEventListener("click", function handleClick(e) {
        var removeFocus = document.getElementsByClassName("letter-focus");
        if (removeFocus.length != 0) {
          if (removeFocus[0].id == this.id) {
          } else {
            removeFocus[0].classList.remove("letter-focus");
            document.getElementById(this.id).classList.add("letter-focus");
            var name = this.id;
            name = name.slice(-1);
            activeCol = parseInt(name);
          }
        } else {
          document.getElementById(this.id).classList.add("letter-focus");
          var name = this.id;
          name = name.slice(-1);
          activeCol = parseInt(name);
        }
      });
    } else if (type == "remove") cel.replaceWith(cel.cloneNode(true));
  });
}

/* cria as keys do teclado virtual  */
const createKeyboardRow = (keys, KeyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", function () {
      handleText(key);
    });
    KeyboardRow.appendChild(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
const delIcon = document.createElement("i");
/* delIcon.setAttribute('class', 'fa-solid ') */
delIcon.setAttribute("class", "fa-solid fa-delete-left ");
backspaceButton.appendChild(delIcon);
backspaceButton.setAttribute("id", "backspace-btn");
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button");
enterButton.addEventListener("click", handleEnter);
enterButton.textContent = "ENTER";
enterButton.setAttribute("id", "enter-btn");
backspaceAndEnterRow.append(enterButton);

setRow(activeRowIndex);
letterFocus(activeCol);
changeEventListener("add");

document.getElementById("btn-reload").addEventListener("click", function () {
  location.reload();
});

document.getElementById("iconTutorial").addEventListener("click", function () {
  document.getElementById("btn-modal-tutorial").click();
});
