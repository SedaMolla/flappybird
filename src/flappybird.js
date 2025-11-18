// =======================
// Board (canvas) setup
// =======================
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// =======================
// Bird setup
// =======================
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

// Bird physics
let gravity = 0.5; // controls how fast the bird falls
let jump = -8; // controls how high the bird jumps

// =======================
// Pipes setup
// =======================
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let toppipeImg;
let bottompipeImg;

// =======================
// On window load
// =======================
window.onload = function () {
  // Find and set up the canvas
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // Load bird image
  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  // Load pipe images
  toppipeImg = new Image();
  toppipeImg.src = "./toppipe.png";

  bottompipeImg = new Image();
  bottompipeImg.src = "./bottompipe.png";

  // Start the game loop
  requestAnimationFrame(update);
};

// =======================
// Draw the bird
// =======================
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

// =======================
// Main game loop
// =======================
function update() {
  // Clear the canvas
  context.clearRect(0, 0, board.width, board.height);

  // Apply gravity (bird falls down)
  birdY += gravity;

  // Prevent bird from going below the ground
  if (birdY > boardHeight - birdHeight) {
    birdY = boardHeight - birdHeight;
    showGameOver(); // show game over message
    return; // stop the loop
  }

  // Redraw the bird
  drawBird();

  // Continue the loop
  requestAnimationFrame(update);
}

// =======================
// Handle keyboard input
// =======================
function handleKeydown(e) {
  if (e.code === "Space") {
    // Jump up by reducing Y position
    birdY += jump; // negative value makes the bird go up
  }
}

document.addEventListener("keydown", handleKeydown);

// =======================
// Game Over message
// =======================
function showGameOver() {
  context.fillStyle = "red";
  context.font = "40px Arial";
  context.fillText("GAME OVER!", 80, 320);
}
