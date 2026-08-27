export const classic = {
    start,
    handleClick,
    update,
    draw
};

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const cellSize = 100;

let grid = [["", "", ""],
            ["", "", ""],
            ["", "", ""]];

let gameOver = false;
let turnCount = 0;

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const col = Math.floor(mouseX / cellSize);
    const row = Math.floor(mouseY / cellSize);

    if (grid[row][col] === "X" || grid[row][col] === "O"){
        return;
    }

    console.log(`Row: ${row}, Column: ${col}`);

    turnCount % 2 ? grid[row][col] = "X" : grid[row][col] = "O"
    console.log(grid);
    turnCount += 1;
    console.log(turnCount);
});

function drawX(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;
    const padding = 20;

    ctx.beginPath();
    ctx.moveTo(x + padding, y + padding);
    ctx.lineTo(x + cellSize - padding, y + cellSize - padding);

    ctx.moveTo(x + cellSize - padding, y + padding);
    ctx.lineTo(x + padding, y + cellSize - padding);

    //ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.stroke();
}

function drawO(row, col) {
    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;
    const radius = cellSize / 2 - 20;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    //ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
}

function update() {
    //win con A top row
    if (grid[0][0] != "" && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]){
        console.log("win A");
        gameOver = true;
    }

    //win con B mid row
    else if (grid[1][0] != "" && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]){
        console.log("win B");
        gameOver = true;
    }

    //win con C bottom row
    else if (grid[2][0] != "" && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]){
        console.log("win C");
        gameOver = true;
    }

    //win con D left col
    else if (grid[0][0] != "" && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]){
        console.log("win D");
        gameOver = true;
    }

    //win con E mid col
    else if (grid[0][1] != "" && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]){
        console.log("win E");
        gameOver = true;
    }

    //win con F right col
    else if (grid[0][2] != "" && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]){
        console.log("win F");
        gameOver = true;
    }

    //win con G L > R diag
    else if (grid[0][0] != "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]){
        console.log("win G");
        gameOver = true;
    }

    //win con H R > L diag
    else if (grid[0][2] != "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]){
        console.log("win H");
        gameOver = true;
    }

    //tie con
    else if (turnCount == 9){
        console.log("tie");
        gameOver = true;
    } 
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

gameLoop();