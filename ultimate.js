export const ultimate = {
    start,
    click: handleClick,
    update,
    draw,
    setCanvas,
    resize: resizeCanvas,
    getResult
};

let ctx;
let canvas;

function setCanvas(gameCanvas, gameContext){
    canvas = gameCanvas;
    ctx = gameContext;
}

//const canvas = document.getElementById("game");
//const ctx = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;


//const smallCellSize = 600 / 9;
//const boardSize = smallCellSize * 3;

//needs resize to work
let smallCellSize = 600 / 9;
let boardSize = smallCellSize * 3;

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
let winner = null;
let overallWinCon = "";

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
        return {winner: grid[0][0], winCon: "A"};
    }

    //win con B mid row
    else if (grid[1][0] != "T" && grid[1][0] != "" && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]){
        console.log("win B");
        return {winner: grid[1][0], winCon: "B"};
    }

    //win con C bottom row
    else if (grid[2][0] != "T" && grid[2][0] != "" && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]){
        console.log("win C");
        return {winner: grid[2][0], winCon: "C"};
    }

    //win con D left col
    else if (grid[0][0] != "T" && grid[0][0] != "" && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]){
        console.log("win D");
        return {winner: grid[0][0], winCon: "D"};
    }

    //win con E mid col
    else if (grid[0][1] != "T" && grid[0][1] != "" && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]){
        console.log("win E");
        return {winner: grid[0][1], winCon: "E"};
    }

    //win con F right col
    else if (grid[0][2] != "T" && grid[0][2] != "" && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]){
        console.log("win F");
        return {winner: grid[0][2], winCon: "F"};
    }

    //win con G L > R diag
    else if (grid[0][0] != "T" && grid[0][0] != "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]){
        console.log("win G");
        return {winner: grid[0][0], winCon: "G"};
    }

    //win con H R > L diag
    else if (grid[0][2] != "T" && grid[0][2] != "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]){
        console.log("win H");
        return {winner: grid[0][2], winCon: "H"};
    }

    //tie con
    else if (turnCount == 9){
        console.log("tie");
        return {winner: "T", winCon: ""};
    } 

    
    console.log("win con grid", winCon);
    console.log("internal count", turnCount);
}

let winners = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
]

let winCon = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
]

let turnTracker = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
]

//window.addEventListener("resize", resizeCanvas);

//resizeCanvas();

