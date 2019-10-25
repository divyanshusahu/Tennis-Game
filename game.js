var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;
var ballSpeedX = 10;
var ballSpeedY = 5;
var frames = 30;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
var player1Score = 0;
var compScore = 0;
const winScore = 5;
var showWinScreen = false;

window.onload = function () {
    canvas = document.getElementById('game');
    canvasContext = canvas.getContext('2d');
    setInterval(callEverything, 1000 / frames);
    canvas.addEventListener('mousedown', function () {
        if (showWinScreen) {
            player1Score = 0;
            compScore = 0;
            showWinScreen = false;
        }
    })
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = calMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}

function callEverything() {
    draw();
    move();
}

function calMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function drawNet() {
    for (i = 0; i <= canvas.height; i += 40) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect((canvas.width / 2) - 1, i, 2, 20);
    }
}

function draw() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    if (showWinScreen) {
        canvasContext.fillStyle = 'white';
        if (player1Score >= winScore)
            canvasContext.fillText("Left player won", 350, 100);
        else {
            canvasContext.fillText("Computer won", 350, 100);
        }
        canvasContext.fillText("Click to continue", 350, 500);
        return;
    }

    drawNet();
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(5, paddle1Y, 10, PADDLE_HEIGHT); // left paddle
    canvasContext.fillRect(785, paddle2Y, 10, PADDLE_HEIGHT); // right paddle
    // ball
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(compScore, canvas.width - 100, 100);

}

function move() {
    if (showWinScreen)
        return;

    paddle2move();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    var diffY;

    if (ballX <= 15) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            diffY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = diffY * 0.5;
        } else {
            compScore++;
            ballReset();
        }
    }
    if (ballX >= 785) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            diffY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = diffY * 0.5;
        } else {
            player1Score++;
            ballReset();
        }
    }
    if (ballY <= 10 || ballY >= 590)
        ballSpeedY = -ballSpeedY;
}

function paddle2move() {
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
    if (ballY < paddle2YCenter - 35 && ballSpeedX > 0)
        paddle2Y -= 20;
    else if (ballY > paddle2YCenter + 35 && ballSpeedX > 0) {
        paddle2Y += 20;
    }
}

function ballReset() {
    if (player1Score >= winScore || compScore >= winScore)
        showWinScreen = true;
    ballSpeedY = 4 + Math.floor(Math.random() * 5);
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
