const screen = document.querySelector(".screen");
const firstTable = document.querySelector(".first-table");
const secondTable = document.querySelector(".second-table");
const arrayABC = ["К", "И", "З", "Ж", "Е", "Д", "Г", "В", "Б", "А"];
const firstScreen = document.querySelector(".first-screen");
const secondScreen = document.querySelector(".second-screen");
const buttonClear = document.querySelector(".button1");
const buttonNext = document.querySelector(".button");
const buttonClear1 = document.querySelector(".button1-1");
const buttonNext1 = document.querySelector(".button-1");
let arrayShips = [];
let countOfDecks = 0;
const elementsFsText = document.querySelectorAll(".count-of-decks");
const elementsScText = document.querySelectorAll(".count-of-decks-1");
let matrixFirstPlayer = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let matrixSecondPlayer = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function printField(table, screen) {
  firstScreen.style.display = "flex";
  screen.insertAdjacentElement("beforeend", table);
  for (let i = 0; i < 11; i++) {
    const tr = document.createElement("tr");
    for (let k = 0; k < 11; k++) {
      const td = document.createElement("td");
      if (i === 10 && k > 0) {
        td.textContent = k;
      }
      if (i < 10 && k === 0) {
        td.textContent = arrayABC[i];
      }
      tr.appendChild(td);
    }
    table.insertAdjacentElement("afterbegin", tr);
  }
}

function changeElementMatrixOn(matrix, valueOld, valueNew) {
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      if (matrix[i][k] === valueOld) {
        matrix[i][k] = valueNew;
      }
    }
  }
}

function makeDots(matrix, i, k) {
  if (
    matrix[i - 1] !== undefined &&
    matrix[i - 1][k - 1] !== undefined &&
    matrix[i - 1][k - 1] !== undefined
  ) {
    matrix[i - 1][k - 1] = ".";
  }
  if (
    matrix[i + 1] !== undefined &&
    matrix[i + 1][k - 1] !== undefined &&
    matrix[i + 1][k - 1] !== undefined
  ) {
    matrix[i + 1][k - 1] = ".";
  }
  if (
    matrix[i - 1] !== undefined &&
    matrix[i - 1][k + 1] !== undefined &&
    matrix[i - 1][k + 1] !== undefined
  ) {
    matrix[i - 1][k + 1] = ".";
  }
  if (
    matrix[i + 1] !== undefined &&
    matrix[i + 1][k + 1] !== undefined &&
    matrix[i + 1][k + 1] !== undefined
  ) {
    matrix[i + 1][k + 1] = ".";
  }
}

function makeCommas(matrix, i, k) {
  if (
    matrix[i][k - 1] !== undefined &&
    matrix[i][k - 1] !== 1 &&
    matrix[i][k - 1] !== "."
  ) {
    matrix[i][k - 1] = ",";
  }
  if (
    matrix[i][k + 1] !== undefined &&
    matrix[i][k + 1] !== 1 &&
    matrix[i][k + 1] !== "."
  ) {
    matrix[i][k + 1] = ",";
  }
  if (
    matrix[i - 1] !== undefined &&
    matrix[i - 1][k] !== 1 &&
    matrix[i - 1][k] !== "."
  ) {
    matrix[i - 1][k] = ",";
  }
  if (
    matrix[i + 1] !== undefined &&
    matrix[i + 1][k] !== 1 &&
    matrix[i + 1][k] !== "."
  ) {
    matrix[i + 1][k] = ",";
  }
}

function printTextOnP(elementText) {
  elementText[0].textContent =
    1 - arrayShips.filter((el) => el === 4).length >= 0
      ? 1 - arrayShips.filter((el) => el === 4).length + " шт. с 4 палубами"
      : "много 4х-палубных";

  elementText[1].textContent =
    2 - arrayShips.filter((el) => el === 3).length >= 0
      ? 2 - arrayShips.filter((el) => el === 3).length + " шт. с 3 палубами"
      : "много 3х-палубных";

  elementText[2].textContent =
    3 - arrayShips.filter((el) => el === 2).length >= 0
      ? 3 - arrayShips.filter((el) => el === 2).length + " шт. с 2 палубами"
      : "много 2х-палубных";

  elementText[3].textContent =
    4 - arrayShips.filter((el) => el === 1).length >= 0
      ? 4 - arrayShips.filter((el) => el === 1).length + " шт. с 1 палубой"
      : "много 1-палубных";
}
function clearing(matrix, table, el) {
  countOfDecks = 0;
  arrayShips.length = 0;
  changeElementMatrixOn(matrix, 1, 0);
  changeElementMatrixOn(matrix, ",", 0);
  changeElementMatrixOn(matrix, ".", 0);
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      table.children[i + 1].children[k + 1].style.backgroundColor = "#ffffff";
    }
  }
  printTextOnP(el);
}

