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

function update() {

    canvas.addEventListener("click", function(event) {

        const rect = canvas.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const col = Math.floor(mouseX / cellSize);
        const row = Math.floor(mouseY / cellSize);

        console.log(`Row: ${row}, Column: ${col}`);
        grid[row][col] = "X"
    });





    //win con A top row
    if (grid[0][0] != "" && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]){
        console.log("win A");
        gameOver = true;
    }

    //win con B mid row
    if (grid[1][0] != "" && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]){
        console.log("win B");
        gameOver = true;
    }

    //win con C bottom row
    if (grid[2][0] != "" && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]){
        console.log("win C");
        gameOver = true;
    }

    //win con D left col
    if (grid[0][0] != "" && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]){
        console.log("win D");
        gameOver = true;
    }

    //win con E mid col
    if (grid[0][1] != "" && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]){
        console.log("win E");
        gameOver = true;
    }

    //win con F right col
    if (grid[0][2] != "" && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]){
        console.log("win F");
        gameOver = true;
    }

    //win con G L > R diag
    if (grid[0][0] != "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]){
        console.log("win G");
        gameOver = true;
    }

    //win con H R > L diag
    if (grid[0][2] != "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]){
        console.log("win H");
        gameOver = true;
    }

    //tie con
    //turn count = 10 
    //console.log("tie");
    //gameOver = true;

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
}

function gameLoop() {
    update();
    draw();

    if (gameOver) {
        return;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();