const prompt = require('prompt-sync')();
player = Math.round(Math.random())
resume = 1

ticTacToeArray = []
arraySize = Number(prompt("Введите размер поля: "))

for (let i = 0; i < arraySize; i++) {
    ticTacToeRow = []
    for (let j = 0; j < arraySize; j++) {
        ticTacToeRow.push(-9)
    }
    ticTacToeArray.push(ticTacToeRow)
}

console.log(ticTacToeArray)

while (true) {
    while (true) {
        [row, col] = prompt(`Ход игрока ${player}: `)
        if (ticTacToeArray[Number(row)][Number(col)] < 0) {
            break
        }
        console.log("Эта ячейка занята, введите другую")
    }
    ticTacToeArray[Number(row)][Number(col)] = player 
    
    console.log(ticTacToeArray)

    checkArray = []
    for (let row of ticTacToeArray) {
        checkArray.push(row.slice())
    }

    for (let i in ticTacToeArray) {
        checkArray.push([])
    }
    
    for (let i = 0; i < ticTacToeArray.length; i++) {
        for (let j = 0; j < ticTacToeArray.length; j++) {
            checkArray[j + ticTacToeArray.length].push(ticTacToeArray[i][j])
        }
    }
    checkArray.push([])
    checkArray.push([])
    for (let i = 0; i < ticTacToeArray.length; i++) {
        checkArray[checkArray.length - 2].push(ticTacToeArray[i][i])
        checkArray[checkArray.length - 1].push(ticTacToeArray[i][ticTacToeArray.length - 1 - i])
    }
    
    console.log(checkArray)
    
    for (row of checkArray) {
        rowSum = 0
        for (elem of row) {
            rowSum += elem
        }
        if (rowSum != 0 && rowSum != ticTacToeArray.length) {
            continue
        }
        console.log(`Игрок ${player} выиграл`)
        resume = 0
        break
    }
    if (resume == 0) {
        break
    }
    console.log("Ход переходит следующему игроку")
    player = player == 1 ? 0 : 1
}

