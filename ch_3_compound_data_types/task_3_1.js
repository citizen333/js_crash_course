const prompt = require('prompt-sync')();

ticTacToeArray = []
arraySize = Number(prompt("Введите размер поля: "))

for (let i = 0; i < arraySize; i++) {
    ticTacToeRow = []
    for (let j = 0; j < arraySize; j++) {
        ticTacToeRow.push('')
    }
    ticTacToeArray.push(ticTacToeRow)
}

console.log(ticTacToeArray)