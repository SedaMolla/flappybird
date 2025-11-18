// =======================
// Board (canvas) setup
// =======================
let board;
let boardWidth = 360;
let boardHeight = 640;
let context; // 2D drawing context for the canvas

// =======================
// Bird setup
// =======================
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8; // Bird horizontal position (fixed)
let birdY = boardHeight / 2; // Bird vertical position (changes)
let birdImg; // Image object for the bird

// =======================
// Bird physics
// =======================
let gravity = 0.5; // Pulls the bird down every frame
let velocity = 0; // Bird's vertical speed (positive = going down)
let jumpStrength = -8; // How strong the jump is when pressing Space

// =======================
// Game state
// =======================
let gameState = "RUNNING"; // Can be "RUNNING" or "GAME_OVER"

// =======================
// Pipes setup
// =======================
// 🔴 NEW IN WEEK 8: We store all pipes inside this array.
// Each pipe is an object with x, y, width, height, img.
let pipeArray = [];

let pipeWidth = 64; // Pipe image width
let pipeHeight = 512; // Pipe image height
let pipeGap = 150; // Vertical space between top and bottom pipes
let pipeVelocityX = -2; // How fast pipes move to the left

let toppipeImg; // Image for the top pipe
let bottompipeImg; // Image for the bottom pipe

// 🔴 NEW IN WEEK 8: Frame counter for pipe spawning timing
let frameCount = 0;
let pipeSpawnInterval = 120; // Every 120 frames we create a new pipe pair

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

  // 🔴 NEW IN WEEK 8:
  // Start the game with one initial pipe pair on the right side.
  createPipePair();

  // Start the game loop
  requestAnimationFrame(update);
};

// =======================
// Main game loop
// =======================
function update() {
  // If the game is over, stop updating the game state.
  if (gameState === "GAME_OVER") return;

  // Schedule the next frame
  requestAnimationFrame(update);

  // Clear the canvas before redrawing
  context.clearRect(0, 0, board.width, board.height);

  // -----------------------
  // Bird physics
  // -----------------------
  // Apply gravity to the bird's vertical speed
  velocity += gravity;

  // Update the bird's vertical position
  birdY += velocity;

  // Ceiling limit: prevent the bird from going above the screen
  if (birdY < 0) {
    birdY = 0;
    velocity = 0; // Stop moving upwards
  }

  // Floor limit : if the bird hits the ground, it's game over
  if (birdY + birdHeight > boardHeight) {
    birdY = boardHeight - birdHeight;
    gameOver();
  }

  // -----------------------
  // Pipe spawning logic
  // -----------------------
  // 🔴 NEW IN WEEK 8:
  // We count frames to control how often we create new pipe pairs.
  frameCount++;

  // Every "pipeSpawnInterval" frames, create a new pair of pipes.
  if (frameCount % pipeSpawnInterval === 0) {
    createPipePair();
  }

  // -----------------------
  // Draw / update everything
  // -----------------------

  // 🔴 NEW IN WEEK 8:
  // Move and draw all pipes from the pipeArray using a loop.
  moveAndDrawPipes();

  // Draw the bird after the pipes
  drawBird();
}

// =======================
// Draw the bird
// =======================
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

// =======================
// Pipes: movement and drawing
// =======================
// 🔴 NEW IN WEEK 8:
// This function loops over the pipeArray and:
// 1. Moves each pipe to the left.
// 2. Draws each pipe on the canvas.
// 3. Removes pipes that are completely off the screen.
function moveAndDrawPipes() {
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];

    // Move the pipe to the left
    pipe.x += pipeVelocityX;

    // Draw the pipe image at its current position
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    // If the pipe has moved completely off the left side of the screen,
    // remove it from the array to keep the array small and clean.
    if (pipe.x + pipe.width < 0) {
      pipeArray.splice(i, 1);
      i--; // Adjust index because we removed an element
    }
  }
}

// =======================
// Input handler
// =======================
// We use a single keydown listener for all controls.
document.addEventListener("keydown", (e) => {
  // Space makes the bird jump if game is running
  if (e.code === "Space" && gameState === "RUNNING") {
    velocity = jumpStrength; // Give the bird an instant upward speed
  }
  // R restarts the game after game over
  if (e.code === "KeyR" && gameState === "GAME_OVER") {
    resetGame();
  }
});

// =======================
// Game over and restart
// =======================
function gameOver() {
  gameState = "GAME_OVER";

  // Draw "Game Over" text
  context.fillStyle = "red";
  context.font = "40px Arial";
  context.textAlign = "center";
  context.fillText("GAME OVER!", boardWidth / 2, boardHeight / 2);

  context.font = "20px Arial";
  context.fillText("Press R to Restart", boardWidth / 2, boardHeight / 2 + 40);
}

function resetGame() {
  // Reset bird position and vertical speed
  birdY = boardHeight / 2;
  velocity = 0;

  // Reset game state
  gameState = "RUNNING";

  // 🔴 NEW IN WEEK 8:
  // Reset pipes and frame counter so the game starts clean.
  pipeArray = [];
  frameCount = 0;
  createPipePair(); // Start with one pipe pair again

  // Start the game loop again
  update();
}

// =======================
// Create a pair of pipes
// =======================
// 🔴 NEW IN WEEK 8:
// This function creates a *top* pipe and a *bottom* pipe
// with a vertical gap between them and pushes them into the pipeArray.
function createPipePair() {
  // Choose a random vertical offset so the gap position is different each time.
  // Negative Y means the top pipe is moved upwards (so only part is visible).
  let randomPipeY = -Math.floor(Math.random() * 200) - 100;

  // Top pipe object
  let topPipe = {
    x: boardWidth, // Start at the right edge of the board
    y: randomPipeY, // Random vertical offset
    width: pipeWidth,
    height: pipeHeight,
    img: toppipeImg,
  };

  // Bottom pipe object
  let bottomPipe = {
    x: boardWidth, // Same x as the top pipe
    y: randomPipeY + pipeHeight + pipeGap, // Positioned below the top pipe + gap
    width: pipeWidth,
    height: pipeHeight,
    img: bottompipeImg,
  };

  // Add both pipes to the array
  pipeArray.push(topPipe);
  pipeArray.push(bottomPipe);
}
