const prompt = require('prompt-sync')();

function createGrid(gridDim, blankValue) {
    grid = []
    for (let i = 0; i < gridDim; i++) {
        row = []
        for (let j = 0; j < gridDim; j++) {
            row.push(blankValue)
        }
        grid.push(row)
    }
    return grid
}

function createExtendedGrid(baseGrid) {
    newGrid = []
    for (let row of baseGrid) {
        newGrid.push(row.slice())
    }

    for (let i = 0; i < baseGrid.length; i++) {
        newGrid.push([])
    }
    for (let i = 0; i < baseGrid.length; i++) {
        for (let j = 0; j < baseGrid.length; j++) {
            newGrid[j + baseGrid.length].push(baseGrid[i][j])
        }
    }

    newGrid.push([])
    newGrid.push([])
    for (let i = 0; i < baseGrid.length; i++) {
        newGrid[newGrid.length - 2].push(baseGrid[i][i])
        newGrid[newGrid.length - 1].push(baseGrid[i][baseGrid.length - 1 - i])
    }

    return newGrid
}

function getWinner(grid) {
    let checkGrid = createExtendedGrid(grid)
    for (row of checkGrid) {

        let rowSum = 0
        for (elem of row) {
            rowSum += elem
        }

        if (Math.abs(rowSum) < 3) {
            continue
        }

        let winner = row[0]
        return winner
    }
    return null
}

function checkFull(grid) {
    let gridProduct = 1
    for (row of grid) {
        for (elem of row) {
            gridProduct *= elem
        }
    }
    return gridProduct != 0
}

function displayGrid(grid, gridMap) {
    console.log()
    for (let i = 0; i < grid.length; i++) {
        gridRow = ''
        for (let j = 0; j < grid[i].length; j++) {
            gridRow += gridMap[grid[i][j]]
            if (j != grid[i].length - 1) {
                gridRow += ' '
            }
        }
        console.log(gridRow)
    }
    console.log()
}

function makeMove(playerName, playerSign = playerName, grid) {
    while (true) {
        [row, col] = prompt(`Ход игрока ${playerName}: `)
        if (grid[Number(row)][Number(col)] == 0) {
            break
        }
        console.log("Эта ячейка занята, введите другую")
    }
    grid[Number(row)][Number(col)] = playerSign 
    return grid
}

function initGame() {
    const gameMap = new Object()
    gameMap.player = Math.round(Math.random()) * 2 - 1
    gameMap.getWinner = function() {
        return getWinner(gameMap.grid.self)
    }
    
    const grid = new Object()
    grid.map = {
        "-1": "o",
        1: "x",
        0: "_"
    }
    grid.dim = Number(prompt("Введите размер поля: "))
    grid.self = createGrid(grid.dim, 0)
    grid.display = function() {
        return displayGrid(gameMap.grid.self, gameMap.grid.map)
    }
    gameMap.grid = grid

    return gameMap
}

let game = initGame()
game.grid.display()

while (true) {
    makeMove(
        game.grid.map[game.player],
        game.player,
        game.grid.self
    )
    game.grid.display()
    game.getWinner()
    
    if (game.getWinner() == null && !checkFull(game.grid.self)) {
        game.player = game.player == 1 ? -1 : 1
        console.log(`Ход переходит игроку ${game.grid.map[game.player]}`)
        console.log()
        continue
    }

    if (game.getWinner() != null) {
        console.log(`Игрок ${game.grid.map[game.player]} выиграл`)
    } else {
        console.log('В этот раз без победителя')
    }
    
    newGame = prompt("Сыграть ещё раз (y/n)? ")
    console.log()
    if (newGame == 'y') {
        game = initGame()
        game.grid.display()
        continue
    }

    break
}
