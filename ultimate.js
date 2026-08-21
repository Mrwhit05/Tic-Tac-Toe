const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

/*
const smallCellSize = 600 / 9;
const boardSize = smallCellSize * 3;
*/

let smallCellSize;
let boardSize;

function resizeCanvas() {
    const container = document.querySelector(".canvas-container");

    const size = Math.min(container.clientWidth, container.clientHeight) * 0.9;

    canvas.width = size;
    canvas.height = size;

    smallCellSize = size / 9;
    boardSize = size / 3;

    draw();
}

let activeBoard = null;
let lastBoard = null;
let gameOver = false;
let globalTurnCount = 0;
let currentPlayer = "X";

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function createGrid() {
    return [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
}

let grids = [
        [createGrid(), createGrid(), createGrid()],
        [createGrid(), createGrid(), createGrid()],
        [createGrid(), createGrid(), createGrid()]
    ];

function checkWin(grid, turnCount) {
    //win con A top row
    if (grid[0][0] != "T" && grid[0][0] != "" && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]){
        console.log("win A");
        return grid[0][0];
    }

    //win con B mid row
    else if (grid[1][0] != "T" && grid[1][0] != "" && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]){
        console.log("win B");
        return grid[1][0];
    }

    //win con C bottom row
    else if (grid[2][0] != "T" && grid[2][0] != "" && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]){
        console.log("win C");
        return grid[2][0];
    }

    //win con D left col
    else if (grid[0][0] != "T" && grid[0][0] != "" && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]){
        console.log("win D");
        return grid[0][0];
    }

    //win con E mid col
    else if (grid[0][1] != "T" && grid[0][1] != "" && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]){
        console.log("win E");
        return grid[0][1];
    }

    //win con F right col
    else if (grid[0][2] != "T" && grid[0][2] != "" && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]){
        console.log("win F");
        return grid[0][2];
    }

    //win con G L > R diag
    else if (grid[0][0] != "T" && grid[0][0] != "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]){
        console.log("win G");
        return grid[0][0];
    }

    //win con H R > L diag
    else if (grid[0][2] != "T" && grid[0][2] != "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]){
        console.log("win H");
        return grid[0][2];
    }

    //tie con
    else if (turnCount == 9){
        console.log("tie");
        return "T";
    } 

    console.log("internal count", turnCount);
}

let winners = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
]

let turnTracker = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
]

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const boardCol = Math.floor(mouseX / boardSize);
    const boardRow = Math.floor(mouseY / boardSize);

    const cellCol = Math.floor((mouseX % boardSize) / smallCellSize);
    const cellRow = Math.floor((mouseY % boardSize) / smallCellSize);

    if (winners[boardRow][boardCol] != ""){
        return;
    }

    if (activeBoard !== null && (boardRow !== activeBoard.row || boardCol !== activeBoard.col)){
        return;
    }

    if (grids[boardRow][boardCol][cellRow][cellCol] === "X" || grids[boardRow][boardCol][cellRow][cellCol] === "O"){
        return;
    }

    lastBoard = {
        row : boardRow,
        col : boardCol
    };

    console.log(`Board Row: ${lastBoard.row}, Board Column: ${lastBoard.col}`);

    grids[boardRow][boardCol][cellRow][cellCol] = currentPlayer;
    console.log(grids);

    if (lastBoard != null && !winners[lastBoard.row][lastBoard.col]){
        turnTracker[lastBoard.row][lastBoard.col] += 1;
        switchPlayer();
        activeBoard = {row : cellRow, col : cellCol};
    }

    if (winners[activeBoard.row][activeBoard.col] != ""){
        activeBoard = null;
    }
    //console.log(turnCount);
});

function drawX(row, col) {
    const x = col * smallCellSize;
    const y = row * smallCellSize;
    const padding = smallCellSize * 0.2;

    ctx.beginPath();
    ctx.moveTo(x + padding, y + padding);
    ctx.lineTo(x + smallCellSize - padding, y + smallCellSize - padding);

    ctx.moveTo(x + smallCellSize - padding, y + padding);
    ctx.lineTo(x + padding, y + smallCellSize - padding);

    //ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.stroke();
}

