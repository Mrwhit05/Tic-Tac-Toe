export const classic = {
    start,
    click: handleClick,
    update,
    draw,
    setCanvas,
    setSize,
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

//const cellSize = 100;
let cellSize = 100;

function setSize(size) {
    cellSize = size / 3;
    draw();
}

let grid = [["", "", ""],
            ["", "", ""],
            ["", "", ""]];

let gameOver = false;
let turnCount = 0;
let currentPlayer = "X";
let result = null;

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

/*
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
*/
function handleClick(mouseX, mouseY){
    const col = Math.floor(mouseX / cellSize);
    const row = Math.floor(mouseY / cellSize);

    if (grid[row][col] === "X" || grid[row][col] === "O"){
        return;
    }

    console.log(`Row: ${row}, Column: ${col}`);

    grid[row][col] = currentPlayer;
    console.log(grid);
    turnCount += 1;
    console.log(turnCount);
    switchPlayer();
};

function drawX(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;
    const padding = cellSize * 0.2;

    ctx.beginPath();
    ctx.moveTo(x + padding, y + padding);
    ctx.lineTo(x + cellSize - padding, y + cellSize - padding);

    ctx.moveTo(x + cellSize - padding, y + padding);
    ctx.lineTo(x + padding, y + cellSize - padding);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.strokeStyle = "black";
}

function drawO(row, col) {
    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;
    const padding = cellSize * 0.2;
    const radius = cellSize / 2 - padding;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.strokeStyle = "black";
}

function update() {
    //win con A top row
    if (grid[0][0] != "" && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]){
        console.log("win A");
        result = {winner: grid[0][0], winCon: "A"};
        gameOver = true;
    }

    //win con B mid row
    else if (grid[1][0] != "" && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]){
        console.log("win B");
        result = {winner: grid[1][0], winCon: "B"};
        gameOver = true;
    }

    //win con C bottom row
    else if (grid[2][0] != "" && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]){
        console.log("win C");
        result = {winner: grid[2][0], winCon: "C"};
        gameOver = true;
    }

    //win con D left col
    else if (grid[0][0] != "" && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]){
        console.log("win D");
        result = {winner: grid[0][0], winCon: "D"};
        gameOver = true;
    }

    //win con E mid col
    else if (grid[0][1] != "" && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]){
        console.log("win E");
        result = {winner: grid[0][1], winCon: "E"};
        gameOver = true;
    }

    //win con F right col
    else if (grid[0][2] != "" && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]){
        console.log("win F");
        result = {winner: grid[0][2], winCon: "F"};
        gameOver = true;
    }

    //win con G L > R diag
    else if (grid[0][0] != "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]){
        console.log("win G");
        result = {winner: grid[0][0], winCon: "G"};
        gameOver = true;
    }

    //win con H R > L diag
    else if (grid[0][2] != "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]){
        console.log("win H");
        result = {winner: grid[0][2], winCon: "H"};
        gameOver = true;
    }

    //tie con
    else if (turnCount == 9){
        console.log("tie");
        result = {winner: "T", winCon: ""};
        gameOver = true;
    }
    
}


function getResult() {
    return {
        gameOver, 
        winner: result ? result.winner : null,
        winCon: result ? result.winCon : null,
        currentPlayer
    };
}

function drawWinLine(){
    if (result === null || result.winCon === "" ) {
       return;
    }

    const padding = cellSize * 0.2;

    ctx.beginPath();

    switch (result.winCon) {

        // Top row
        case "A":
            ctx.moveTo(
                padding,
                cellSize / 2
            );
            ctx.lineTo(
                canvas.width - padding,
                cellSize / 2
            );
            break;

        // Middle row
        case "B":
            ctx.moveTo(
                padding,
                cellSize + cellSize / 2
            );
            ctx.lineTo(
                canvas.width - padding,
                cellSize + cellSize / 2
            );
            break;

        // Bottom row
        case "C":
            ctx.moveTo(
                padding,
                cellSize * 2 + cellSize / 2
            );
            ctx.lineTo(
                canvas.width - padding,
                cellSize * 2 + cellSize / 2
            );
            break;

        // Left column
        case "D":
            ctx.moveTo(
                cellSize / 2,
                padding
            );
            ctx.lineTo(
                cellSize / 2,
                canvas.height - padding
            );
            break;

        // Middle column
        case "E":
            ctx.moveTo(
                cellSize + cellSize / 2,
                padding
            );
            ctx.lineTo(
                cellSize + cellSize / 2,
                canvas.height - padding
            );
            break;

        // Right column
        case "F":
            ctx.moveTo(
                cellSize * 2 + cellSize / 2,
                padding
            );
            ctx.lineTo(
                cellSize * 2 + cellSize / 2,
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

    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw vertical lines
    for (let x = cellSize; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col] === "X") {
                drawX(row, col);
            } else if (grid[row][col] === "O") {
                drawO(row, col);
            }
        }
    }

    drawWinLine();
}

function gameLoop() {
    update();
    draw();

    if (gameOver) {
        if (turnCount == 9){
            console.log("Game Tied");
        }
        else {
            turnCount % 2 ?   console.log("O won") : console.log("X won")
        }
        return;
    }

    requestAnimationFrame(gameLoop);
}

function start() {
    grid = [["", "", ""],
            ["", "", ""],
            ["", "", ""]];

    gameOver = false;
    turnCount = 0;
    currentPlayer = "X";
    result = null;
}

//gameLoop();