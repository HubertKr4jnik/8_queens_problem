let cells = document.querySelectorAll(".cell");
let boardMatrix = [];
let turnAddition = 0;

for (let i = 0; i < 8; i++) {
    boardMatrix[i] = [];
    for (let j = 0; j < 8; j++) {
        boardMatrix[i][j] = cells[i + j + turnAddition];
    }
    turnAddition += 7
}

// console.log(boardMatrix)

let solutions = [];

let activeSolutionOutput = document.getElementById("activeSolutionOutput");

const startShowcase = ()=>{
    {
        findQueens(board,0);
        for (let i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (solutions[activeSolution][i][j] == 1) {
                    boardMatrix[i][j].classList.add("queen")
                }
                else if (boardMatrix[i][j].classList.contains('queen')) {
                    boardMatrix[i][j].classList.remove('queen');
                }
            } 
        }
        activeSolutionOutput.innerText = "1 / 92";

        document.getElementById("nextBtn").addEventListener('click', ()=> {
            showNextSolution();
        })

        document.getElementById("prevBtn").addEventListener('click', ()=> {
            showPreviousSolution();
        })

        startButton.removeEventListener('click', startShowcase);
        startButton.remove();
        document.querySelector("header").classList.add("changed");
    }
}

//algorithm

let count: number = 0;

// A function to print a solution
const printSolution = (board: number[][]) => {
    let solution = [];
    for(let i = 0; i < 8; i++){
        let row = "";
        row += board[i]
        solution.push(row.split(","))
    }
    solutions.push(solution);
}

//Function to check whether a position is valid or not
const isValid = (board: number[][], row: number, col: number) => {
    
    //loop to check horizontal positions
    for(let i = col; i >= 0; i--){
        if(board[row][i]){
            return false;
        }
    }
    let i = row;
    let j = col;
    
    //loop to check the upper left diagonal
    while(i >= 0 && j >= 0){
        if(board[i][j]){
            return false;
        }
        i--;
        j--;
    }
    i = row;
    j = col;
    
    //loop to check the lower left diagonal
    while(i < 8 && j >= 0){
        if(board[i][j])
        return false;
        i++;
        j--;
    }
    return true;
}

//function to check all the possible solutions
const findQueens = (board: number[][], currentColumn: number) => {
    if( currentColumn >= 8)
    return;

        //loop to cover all the columns
    for(let i = 0; i < 8; i++){
        if(isValid(board, i, currentColumn)){
            board[i][currentColumn] = 1;

            if(currentColumn == 7){
                printSolution(board);
                count++;
            }
            //recursively calling the function
            findQueens(board, currentColumn+1);
            //backtracking
            board[i][currentColumn] = 0;
        }
   
    }
    
}

    let board: number[][] = []

    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i][j] = 0;
        }
    }

    let startButton = document.getElementById("startBtn")

    startButton.addEventListener('click', startShowcase)

    let activeSolution = 0;

const showNextSolution = ()=> {
    if (activeSolution < 91) {
        activeSolution++;
        for (let i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (solutions[activeSolution][i][j] == 1) {
                    boardMatrix[i][j].classList.add("queen")
                }
                else if (boardMatrix[i][j].classList.contains('queen')) {
                    boardMatrix[i][j].classList.remove('queen');
                }
            }  
        }
        activeSolutionOutput.innerText = String(1 + activeSolution) + "/ 92"; 
    }
}

const showPreviousSolution = ()=> {
    if (activeSolution > 0) {
        activeSolution--
        for (let i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (solutions[activeSolution][i][j] == 1) {
                    boardMatrix[i][j].classList.add("queen")
                }
                else if (boardMatrix[i][j].classList.contains('queen')) {
                    boardMatrix[i][j].classList.remove('queen');
                }
            }
        }
        activeSolutionOutput.innerText = String(1 + activeSolution) + "/ 92"; 
    }
}