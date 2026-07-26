const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let grid = ["", "", "",
            "", "", "",
            "", "", ""];

let gameOver = false;

function update() {
    //win con A top row
    if (grid[0] != "" && grid[0] === grid[1] && grid[1] === grid[2]){
        console.log("win A");
        gameOver = true;
    }

    //win con B mid row
    if (grid[3] != "" && grid[3] === grid[4] && grid[4] === grid[5]){
        console.log("win B");
        gameOver = true;
    }

    //win con C bottom row
    if (grid[6] != "" && grid[6] === grid[7] && grid[7] === grid[8]){
        console.log("win C");
        gameOver = true;
    }

    //win con D left col
    if (grid[0] != "" && grid[0] === grid[3] && grid[3] === grid[6]){
        console.log("win D");
        gameOver = true;
    }

    //win con E mid col
    if (grid[1] != "" && grid[1] === grid[4] && grid[4] === grid[7]){
        console.log("win E");
        gameOver = true;
    }

    //win con F right col
    if (grid[2] != "" && grid[2] === grid[5] && grid[5] === grid[8]){
        console.log("win F");
        gameOver = true;
    }

    //win con G L > R diag
    if (grid[0] != "" && grid[0] === grid[4] && grid[4] === grid[8]){
        console.log("win G");
        gameOver = true;
    }

    //win con H R > L diag
    if (grid[2] != "" && grid[2] === grid[4] && grid[4] === grid[6]){
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

    ctx.fillStyle = "red";
    ctx.fillRect(100, 100, 50, 50);
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