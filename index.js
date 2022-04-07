const firstTable = document.querySelector('.first-table')
const array = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К',]
let shipCount = 0
let countOfDecks = 1
let arrayShips = []
let matrixSecondPlayer = []
const buttonSubmit = document.querySelector('.button')
const textAboutShips = document.querySelector('.text')
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
const coloringField = (matrix, table) => {
    for (let i = 0; i < 11; i++) {
        const tr = table.children[i]
        for (let k = 0; k < 11; k++) {
            const td = table.children[i].children[k]
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
        table.insertAdjacentElement('afterbegin', tr)
    }
}

const inputShips = (e, matrixFirstPlayer) => 
{
    let cell = e.target;
    if (cell.tagName.toLowerCase() != 'td') return;
    let i = cell.parentNode.rowIndex;
    let k = cell.cellIndex;
    // Нажание на кнопку сброса
    document.querySelector('.button1').onclick = () => {
        arrayShips.length = 0
        countOfDecks = ''
        while (firstTable.firstElementChild) {
            firstTable.firstElementChild.remove()
        }
        for (let i = 0; i < 12; i++) {
            for (let k = 0; k < 12; k++) {
                if (matrixFirstPlayer[i][k] !== 3) {
                    matrixFirstPlayer[i][k] = 0
                }
            }
        }
        printField(firstTable)
        coloringField(matrixFirstPlayer, firstTable)
        textAboutShips.innerHTML =  `
            <p>Вы сейчас вводите корабль с ${countOfDecks + 1} палубами</p> <br>
            <strong>Осталось: </strong> <br>
            <p> ${1 - arrayShips.filter((el) => el === 4).length >= 0 
                ? 1 - arrayShips.filter((el) => el === 4).length : '-'} шт. с 4 палубами</p> <br>
            <p> ${2 - arrayShips.filter((el) => el === 3).length >= 0 
                ? 2 - arrayShips.filter((el) => el === 3).length : '-'} шт. с 3 палубами</p> <br>
            <p> ${3 - arrayShips.filter((el) => el === 2).length >= 0 
                ? 3 - arrayShips.filter((el) => el === 2).length : '-'} шт. с 2 палубами</p> <br>
            <p> ${4 - arrayShips.filter((el) => el === 1).length >= 0 
                ? 4 - arrayShips.filter((el) => el === 1).length : '-'} шт. с 1 палубой</p> <br>
            `
            return
    }
    // Нажатие на кнопку далее
    document.querySelector('.button').onclick = () => {
        // количество кораблей = 10
        if (arrayShips.length !== 9 
            ) { 
                textAboutShips.innerHTML =  `
                <p>Вы сейчас вводите корабль с ${countOfDecks + 1} палубами</p> <br>
                <strong>Осталось: </strong> <br>
    
                <p> ${1 - arrayShips.filter((el) => el === 4).length >= 0 
                    ? 1 - arrayShips.filter((el) => el === 4).length : '-'} шт. с 4 палубами</p> <br>
                <p> ${2 - arrayShips.filter((el) => el === 3).length >= 0 
                    ? 2 - arrayShips.filter((el) => el === 3).length : '-'} шт. с 3 палубами</p> <br>
                <p> ${3 - arrayShips.filter((el) => el === 2).length >= 0 
                    ? 3 - arrayShips.filter((el) => el === 2).length : '-'} шт. с 2 палубами</p> <br>
                <p> ${4 - arrayShips.filter((el) => el === 1).length >= 0 
                    ? 4 - arrayShips.filter((el) => el === 1).length : '-'} шт. с 1 палубой</p> <br>
                    <p style='color : red'>Вы ввели неправильное кол-во кораблей</p> <br>
                `
            return
        } else if ((4 - arrayShips.filter((el) => el === 1).length >= 0) 
        && (4 - arrayShips.filter((el) => el === 2).length >= 1) 
        && (4 - arrayShips.filter((el) => el === 3).length >= 2)
        && (4 - arrayShips.filter((el) => el === 1).length >= 3)  ) {
            textAboutShips.innerHTML =  `
            <p>Вы сейчас вводите корабль с ${countOfDecks + 1} палубами</p> <br>
            <strong>Осталось: </strong> <br>
    
            <p> ${1 - arrayShips.filter((el) => el === 4).length >= 0 
                ? 1 - arrayShips.filter((el) => el === 4).length : '-'} шт. с 4 палубами</p> <br>
            <p> ${2 - arrayShips.filter((el) => el === 3).length >= 0 
                ? 2 - arrayShips.filter((el) => el === 3).length : '-'} шт. с 3 палубами</p> <br>
            <p> ${3 - arrayShips.filter((el) => el === 2).length >= 0 
                ? 3 - arrayShips.filter((el) => el === 2).length : '-'} шт. с 2 палубами</p> <br>
            <p> ${4 - arrayShips.filter((el) => el === 1).length >= 0 
                ? 4 - arrayShips.filter((el) => el === 1).length : '-'} шт. с 1 палубой</p> <br>
                <p style='color : red'>Вы ввели неправильное кол-во кораблей</p> <br>
            `
            return
        }
        if (shipCount !== 0) {  
            arrayShips.push(countOfDecks + 1)
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

        // Располажение вокруг точками или запятыми
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
        

        matrixSecondPlayer = Object.assign([], matrixFirstPlayer);
        makeSecondTable(matrixSecondPlayer) 
        console.log(matrixSecondPlayer)
        document.querySelector('.first-screen').remove()
    }
        // Нажатие на пустую клетку
    if (matrixFirstPlayer[i][k] === 0) {
        
    
        // К количеству кораблей прибаляем только если добавляется новый корабль
        if (shipCount !== 0) {
            arrayShips.push(countOfDecks + 1)
            if (countOfDecks === '') {
                arrayShips.splice(0, 1)
            }
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
        // Располажение точек и запятых вокруг корабля
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

    } 
    // else if (matrixFirstPlayer[i][k] === 1) {
    //     matrixFirstPlayer[i][k] = 0
    //     console.log('Нажата заполненная клетка')
    // } 
    
    // Если в поле запятая
    else if (matrixFirstPlayer[i][k] === ',') {
        countOfDecks += 1
        // Если у нас введено 4 клетки то мы больше уже не можем ввести
        if (countOfDecks  === 4) {
            return
        }
        
        // Располажение точек, запятых и заполненных клеток вокруг 
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
    
    // Вводим элемент в самом начале программы
    if (arrayShips.length === 0) {
        let p = document.createElement('p');
        p.textContent = 'Сейчас вы вводите корабль с ' + (countOfDecks + 1) + ' палубами(ой)'
        textAboutShips.insertAdjacentElement('afterbegin', p)
    }
    try {
        // Удаляем все элементы, чтобы добавить новые
        while (textAboutShips.firstChild) {
            textAboutShips.firstElementChild.remove()
    }} catch (error ){
    }
    if (1 - arrayShips.filter((el) => el === 4).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 4х палубных кораблей, нажмите сбросить</p> <br>` )
    }
    if (2 - arrayShips.filter((el) => el === 3).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 3х палубных кораблей, нажмите сбросить</p> <br>` )
    }
    if (3 - arrayShips.filter((el) => el === 2).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 2х палубных кораблей, нажмите сбросить</p> <br>` )
    }
    if (4 - arrayShips.filter((el) => el === 1).length < 0) {
        textAboutShips.insertAdjacentHTML('afterbegin', `<p style='color : red'>Вы ввели много 1-палубных кораблей, нажмите сбросить</p> <br>` )
    }
    textAboutShips.insertAdjacentHTML('afterbegin', `
    <p>Вы сейчас вводите корабль с ${countOfDecks + 1} палубами</p> <br>
    <strong>Осталось: </strong> <br>

    <p> ${1 - arrayShips.filter((el) => el === 4).length >= 0 
        ? 1 - arrayShips.filter((el) => el === 4).length : '-'} шт. с 4 палубами</p> <br>
    <p> ${2 - arrayShips.filter((el) => el === 3).length >= 0 
        ? 2 - arrayShips.filter((el) => el === 3).length : '-'} шт. с 3 палубами</p> <br>
    <p> ${3 - arrayShips.filter((el) => el === 2).length >= 0 
        ? 3 - arrayShips.filter((el) => el === 2).length : '-'} шт. с 2 палубами</p> <br>
    <p> ${4 - arrayShips.filter((el) => el === 1).length >= 0 
        ? 4 - arrayShips.filter((el) => el === 1).length : '-'} шт. с 1 палубой</p> <br>
    `)
    
    
    coloringField(matrixFirstPlayer,firstTable)   
}
const makeSecondTable = (matrixSecondPlayer) => {
    console.log(matrixSecondPlayer)
    while (firstTable.firstElementChild) {
        firstTable.firstElementChild.remove()
    }
    for (let i = 0; i < 12; i++) {
        for (let k = 0; k < 12; k++) {
            if (matrixFirstPlayer[i][k] !== 3) {
                matrixFirstPlayer[i][k] = 0
            }
        }
    }
    printField(document.querySelector('.second-table'))
    coloringField(matrixSecondPlayer, document.querySelector('.second-table'))
    document.querySelector('.second-screen').style.display = 'block'
    console.log(document.querySelector('.second-screen'))

    console.log('hello')
    // textAboutShips.innerHTML =  `
    //     <p>Вы сейчас вводите корабль с ${countOfDecks + 1} палубами</p> <br>
    //     <strong>Осталось: </strong> <br>
    //     <p> ${1 - arrayShips.filter((el) => el === 4).length >= 0 
    //         ? 1 - arrayShips.filter((el) => el === 4).length : '-'} шт. с 4 палубами</p> <br>
    //     <p> ${2 - arrayShips.filter((el) => el === 3).length >= 0 
    //         ? 2 - arrayShips.filter((el) => el === 3).length : '-'} шт. с 3 палубами</p> <br>
    //     <p> ${3 - arrayShips.filter((el) => el === 2).length >= 0 
    //         ? 3 - arrayShips.filter((el) => el === 2).length : '-'} шт. с 2 палубами</p> <br>
    //     <p> ${4 - arrayShips.filter((el) => el === 1).length >= 0 
    //         ? 4 - arrayShips.filter((el) => el === 1).length : '-'} шт. с 1 палубой</p> <br>
    //     `
    //     return
}
printField(firstTable)
coloringField(matrixFirstPlayer, firstTable)
firstTable.addEventListener('click', (e) => {inputShips(e, matrixFirstPlayer)})

