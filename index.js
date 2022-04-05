const firstTable = document.querySelector('.first-table')
const array = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К',]
const matrixFirstPlayer = [
    [NaN ,NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
    [NaN ,'.',   1,  '.', 0, 0, 0, 0, 0, 0, 0],
    [NaN ,'.',   1,  '.', 0, 0, 0, 0, 0, 0, 0],
    [NaN ,'.',   1,  '.', 0, 0, 0, 0, 0, 0, 0],
    [NaN ,'.',   1,  '.', 0, 0, 0, 0, 0, 0, 0],
    [NaN ,'.',   '.', '.', 0, 0, 0, 0, 0, 0, 0],
    [NaN ,0,      0,  0, 0, 0, 0, 0, 0, 0, 0],
    [NaN ,0,      0,  0, 0, 0, 0, 0, 0, 0, 0],
    [NaN ,0,      0,  0, 0, 0, 0, 0, 0, 0, 0],
    [NaN ,0,      0,  0, 0, 0, 0, 0, 0, 0, 0],
    [NaN ,0,      0,  0, 0, 0, 0, 0, 0, 0, 0],
]

const coloringField = (matrix) => {
    for (let i = 0; i < 11; i++) {
        const tr = firstTable.children[i]
        for (let k = 0; k < 11; k++) {
            const td = firstTable.children[i].children[k]
            if (matrix[i][k] === 1) {
                td.classList.remove('bg-white')
                td.classList.add('bg-coral')
            }
            if (matrix[i][k] === 0) {
                td.classList.remove('bg-coral')
                td.classList.add('bg-white')
            }

            if (matrix[i][k] === '.') {
                td.textContent = '.'
            }
            
            if (i === 0 || k === 0) {
                td.style.background = 'white'
                td.style.border = '0'
            }
            if (i === 0 && k > 0) {
                td.textContent = k
            }
            if (k === 0 && i > 0) {
                td.textContent = array[i-1]
            }
        }
    }
}


const printField = (matrix) => {
    for (let i = 0; i < 11; i++) {
        const tr = document.createElement('tr')
        for (let k = 0; k < 11; k++) {
            const td  = document.createElement('td')
            tr.appendChild(td)
        }
        firstTable.appendChild(tr)
    }
}


printField(matrixFirstPlayer)
coloringField(matrixFirstPlayer)



firstTable.addEventListener('click', (e) => {
    let cell = e.target;
    if (cell.tagName.toLowerCase() != 'td') return;
    let i = cell.parentNode.rowIndex;
    let k = cell.cellIndex;
    if (matrixFirstPlayer[i][k] === 0) {
        matrixFirstPlayer[i][k] = 1
    } else if (matrixFirstPlayer[i][k] === 1) {
        matrixFirstPlayer[i][k] = 0
    }
    coloringField(matrixFirstPlayer)
        
  }
)