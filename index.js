const firstTable = document.querySelector('.first-table')
const array = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К',]
let shipCount = 0
let countOfDecks = 1
let arrayShips = []
const textAboutShips = document.querySelector('.text')
console.log(textAboutShips)
const matrixFirstPlayer = [
    [3 ,3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [3 , 3 ,3 ,3 ,3 ,3 , 3 ,3 ,3 ,3],
]
const coloringField = (matrix) => {
    for (let i = 0; i < 11; i++) {
        const tr = firstTable.children[i]
        for (let k = 0; k < 11; k++) {
            const td = firstTable.children[i].children[k]
            // Если у нас заполненная клетка то мы ее красим
            if (matrix[i][k] === 1) {
                td.classList.remove('bg-white')
                td.classList.add('bg-coral')
                td.textContent = ''
            }
            // Если не заполннаная красим в белый цвет
            if (matrix[i][k] === 0) {
                td.classList.remove('bg-coral')
                td.classList.add('bg-white')
                td.textContent = ''
            }
            // Если точка то выводим точку
            if (matrix[i][k] === '.' || matrix[i][k] === ',') {
                td.textContent = '.'
            }

            // Заливка белым ненужных элементов
            if (i === 0 || k === 0) {
                td.style.background = 'white'
                td.style.border = '0'
            }
            // Вывод цифр
            if (i === 0 && k > 0) {
                td.textContent = k
            }
            // Вывод букв
            if (k === 0 && i > 0) {
                td.textContent = array[i-1]
            }
        }
    }
}

// Создает елементы из таблицы
const printField = (table) => {
    for (let i = 0; i < 11; i++) {
        const tr = document.createElement('tr')
        for (let k = 0; k < 11; k++) {
            const td  = document.createElement('td')
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

printField(firstTable)
coloringField(matrixFirstPlayer)
firstTable.addEventListener('click', (e) => {
    let cell = e.target;
    if (cell.tagName.toLowerCase() != 'td') return;
    let i = cell.parentNode.rowIndex;
    let k = cell.cellIndex;
    if (matrixFirstPlayer[i][k] === 0) {

        if (shipCount !== 0) {
            arrayShips.push(countOfDecks + 1)
            console.log(arrayShips)
        }
        countOfDecks = 0
        // Заполнение точек и запятых вокруг
        // Если стоит точка то мы не можем заполнять 
        // Если запятая то можем
        if (shipCount !== 0) {
            for (let i = 0; i < 11; i++) {
                for (let k = 0; k < 11; k++) {
                    if (matrixFirstPlayer[i][k] === ',') {
                        matrixFirstPlayer[i][k] = '.'
                    }
                }
            }
        }

        if (matrixFirstPlayer[i-1][k] === '.') {
            matrixFirstPlayer[i-1][k] = '.'
        } else {matrixFirstPlayer[i-1][k] = ','}

        if (matrixFirstPlayer[i][k-1] === '.') {
            matrixFirstPlayer[i][k-1] = '.'
        } else {matrixFirstPlayer[i][k-1] = ','}

        if (matrixFirstPlayer[i+1][k] === '.') {
            matrixFirstPlayer[i+1][k] = '.'
        } else {matrixFirstPlayer[i+1][k] = ','}

        if (matrixFirstPlayer[i][k+1] === '.') {
            matrixFirstPlayer[i][k+1] = '.'
        } else {matrixFirstPlayer[i][k+1] = ','}

        matrixFirstPlayer[i][k] = 1
        matrixFirstPlayer[i+1][k+1] = '.'
        matrixFirstPlayer[i+1][k-1] = '.'
        matrixFirstPlayer[i-1][k+1] = '.'
        matrixFirstPlayer[i-1][k-1] = '.'
        
        shipCount += 1
        console.log('Количество кораблей - ', shipCount)

    } 
    // else if (matrixFirstPlayer[i][k] === 1) {
    //     matrixFirstPlayer[i][k] = 0
    //     console.log('Нажата заполненная клетка')
    // } 
    else if (matrixFirstPlayer[i][k] === ',') {
        if (countOfDecks  === 3) {
            return
        }
        
        countOfDecks += 1
        if (matrixFirstPlayer[i][k-1] === 1) {
            matrixFirstPlayer[i][k] = 1
            matrixFirstPlayer[i][k+1] = ','
            matrixFirstPlayer[i+1][k] = '.'
            matrixFirstPlayer[i-1][k] = '.'
        }

        if (matrixFirstPlayer[i][k+1] === 1) {
            matrixFirstPlayer[i][k] = 1
            matrixFirstPlayer[i][k-1] = ','
            matrixFirstPlayer[i+1][k] = '.'
            matrixFirstPlayer[i-1][k] = '.'
        }

        if (matrixFirstPlayer[i-1][k] === 1) {
            matrixFirstPlayer[i][k] = 1
            matrixFirstPlayer[i+1][k] = ','
            matrixFirstPlayer[i][k-1] = '.'
            matrixFirstPlayer[i][k+1] = '.'
        }
        if (matrixFirstPlayer[i+1][k] === 1) {
            matrixFirstPlayer[i][k] = 1
            matrixFirstPlayer[i-1][k] = ','
            matrixFirstPlayer[i][k-1] = '.'
            matrixFirstPlayer[i][k+1] = '.'
        }

        matrixFirstPlayer[i+1][k+1] = '.'
        matrixFirstPlayer[i-1][k+1] = '.'
        matrixFirstPlayer[i+1][k-1] = '.'
        matrixFirstPlayer[i-1][k-1] = '.'
    }
    if (arrayShips.length === 0) {
        let p = document.createElement('p');
        p.textContent = 'Сейчас вы вводите корабль с ' + (countOfDecks + 1) + ' палубами(ой)'
        textAboutShips.insertAdjacentElement('afterbegin', p)
    }
    console.log(textAboutShips.firstElementChild)
    try {
        while (textAboutShips.firstChild) {
            textAboutShips.firstElementChild.remove()
    }} catch (error ){
        console.log(error)
    }
    if (1 - arrayShips.filter((el) => el === 4).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 4х палубных кораблей</p> <br>` )
    }
    if (2 - arrayShips.filter((el) => el === 3).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 3х палубных кораблей</p> <br>` )
    }
    if (3 - arrayShips.filter((el) => el === 2).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 2х палубных кораблей</p> <br>` )
    }
    if (4 - arrayShips.filter((el) => el === 1).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 1-палубных кораблей</p> <br>` )
    }
    textAboutShips.insertAdjacentHTML('afterbegin', `
    <p>Вы сейчас вводите корабль с ${countOfDecks + 1} палубами</p> <br>
    <p>Вам осталось ввести ${1 - arrayShips.filter((el) => el === 4).length >= 0 ? 1 - arrayShips.filter((el) => el === 4).length : 'неправильное количество'} корабль(ей) с 4 палубами</p> <br>
    <p>Вам осталось ввести ${2 - arrayShips.filter((el) => el === 3).length >= 0 ? 2 - arrayShips.filter((el) => el === 3).length : 'неправильное количество'} корабль(ей) с 3 палубами</p> <br>
    <p>Вам осталось ввести ${3 - arrayShips.filter((el) => el === 2).length >= 0 ? 3 - arrayShips.filter((el) => el === 2).length : 'неправильное количество'} корабль(ей) с 2 палубами</p> <br>
    <p>Вам осталось ввести ${4 - arrayShips.filter((el) => el === 1).length >= 0 ? 4 - arrayShips.filter((el) => el === 1).length : 'неправильное количество'} корабль(ей) с 1 палубами</p> <br>
    `)
    console.log('Количество палуб - ', countOfDecks + 1)
    console.log(matrixFirstPlayer)
    coloringField(matrixFirstPlayer)      
  }
)