function drawO(row, col) {
    const x = col * smallCellSize + smallCellSize / 2;
    const y = row * smallCellSize + smallCellSize / 2;
    const padding = smallCellSize * 0.2;
    const radius = smallCellSize / 2 - padding;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    //ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
}

function drawSmallGrid(){
    for (let gridRow = 0; gridRow < 3; gridRow++) {
        for (let gridCol = 0; gridCol < 3; gridCol++) {
            const offsetX = gridCol * boardSize;
            const offsetY = gridRow * boardSize;

            // Vertical lines
            for (let i = 1; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(offsetX + i * smallCellSize, offsetY);
                ctx.lineTo(offsetX + i * smallCellSize, offsetY + boardSize);
                ctx.stroke();
            }

            // Horizontal lines
            for (let i = 1; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY + i * smallCellSize);
                ctx.lineTo(offsetX + boardSize, offsetY + i * smallCellSize);
                ctx.stroke();
            }
        }
    }
}

function drawBigGrid(){
    ctx.lineWidth = 4;

    for (let i = 1; i < 3; i++){
        // Vertical
        ctx.beginPath();
        ctx.moveTo(i * boardSize, 0);
        ctx.lineTo(i * boardSize, boardSize * 3);
        ctx.stroke();

        // Horizontal
        ctx.beginPath();
        ctx.moveTo(0, i * boardSize);
        ctx.lineTo(boardSize * 3, i * boardSize);
        ctx.stroke();
    }

    ctx.lineWidth = 1;
}

function drawActiveBoard() {

    if (activeBoard == null)
        return;

    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;

    ctx.strokeRect(
        activeBoard.col * boardSize,
        activeBoard.row * boardSize,
        boardSize,
        boardSize
    );

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

}

function drawCompletedBoards() {

    ctx.font = "70px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let boardRow = 0; boardRow < 3; boardRow++) {

        for (let boardCol = 0; boardCol < 3; boardCol++) {

            let winner = winners[boardRow][boardCol];

            if (winner === "")
                continue;

            const x = boardCol * boardSize + boardSize / 2;
            const y = boardRow * boardSize + boardSize / 2;

            ctx.fillText(winner, x, y);

        }

    }

}

function update() {
    if (lastBoard == null) {
        return;
    }

    let winner = checkWin(grids[lastBoard.row][lastBoard.col], turnTracker[lastBoard.row][lastBoard.col]);
    if (winner){
        winners[lastBoard.row][lastBoard.col] = winner;
        //turnTracker[activeBoard.row][activeBoard.col] = turnCount;
        globalTurnCount += 1;
        console.log("Winners", winners);
        winner = null;

        if (activeBoard !== null && winners[activeBoard.row][activeBoard.col] !== ""){
            activeBoard = null;
        }
    }

    lastBoard = null;

    let overallWinner = checkWin(winners, globalTurnCount);
    if (overallWinner){
        console.log("Overall winner: ", overallWinner);
        gameOver = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSmallGrid();
    drawBigGrid();


    for (let boardRow = 0; boardRow < 3; boardRow++) {
        for (let boardCol = 0; boardCol < 3; boardCol++) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const value = grids[boardRow][boardCol][row][col];
                    const globalRow = boardRow * 3 + row;
                    const globalCol = boardCol * 3 + col;
                    if (value === "X")
                        drawX(globalRow, globalCol);
                    if (value === "O")
                        drawO(globalRow, globalCol);
                }
            }
        }
    }

    drawCompletedBoards();
    drawActiveBoard();
}

function gameLoop() {
    update();
    draw();

    if (gameOver) {
        if (globalTurnCount == 9){
            console.log("Game Tied");
        }
        else {
            console.log(`${currentPlayer} won`);
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();