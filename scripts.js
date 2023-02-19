// var board;
// var score = 0;
// var rows = 4;
// var columns = 4;

// window.onload = function() {
//     setBoard()
// }

// function setBoard() {
//     var board = [[0, 0, 0, 0],
//                  [0, 0, 0, 0],
//                  [0, 0, 0, 0],
//                  [0, 0, 0, 0]]

//     for (let i = 0; i < rows.length; i++) {
//         var tile = document.createElement("div")
//         tile.className = "tile";
//     }
// }

const ROWS = 4;
const COLS = 4;

let board = [];

// Creates the board every time the window is loaded
function initializeBoard() {
    for(let i = 0; i < ROWS; i++) {
        board.push([]);
        for(let j = 0; j < COLS; j++) {
            board[i][j] = 0;
        }
    }
}

function randomStarterNumber(numbers) {
    return numbers[Math.floor(Math.random()*numbers.length)]
}

function generateTile() {
// Randomly generates the tile location that is getting a # added to it
    const row = Math.floor(Math.random() * ROWS)
    const col = Math.floor(Math.random() * COLS)
    // Sets that location to be a random # between any of the starter #s
    if (board[row][col] === 0){
        board[row][col] = randomStarterNumber([2, 4, 8])
    }
    else {
        generateTile()
    }
}

initializeBoard()
generateTile()
generateTile()

console.log(board)

