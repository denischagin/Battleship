const firstTable = document.querySelector(".first-table");
const arrayABC = ["К", "И","З","Ж","Е","Д","Г","В","Б","А"];
const firstScreen = document.querySelector(".first-screen");
const secondScreen = document.querySelector(".second-screen");
const buttonClear = document.querySelector('.button1')
let arrayShips = [];
let countOfDecks = 0;
const elementsFsText = document.querySelectorAll('.count-of-decks-fs')


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

let matrixSecondPlayer = Object.assign([], matrixFirstPlayer)

function printField(table, screen) {
  firstScreen.style.display = 'flex'
  screen.appendChild(table)
  for (let i = 0; i < 11; i++) {
    const tr = document.createElement('tr')
    for (let k = 0; k < 11; k++) {
      const td  = document.createElement('td')
      if (i === 10 && k>0) {
        td.textContent = k 
      } if (i < 10 && k === 0) {
        td.textContent = arrayABC[i]
      } 
      tr.appendChild(td)
    }
    table.insertAdjacentElement('afterbegin', tr)
  }
}

function changeElementMatrixOn(matrix, value, valueNew) {
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
        if (matrix[i][k] === value) {
            matrix[i][k] = valueNew
        }
    }
  }
}

function makeDot (matrix, i, k) {
  if (matrix[i-1] !== undefined 
    && matrix[i-1][k-1] !== undefined 
    && matrix[i-1][k-1] !== undefined) {
      matrix[i-1][k-1] = '.'
    }
  if (matrix[i+1] !== undefined 
    && matrix[i+1][k-1] !== undefined 
    && matrix[i+1][k-1] !== undefined) {
      matrix[i+1][k-1] = '.'
    }
  if (matrix[i-1] !== undefined 
    && matrix[i-1][k+1] !== undefined 
    && matrix[i-1][k+1] !== undefined) {
      matrix[i-1][k+1] = '.'
    }
  if (matrix[i+1] !== undefined 
    && matrix[i+1][k+1] !== undefined 
    && matrix[i+1][k+1] !== undefined) {
      matrix[i+1][k+1] = '.'
    }
}

function makeComma (matrix, i, k) {
  if (matrix[i][k-1] !== undefined
    && matrix[i][k-1] !== 1
    && matrix[i][k-1] !== '.'
    ) {
    matrix[i][k-1] = ','
  }
  if (matrix[i][k+1] !== undefined
    && matrix[i][k+1] !== 1
    && matrix[i][k+1] !== '.'
    ) {
    matrix[i][k+1] = ','
  }
  if (matrix[i-1] !== undefined
    && matrix[i-1][k] !== 1
    && matrix[i-1][k] !== '.' 
    ) {
    matrix[i-1][k] = ','
  }
  if (matrix[i+1] !== undefined
    && matrix[i+1][k] !== 1
    && matrix[i+1][k] !== '.'
    ) {
    matrix[i+1][k] = ','
  }
}

function printTextOnP (elementText) {
  elementText[0].textContent =
    1 - arrayShips.filter((el) => el === 4).length >= 0
      ? 1 - arrayShips.filter((el) => el === 4).length + " шт. с 4 палубами"
      : "много 4х палубных кораблей";

  elementText[1].textContent =
    2 - arrayShips.filter((el) => el === 3).length >= 0
      ? 2 - arrayShips.filter((el) => el === 3).length + " шт. с 3 палубами"
      : "много 3х палубных кораблей";

  elementText[2].textContent =
    3 - arrayShips.filter((el) => el === 2).length >= 0
      ? 3 - arrayShips.filter((el) => el === 2).length + " шт. с 2 палубами"
      : "много 2х палубных кораблей";

  elementText[3].textContent =
    4 - arrayShips.filter((el) => el === 1).length >= 0
      ? 4 - arrayShips.filter((el) => el === 1).length + " шт. с 1 палубой"
      : "много 1-палубных кораблей";
}
function clearing (matrix, table) {
  countOfDecks = 0
  arrayShips.length = 0
  changeElementMatrixOn(matrix, 1, 0)
  changeElementMatrixOn(matrix, ',', 0)
  changeElementMatrixOn(matrix, '.', 0)
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++){
      table.children[i+1].children[k+1].style.backgroundColor = 'white'
    }
  }
  printTextOnP (elementsFsText)
}

// Функция для нажатия на ячейку
function inputShips(e, matrix) {
  let cell = e.target;
  if (cell.tagName.toLowerCase() != "td") return;
  let i = cell.parentNode.rowIndex - 1;
  let k = cell.cellIndex - 1;
  // Если пустая клетка
  if (matrix[i][k] === 0) {
    cell.style.backgroundColor = 'rgba(0, 38, 255, 0.313)'
    matrix[i][k] = 1
    if (countOfDecks != 0) {
      // Заменяет запятые на точки
      changeElementMatrixOn(matrix, ',', '.')
    }
    makeDot(matrix, i, k)
    makeComma(matrix, i, k)
    console.log(matrix)
    countOfDecks = 1
    arrayShips.push(countOfDecks)
    printTextOnP(elementsFsText)
  // Если запятая
  } else if (matrix[i][k] === ',') {
      if (countOfDecks === 4) {
        return
      }
      cell.style.backgroundColor = 'rgba(0, 38, 255, 0.313)'
      matrix[i][k] = 1
      makeDot(matrix, i, k)
      makeComma(matrix, i, k)
      console.log(matrix)
      arrayShips.pop()
      countOfDecks += 1
      arrayShips.push(countOfDecks)
      printTextOnP(elementsFsText)
  } else  {
    return
  }
  console.log(countOfDecks)
  console.log(arrayShips)
}
buttonClear.onclick = () => {
  clearing(matrixFirstPlayer, firstTable)
}

firstTable.onclick = function(e) {inputShips(e, matrixFirstPlayer)}
printField(firstTable, firstScreen)
