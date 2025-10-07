// Tahta (canvas)
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Kuş
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

// Borular
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

window.onload = function () {
  // Canvas'ı bul ve ayarla
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // Arka plan testi (opsiyonel)
  // context.fillStyle = "green";
  // context.fillRect(100, 100, 30, 50);

  // Görselleri yükle
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    // Kuşu çiz
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";
  topPipeImg.onload = function () {
    // Üst boru
    context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
  };

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";
  bottomPipeImg.onload = function () {
    // Alt boru (biraz aşağıda)
    let gap = 150; // kuşun geçeceği boşluk
    context.drawImage(
      bottomPipeImg,
      pipeX,
      pipeY + pipeHeight + gap,
      pipeWidth,
      pipeHeight
    );
  };
};