// Функция для нажатия на ячейку
function inputShips(e, matrix, el) {
  let cell = e.target;
  if (cell.tagName.toLowerCase() != "td") return;
  let i = cell.parentNode.rowIndex - 1;
  let k = cell.cellIndex - 1;
  // Если пустая клетка
  if (matrix[i][k] === 0) {
    cell.style.backgroundColor = "rgba(0, 38, 255, 0.313)";
    matrix[i][k] = 1;
    if (countOfDecks != 0) {
      // Заменяет запятые на точки
      changeElementMatrixOn(matrix, ",", ".");
    }
    makeDots(matrix, i, k);
    makeCommas(matrix, i, k);
    countOfDecks = 1;
    arrayShips.push(countOfDecks);
    printTextOnP(el);
    // Если запятая
  } else if (matrix[i][k] === ",") {
    if (countOfDecks === 4) {
      return;
    }
    cell.style.backgroundColor = "rgba(0, 38, 255, 0.313)";
    matrix[i][k] = 1;
    makeDots(matrix, i, k);
    makeCommas(matrix, i, k);
    arrayShips.pop();
    countOfDecks += 1;
    arrayShips.push(countOfDecks);
    printTextOnP(el);
  } else {
    return;
  }
}
buttonClear.onclick = () =>
  clearing(matrixFirstPlayer, firstTable, elementsFsText);
buttonNext.onclick = () => {
  if (
    4 - arrayShips.filter((el) => el === 1).length === 0 &&
    3 - arrayShips.filter((el) => el === 2).length === 0 &&
    2 - arrayShips.filter((el) => el === 3).length === 0 &&
    1 - arrayShips.filter((el) => el === 4).length === 0
  ) {
    firstScreen.remove();
    secondScreen.style.display = "flex";
    printField(secondTable, secondScreen);
    countOfDecks = 0;
    arrayShips.length = 0;
    printTextOnP(elementsScText);
  }
};

