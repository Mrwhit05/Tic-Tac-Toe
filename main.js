import { ultimate } from "./ultimate.js";
import { classic } from "./game.js";

console.log("MAIN LOADED");
console.log(ultimate);

let currentGame = null;
let scene = "START";
let gameResult = null;

const statusBar = document.getElementById("statusBar");
const gameStatus = document.getElementById("gameStatus");
const resetButton = document.getElementById("resetButton");
const homeButton = document.getElementById("homeButton");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    switch (scene) {
        case "START":
            handleStartClick(mouseX, mouseY);
            break;
           
        case "GAME_MODE":
            handleGameModeClick(mouseX, mouseY);
            break;

        case "GAME":
            currentGame.click(mouseX, mouseY);
            break;

        case "WIN":
            handleWinClick(mouseX, mouseY);
            break;
    }
});

resetButton.addEventListener("click", function() {
    if (currentGame === null){
        return;
    }

    currentGame.start();
    scene = "GAME";

    updateStatusBar();
})

homeButton.addEventListener("click", function() {
    currentGame = null;
    scene = "START";

    updateStatusBar();
})

function handleStartClick(mouseX, mouseY) {
    const buttonX = canvas.width / 2 - 100;
    const buttonY = canvas.height / 2 - 30;
    const buttonWidth = 200;
    const buttonHeight = 60;

    if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
    ) {
        console.log("start button clicked")
        scene = "GAME_MODE";
    }
}

function handleGameModeClick(mouseX, mouseY) {
    const buttonX = canvas.width / 2 - 120;
    const buttonWidth = 240;
    const buttonHeight = 60;

    // Classic
    const classicY = canvas.height / 2 - 80;

    if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= classicY &&
        mouseY <= classicY + buttonHeight
    ) {
        selectGameMode("CLASSIC");
        //return;
    }

    // Ultimate
    const ultimateY = canvas.height / 2 + 20;

    if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= ultimateY &&
        mouseY <= ultimateY + buttonHeight
    ) {
        selectGameMode("ULTIMATE");
    }
}

function handleWinClick(mouseX, mouseY) {
    const buttonX = canvas.width / 2 - 120;
    const buttonY = canvas.height / 2 - 30;
    const buttonWidth = 240;
    const buttonHeight = 60;

    if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
    ) {
        currentGame.start();
        scene = "GAME";
    }
}

function selectGameMode(mode){
    switch (mode) {
        case "CLASSIC":
            currentGame = classic;
            break;

        case "ULTIMATE":
            currentGame = ultimate;
            break;

        //case AI
        default:
            return;
    }
    currentGame.setCanvas(canvas, ctx);
    currentGame.resize();

    window.addEventListener("resize", () => {
        currentGame.resize();
        draw();
    });

    currentGame.start();
    scene = "GAME";
}

function updateStatusBar() {
    if (scene !== "GAME" && scene != "WIN"){
        statusBar.style.display = "none";
        return;
    }

    statusBar.style.display = "flex";
    const result = currentGame.getResult();

    if (scene === "WIN") {
        //const result = currentGame.getResult();

        if (result.winner === "T")  {
            gameStatus.textContent = "Game Tied";
            gameStatus.style.color = "white";
        }
        else {
            gameStatus.textContent = `${result.winner} Wins!`;

            if (result.winner === "X") {
                gameStatus.style.color = "red";
            }
            else if (result.winner === "O") {
                gameStatus.style.color = "blue";
            }
        }

        return;
    }

    gameStatus.textContent = `${result.currentPlayer}'s Turn`;

    if (result.currentPlayer === "X") {
        gameStatus.style.color = "red";
    }
    else {
        gameStatus.style.color = "blue";
    }
}

function drawStartScreen(){
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Tic Tac Toe", canvas.width / 2, canvas.height / 3);

    // Start button
    ctx.fillStyle = "lightgray";
    ctx.fillRect(
        canvas.width / 2 - 100,
        canvas.height / 2 - 30,
        200,
        60
    );

    ctx.fillStyle = "black";
    ctx.font = "28px Arial";
    ctx.fillText(
        "Start",
        canvas.width / 2,
        canvas.height / 2
    );
}

function drawGameModeScreen(){
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "Select Game Mode",
        canvas.width / 2,
        canvas.height / 4
    );

    // Classic button
    ctx.fillStyle = "lightgray";
    ctx.fillRect(
        canvas.width / 2 - 120,
        canvas.height / 2 - 80,
        240,
        60
    );

    ctx.fillStyle = "black";
    ctx.font = "28px Arial";
    ctx.fillText(
        "Classic",
        canvas.width / 2,
        canvas.height / 2 - 50
    );

    // Ultimate button
    ctx.fillStyle = "lightgray";
    ctx.fillRect(
        canvas.width / 2 - 120,
        canvas.height / 2 + 20,
        240,
        60
    );

    ctx.fillStyle = "black";
    ctx.fillText(
        "Ultimate",
        canvas.width / 2,
        canvas.height / 2 + 50
    );
}

function drawWinScreen(){
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (gameResult.winner === "T") {
        ctx.fillText(
            "Game Tied!",
            canvas.width / 2,
            canvas.height / 3
        );
    }
    else {
        ctx.fillText(
            `${gameResult.winner} Wins!`,
            canvas.width / 2,
            canvas.height / 3
        );
    }

    // Play Again button
    ctx.fillStyle = "lightgray";
    ctx.fillRect(
        canvas.width / 2 - 120,
        canvas.height / 2 - 30,
        240,
        60
    );

    ctx.fillStyle = "black";
    ctx.font = "28px Arial";
    ctx.fillText(
        "Play Again",
        canvas.width / 2,
        canvas.height / 2
    );
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (scene) {
        case "START":
            drawStartScreen();
            break;

        case "GAME_MODE":
            drawGameModeScreen();
            break;

        case "GAME":
            currentGame.draw();
            break;

        case "WIN":
            drawWinScreen();
            break;
    }
}

function gameLoop() {
    if (scene === "GAME" && currentGame != null){
        currentGame.update();

        const result = currentGame.getResult();

        if (result.gameOver) {
            gameResult = result;
            scene = "WIN";
        }
    }
    draw();
    updateStatusBar();
    requestAnimationFrame(gameLoop);
}
gameLoop();