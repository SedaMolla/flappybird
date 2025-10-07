// Board (canvas)
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;


// Bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

// Pipes
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let toppipeImg;
let bottompipeImg;

window.onload = function () {
  // Find and set up the canvas
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // Background test (optional)
  // context.fillStyle = "green";
  // context.fillRect(100, 100, 30, 50);

  // Load images
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () 
  {
    // Draw the bird
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  };

  toppipeImg = new Image();
  toppipeImg.src = "./toppipe.png";
  toppipeImg.onload = function () 
  {
    // Draw the top pipe
    context.drawImage(toppipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
  };

  bottompipeImg = new Image();
  bottompipeImg.src = "./bottompipe.png";
  bottompipeImg.onload = function () 
  {
    // Draw the bottom pipe (slightly lower)
    let gap = 150; // space for the bird to pass through
    context.drawImage( bottompipeImg, pipeX, pipeY + pipeHeight + gap, pipeWidth, pipeHeight);
  };
};