function playing() {
  var screenPlaying = document.createElement("div");
  var tableForPlaying1 = document.createElement("table");
  var tableForPlaying2 = document.createElement("table");
  const h1 = document.createElement("h1");
  h1.textContent = "Игра";

  screenPlaying.classList.add("screen-for-playing");
  screen.appendChild(screenPlaying);

  screenPlaying.appendChild(h1);
  screenPlaying.appendChild(tableForPlaying1);
  screenPlaying.appendChild(tableForPlaying2);

  printField(tableForPlaying1, screenPlaying);
  printField(tableForPlaying2, screenPlaying);

  changeElementMatrixOn(matrixFirstPlayer, ',', '.')
  setTimeout(() => {alert('Начинает ходить второй игрок')}, 50)
  const playingNow = (matrix, i, k, count, cell) => {
    if (matrix[i][k] === 1) {
        if (
          (matrix[i][k - 1]
            ? matrix[i][k - 1] === "X"
            : false) ||
          (matrix[i][k - 1]
            ? matrix[i][k - 1] === 1
            : false) ||
          (matrix[i][k + 1]
            ? matrix[i][k + 1] === "X"
            : false) ||
          (matrix[i][k + 1]
            ? matrix[i][k + 1] === 1
            : false)) {
          let j = i
          let l = k
          while (matrix[j][l] !== '.' && matrix[j][l] !== undefined) {
            l = l-1
            if (matrix[j][l] === 1) {count++}
          }
          j = i
          l = k
          while (matrix[j][l] !== '.' && matrix[j][l] !== undefined) {
            l = l+1
            if (matrix[j][l] === 1) {count++}
          }
          if (count === 0) {
            setTimeout(() => {alert('Убил')}, 50) 
            if (isFirstPlayer === true) {
              countShipsPlayer1++
            } else {countShipsPlayer2++}
          } else {
            setTimeout(() => {alert('Попал')}, 50) 
          } 
        } else if (
          (matrix[i + 1]
            ? matrix[i + 1][k] === "X"
            : false) ||
          (matrix[i + 1]
            ? matrix[i + 1][k] === 1
            : false) ||
          (matrix[i - 1]
            ? matrix[i - 1][k] === "X"
            : false) ||
          (matrix[i - 1] ? matrix[i - 1][k] === 1 : false)
        ) {
          let j = i
          let l = k
          while (matrix[j-1] !== undefined && matrix[j][l] !== '.') {
            j = j-1
            if (matrix[j][l] === 1) {count++}
          }
          j = i+1
          l = k
          while (matrix[j] !== undefined && matrix[j][l] !== '.' ) {
            if (matrix [j][l] === 1) {count++}
            j = j+1
          }
          if (count === 0) {
            setTimeout(() => {alert('Убил')}, 50) 
            if (isFirstPlayer === true) {
              countShipsPlayer1++
            } else {countShipsPlayer2++}
          } else {
            setTimeout(() => {alert('Попал')}, 50) 
          } 
        }
        else {
          setTimeout(() => {alert('Убил')}, 50) 
          if (isFirstPlayer === true) {
            countShipsPlayer1++
          } else {countShipsPlayer2++}
        }
        cell.textContent = "X";
        matrix[i][k] = "X";
      } else if (matrix[i][k] === 0 || matrix[i][k] === '.') {
        cell.style.background = "rgba(0, 38, 255, 0.213)";
        matrix[i][k] = ".";
        isFirstPlayer = !isFirstPlayer;
        alert('Промах')
      } 
      if (countShipsPlayer2 === 10) {
        alert('Победил второй игрок')
        document.location.reload()
      }else if (countShipsPlayer1 === 10) {
        alert('Победил первый игрок игрок')
        document.location.reload()
      }

  }

  tableForPlaying1.onclick = (e) => {
    let cell = e.target;
    if (cell.tagName.toLowerCase() != "td") return;
    let i = cell.parentNode.rowIndex - 1;
    let k = cell.cellIndex - 1;
    let count = 0
    if (isFirstPlayer === true) {
      playingNow(matrixFirstPlayer, i, k, count, cell)
      
    }
  };
  tableForPlaying2.onclick = (e) => {
    let cell = e.target;
    if (cell.tagName.toLowerCase() != "td") return;
    let i = cell.parentNode.rowIndex - 1;
    let k = cell.cellIndex - 1;
    let count = 0
    if (isFirstPlayer === false) {
      playingNow(matrixSecondPlayer, i, k, count, cell)
      
    }
  };
}

secondTable.onclick = (e) => inputShips(e, matrixSecondPlayer, elementsScText);
buttonClear1.onclick = () =>
  clearing(matrixSecondPlayer, secondTable, elementsScText);
buttonNext1.onclick = (e) => {
  if (
    4 - arrayShips.filter((el) => el === 1).length === 0 &&
    3 - arrayShips.filter((el) => el === 2).length === 0 &&
    2 - arrayShips.filter((el) => el === 3).length === 0 &&
    1 - arrayShips.filter((el) => el === 4).length === 0
  ) {
    e.target.parentNode.remove();
    playing();
  }
};

firstTable.onclick = function (e) {
  inputShips(e, matrixFirstPlayer, elementsFsText);
};

let countShipsPlayer1 = 0
let countShipsPlayer2 = 0

printField(firstTable, firstScreen);
isFirstPlayer = true;
// setTimeout(() => {alert('Игра "Морской бой \n Данная игра предусмотрена на двух игроков \n Чтобы ввести корбаль нужно щелкать ЛКМ по ячейке таблицы \n Если вы ввели что то неправильно, то нажмите кнопку "Очистить" \n Чтобы ввести корбали для второго игрока нажмите на кнопку "Далее"')
// }, 50)