function handleClick(mouseX, mouseY) {
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
    console.log("board", grids);

    if (lastBoard != null && !winners[lastBoard.row][lastBoard.col]){
        turnTracker[lastBoard.row][lastBoard.col] += 1;
        switchPlayer();
        activeBoard = {row : cellRow, col : cellCol};
    }

    if (winners[activeBoard.row][activeBoard.col] != ""){
        activeBoard = null;
    }
};

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

    ctx.font = `${boardSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let boardRow = 0; boardRow < 3; boardRow++) {

        for (let boardCol = 0; boardCol < 3; boardCol++) {

            let winner = winners[boardRow][boardCol];

            if (winner === "")
                continue;

            if (winner === "X"){
                ctx.fillStyle = "red";
            }

            if (winner === "O"){
                ctx.fillStyle = "blue";
            }

            const x = boardCol * boardSize + boardSize / 2;
            const y = boardRow * boardSize + boardSize / 2;

            ctx.fillText(winner, x, y);

        }

    }

}

function drawWinLine(){
    for (let boardRow = 0; boardRow < 3; boardRow++) {
        for (let boardCol = 0; boardCol < 3; boardCol++) {
            const con = winCon[boardRow][boardCol];

            if (con === "") {
                continue;
            }

            const offsetX = boardCol * boardSize;
            const offsetY = boardRow * boardSize;

            const padding = smallCellSize * 0.2;

            ctx.beginPath();

            switch (con) {

                // Top row
                case "A":
                    ctx.moveTo(
                        offsetX + padding,
                        offsetY + smallCellSize / 2
                    );
                    ctx.lineTo(
                        offsetX + boardSize - padding,
                        offsetY + smallCellSize / 2
                    );
                    break;

                // Middle row
                case "B":
                    ctx.moveTo(
                        offsetX + padding,
                        offsetY + boardSize / 2
                    );
                    ctx.lineTo(
                        offsetX + boardSize - padding,
                        offsetY + boardSize / 2
                    );
                    break;

                // Bottom row
                case "C":
                    ctx.moveTo(
                        offsetX + padding,
                        offsetY + boardSize - smallCellSize / 2
                    );
                    ctx.lineTo(
                        offsetX + boardSize - padding,
                        offsetY + boardSize - smallCellSize / 2
                    );
                    break;

                // Left column
                case "D":
                    ctx.moveTo(
                        offsetX + smallCellSize / 2,
                        offsetY + padding
                    );
                    ctx.lineTo(
                        offsetX + smallCellSize / 2,
                        offsetY + boardSize - padding
                    );
                    break;

                // Middle column
                case "E":
                    ctx.moveTo(
                        offsetX + boardSize / 2,
                        offsetY + padding
                    );
                    ctx.lineTo(
                        offsetX + boardSize / 2,
                        offsetY + boardSize - padding
                    );
                    break;

                // Right column
                case "F":
                    ctx.moveTo(
                        offsetX + boardSize - smallCellSize / 2,
                        offsetY + padding
                    );
                    ctx.lineTo(
                        offsetX + boardSize - smallCellSize / 2,
                        offsetY + boardSize - padding
                    );
                    break;

                // Left → right diagonal
                case "G":
                    ctx.moveTo(
                        offsetX + padding,
                        offsetY + padding
                    );
                    ctx.lineTo(
                        offsetX + boardSize - padding,
                        offsetY + boardSize - padding
                    );
                    break;

                // Right → left diagonal
                case "H":
                    ctx.moveTo(
                        offsetX + boardSize - padding,
                        offsetY + padding
                    );
                    ctx.lineTo(
                        offsetX + padding,
                        offsetY + boardSize - padding
                    );
                    break;
            }

            ctx.stroke();
        }
    }
}

function drawOverallWinLine() {
    if (overallWinCon === ""){
        return;
    }

    const padding = smallCellSize * 0.2;
    ctx.beginPath();

    switch (overallWinCon) {

        // Top row
        case "A":
            ctx.moveTo(
                padding,
                boardSize / 2
            );
            ctx.lineTo(
                canvas.width - padding,
                boardSize / 2
            );
            break;

        // Middle row
        case "B":
            ctx.moveTo(
                padding,
                boardSize + boardSize / 2
            );
            ctx.lineTo(
                canvas.width - padding,
                boardSize + boardSize / 2
            );
            break;

        // Bottom row
        case "C":
            ctx.moveTo(
                padding,
                boardSize * 2 + boardSize / 2
            );
            ctx.lineTo(
                canvas.width - padding,
                boardSize * 2 + boardSize / 2
            );
            break;

        // Left column
        case "D":
            ctx.moveTo(
                boardSize / 2,
                padding
            );
            ctx.lineTo(
                boardSize / 2,
                canvas.height - padding
            );
            break;

        // Middle column
        case "E":
            ctx.moveTo(
                boardSize + boardSize / 2,
                padding
            );
            ctx.lineTo(
                boardSize + boardSize / 2,
                canvas.height - padding
            );
            break;

        // Right column
        case "F":
            ctx.moveTo(
                boardSize * 2 + boardSize / 2,
                padding
            );
            ctx.lineTo(
                boardSize * 2 + boardSize / 2,
                canvas.height - padding
            );
            break;

        // Left → right diagonal
        case "G":
            ctx.moveTo(
                padding,
                padding
            );
            ctx.lineTo(
                canvas.width - padding,
                canvas.height - padding
            );
            break;

        // Right → left diagonal
        case "H":
            ctx.moveTo(
                canvas.width - padding,
                padding
            );
            ctx.lineTo(
                padding,
                canvas.height - padding
            );
            break;

        default:
            return;
    }

    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx. lineWidth = 1;
}

function update() {
    if (lastBoard == null) {
        return;
    }

    let result = checkWin(grids[lastBoard.row][lastBoard.col], turnTracker[lastBoard.row][lastBoard.col]);
    if (result){
        winners[lastBoard.row][lastBoard.col] = result.winner;
        winCon[lastBoard.row][lastBoard.col] = result.winCon;
        //turnTracker[activeBoard.row][activeBoard.col] = turnCount;
        globalTurnCount += 1;
        console.log("Winners", winners);
        console.log("Win Con", winCon);

        if (activeBoard !== null && winners[activeBoard.row][activeBoard.col] !== ""){
            activeBoard = null;
        }
    }

    lastBoard = null;

    let overallResult = checkWin(winners, globalTurnCount);
    if (overallResult){
        console.log("Overall winner: ", overallResult.winner);
        console.log("Overall win condition: ", overallResult.winCon);

        gameOver = true;
        winner = overallResult.winner;
        overallWinCon = overallResult.winCon;
    }
}

function getResult() {
    return {
        gameOver, winner, currentPlayer
    };
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

    drawWinLine();
    drawCompletedBoards();
    drawActiveBoard();
    drawOverallWinLine();
}

let triggered = false;
function gameLoop() {
    update();
    draw();

    
    if (!triggered && gameOver) {
        if (globalTurnCount == 9){
            console.log("Game Tied");
        }
        else {
            console.log(`${currentPlayer} won`);
        }
        triggered = true;
    }

    requestAnimationFrame(gameLoop);
}

function start() {
    activeBoard = null;
    lastBoard = null;
    gameOver = false;
    winner = null;
    globalTurnCount = 0;
    currentPlayer = "X";
    overallWinCon = "";

    grids = [
        [createGrid(), createGrid(), createGrid()],
        [createGrid(), createGrid(), createGrid()],
        [createGrid(), createGrid(), createGrid()]
    ];

    winners = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    winCon = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    turnTracker = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
}

//gameLoop();

//export { ultimate };