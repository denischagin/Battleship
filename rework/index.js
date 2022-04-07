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

function makeDot (matrix, i, k) {
  if (k-1 >= 0 && i-1 >= 0 && matrix[i-1][k-1] === 0, ',') {
    matrix[i-1][k-1] = '.'
  }
  if (k+1 >= 0 && i-1 >= 0 && matrix[i-1][k+1] === 0, ','){
    matrix[i-1][k+1] = '.' 
  }
  if (k+1 >= 0 && i < 9 && matrix[i+1][k+1] === 0, ',') {
    matrix[i+1][k+1] = '.'
  }
  if (k-1 >= 0 && i < 9 && matrix[i+1][k-1] === 0, ',') {
    matrix[i+1][k-1] = '.'
  }
}

function makeComma (matrix, i, k) {
  if (k-1 >= 0 && matrix[i][k-1] === 0) {
    matrix[i][k-1] = ','
  }
  if (k+1 >= 0 && matrix[i][k+1] === 0) {
    matrix[i][k+1] = ',' 
  }
  if (i < 9 && matrix[i+1][k] === 0) {
    matrix[i+1][k] = ','
  }
  if (i > 1 && matrix[i-1][k] === 0) {
    matrix[i-1][k] = ','
  }
}

firstTable.onclick = function(e) {inputShips(e, matrixFirstPlayer)}

function inputShips(e, matrix) {
  let cell = e.target;
  if (cell.tagName.toLowerCase() != "td") return;
  console.log(cell)
  let i = cell.parentNode.rowIndex - 1;
  let k = cell.cellIndex - 1;
  console.log(i, k)
  // Если пустая клетка
  if (matrix[i][k] === 0) {
    cell.style.backgroundColor = 'rgba(0, 38, 255, 0.313)'
    matrix[i][k] = 1
    makeDot(matrix, i, k)
    makeComma(matrix, i, k)
    console.log(matrix)
    
  // Если запятая
  } else if (matrix[i][k] === ',') {
      cell.style.backgroundColor = 'rgba(0, 38, 255, 0.313)'
      matrix[i][k] = 1
      makeDot(matrix, i, k)
      makeComma(matrix, i, k)
      console.log(matrix)
  } else  {
    return
  }
}

printField(firstTable, firstScreen)
