const ROWS = 4;
const COLS = 4;

let score = 0;
let board = [];

// Main function to operate the game.
function main() {
    initializeBoard()
    displayBoard(board)
}

// Creates the board every time the window is loaded
function initializeBoard() {
    for(let i = 0; i < ROWS; i++) {
        board.push([]);
        for(let j = 0; j < COLS; j++) {
            board[i][j] = 0;
        }
    }

    generateTile()
    generateTile()
}

// Function to randomly generate a starter number from any provided array
function randomStarterNumber(numbers) {
    return numbers[Math.floor(Math.random()*numbers.length)]
}


// Generates tiles at the start of the game.
function generateTile() {
// Randomly generates the tile location that is getting a # added to it
    const row = Math.floor(Math.random() * ROWS)
    const col = Math.floor(Math.random() * COLS)

    // Sets that location to be a random # between 2, 4, and 8
    // And an if/else statement to handle if the space is already filled.
    if (board[row][col] === 0){
        let randomNumber = randomStarterNumber([2, 4, 8])
        board[row][col] = randomNumber;   
    }
    else {
        generateTile()
    }
}

//  Displays the board dynamically based on what's in each tile, updates as inputs are done.
function displayBoard(board){
    const container = document.getElementById('board');
    container.innerHTML = '';

    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            const tile = document.createElement("div")
            tile.className = "tile x" + board[r][c];
            tile.innerHTML = board[r][c];
            container.appendChild(tile)

            if(board[r][c] == 0) {
                tile.innerHTML = ''
            }
        }
    }
}


let keyCount = 0;
// Key Listeners to do a function when a button is pressed.
// Will also generate a tile every certain number of key presses.
document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft") {
        slideLeft();
        keyCount += 1;

        if (keyCount % 2 == 0) {
            generateTile()
        }

    } else if (e.code == "ArrowRight") {
        slideRight();
        keyCount += 1;

        if (keyCount % 2 == 0) {
            generateTile()
        }
    } else if (e.code == "ArrowUp") {
        slideUp();
        keyCount += 1;

        if (keyCount % 2 == 0) {
            generateTile()
        }
    } else if (e.code == "ArrowDown") {
        slideDown();
        keyCount += 1;

        if (keyCount % 2 == 0) {
            generateTile()
        }
    }
}) 


// Create a new array without the zeroes so it can do the checks
function filterZero(row) {
    return row.filter(num => num != 0) 
}

function slide(row) {
    // Remove Zeroes first so that it's not adding anything to 0 and can check right by it.
    row = filterZero(row);
    for (let i=0; i<row.length-1; i++) {
        // If a square has a square by it with the same number, multiply the first one by two and set the second one to 0.
        if (row[i] == row[i+1]) {
            row[i+1] = 0;
            let points = row[i] *= 2;

            score += points;
            document.getElementById("score").innerHTML = score;
        }
    }
    // Re-adds the Zeroes back onto the board
    while (row.length < COLS) {
        row.push(0)
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < ROWS; r++) {
        let row = board[r]
        row = slide(row);
        board[r] =row;
        displayBoard(board)
        }
    }

function slideRight() {
    for (let r=0; r < ROWS; r++) {
        let row = board[r]
        row.reverse();
        row = slide(row);
        row.reverse();

        board[r] = row;
        displayBoard(board);
    }
}

function slideUp() {
    for(let c = 0; c<COLS; c++) {
        let row = [board[0][c], board[1][c],board[2][c],board[3][c]]
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        displayBoard(board);

    }
}
function slideDown() {
    for(let c = 0; c<COLS; c++) {
        let row = [board[0][c], board[1][c],board[2][c],board[3][c]]
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        displayBoard(board);

    }
}

main();