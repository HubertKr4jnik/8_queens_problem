var cells = document.querySelectorAll(".cell");
var boardMatrix = [];
var turnAddition = 0;
for (var i = 0; i < 8; i++) {
    boardMatrix[i] = [];
    for (var j = 0; j < 8; j++) {
        boardMatrix[i][j] = cells[i + j + turnAddition];
    }
    turnAddition += 7;
}
// console.log(boardMatrix)
var solutions = [];
var activeSolutionOutput = document.getElementById("activeSolutionOutput");
var startShowcase = function () {
    {
        findQueens(board, 0);
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (solutions[activeSolution][i][j] == 1) {
                    boardMatrix[i][j].classList.add("queen");
                }
                else if (boardMatrix[i][j].classList.contains('queen')) {
                    boardMatrix[i][j].classList.remove('queen');
                }
            }
        }
        activeSolutionOutput.innerText = "1 / 92";
        document.getElementById("nextBtn").addEventListener('click', function () {
            showNextSolution();
        });
        document.getElementById("prevBtn").addEventListener('click', function () {
            showPreviousSolution();
        });
        startButton.removeEventListener('click', startShowcase);
        startButton.remove();
        document.querySelector("header").classList.add("changed");
    }
};
//algorithm
var count = 0;
// A function to print a solution
var printSolution = function (board) {
    var solution = [];
    for (var i = 0; i < 8; i++) {
        var row = "";
        row += board[i];
        solution.push(row.split(","));
    }
    solutions.push(solution);
};
//Function to check whether a position is valid or not
var isValid = function (board, row, col) {
    //loop to check horizontal positions
    for (var i_1 = col; i_1 >= 0; i_1--) {
        if (board[row][i_1]) {
            return false;
        }
    }
    var i = row;
    var j = col;
    //loop to check the upper left diagonal
    while (i >= 0 && j >= 0) {
        if (board[i][j]) {
            return false;
        }
        i--;
        j--;
    }
    i = row;
    j = col;
    //loop to check the lower left diagonal
    while (i < 8 && j >= 0) {
        if (board[i][j])
            return false;
        i++;
        j--;
    }
    return true;
};
//function to check all the possible solutions
var findQueens = function (board, currentColumn) {
    if (currentColumn >= 8)
        return;
    //loop to cover all the columns
    for (var i = 0; i < 8; i++) {
        if (isValid(board, i, currentColumn)) {
            board[i][currentColumn] = 1;
            if (currentColumn == 7) {
                printSolution(board);
                count++;
            }
            //recursively calling the function
            findQueens(board, currentColumn + 1);
            //backtracking
            board[i][currentColumn] = 0;
        }
    }
};
var board = [];
for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
        board[i][j] = 0;
    }
}
var startButton = document.getElementById("startBtn");
startButton.addEventListener('click', startShowcase);
var activeSolution = 0;
var showNextSolution = function () {
    if (activeSolution < 91) {
        activeSolution++;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (solutions[activeSolution][i][j] == 1) {
                    boardMatrix[i][j].classList.add("queen");
                }
                else if (boardMatrix[i][j].classList.contains('queen')) {
                    boardMatrix[i][j].classList.remove('queen');
                }
            }
        }
        activeSolutionOutput.innerText = String(1 + activeSolution) + "/ 92";
    }
};
var showPreviousSolution = function () {
    if (activeSolution > 0) {
        activeSolution--;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (solutions[activeSolution][i][j] == 1) {
                    boardMatrix[i][j].classList.add("queen");
                }
                else if (boardMatrix[i][j].classList.contains('queen')) {
                    boardMatrix[i][j].classList.remove('queen');
                }
            }
        }
        activeSolutionOutput.innerText = String(1 + activeSolution) + "/ 92";
    }
};
