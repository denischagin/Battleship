const firstTable = document.querySelector(".first-table");
const arrayABC = ["К", "И","З","Ж","Е","Д","Г","В","Б","А"];
const firstScreen = document.querySelector(".first-screen");
const secondScreen = document.querySelector(".second-screen");
let arrayShips = [];
let countOfDecks = 0;

const matrixFirstPlayer = [
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

function coloringField(matrix, table) {
  for (let i = 0; i < 11; i++) {
    const tr = table.children[i]
  }
    for (let k = 0; k < 11; k++) {
        const td = table.children[i].children[k]
      }
}

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

firstTable.onclick = function(e) {inputShips(e, matrixFirstPlayer)}

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
  // Если запятая
  } else if (matrix[i][k] === ',') {
      cell.style.backgroundColor = 'rgba(0, 38, 255, 0.313)'
      matrix[i][k] = 1
      makeDot(matrix, i, k)
      makeComma(matrix, i, k)
      console.log(matrix)
      arrayShips.pop()
      countOfDecks += 1
      arrayShips.push(countOfDecks )
  } else  {
    return
  }
  console.log(countOfDecks)
  console.log(arrayShips)
}

printField(firstTable, firstScreen)
