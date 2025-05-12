// core Pong Mechanics

// ✅ Global Variables
let paddleWidth = 50;
let paddleHeight = 100;
let paddle1, paddle2;
let ball;
let player1Score = 0;
let player2Score = 0;


// ✅ 2. Setup Functions (Game Initialization)
function setupPong() {
    console.log("🎮 Setting up Pong...");

    // ✅ Ensure player choices are not null
    if (!player1Choice || !player2Choice) {
        console.error("🚨 ERROR: Player choices are NULL! Check character selection.");
        return;
    }

    console.log("Player 1 Choice:", player1Choice);
    console.log("Player 2 Choice:", player2Choice);

    // ✅ Clean up player choices before assigning icons
    player1Choice = player1Choice.replace(/[^a-zA-Z\s-]/g, "").trim();
    player2Choice = player2Choice.replace(/[^a-zA-Z\s-]/g, "").trim();

    // ✅ Assign hero icons
    player1Icon = heroIcons[player1Choice];
    player2Icon = heroIcons[player2Choice];

    if (!player1Icon || !player2Icon) {
        console.error("🚨 Hero icons failed to load! Check heroIcons.js and file paths.");
    }

    // ✅ Initialize Ball & Paddles
    ball = { x: windowWidth / 2, y: windowHeight / 2, speedX: 5, speedY: 5, size: 20 };

    paddle1 = {
        x: 50,
        y: windowHeight / 2 - 50,
        width: 100,
        height: 100,
        speed: 10,
        invisible: false,
        intangible: false
    };

    paddle2 = {
        x: windowWidth - 150,
        y: windowHeight / 2 - 50,
        width: 100,
        height: 100,
        speed: 10,
        invisible: false,
        intangible: false
    };

    startDebris();
    startBallSpeedIncrease();
}



function drawPong() {
    background(playBackground);
    drawPaddles();
    drawBall();
    movePlayer1();
    movePlayer2();
    moveBall();
    checkCollisions();
    checkBallOutOfBounds();

    updateCooldowns(); // Update cooldown timer
    drawCooldownBars(); // Visual cooldown bars
    drawDebris();
}

// ✅ 4. Movement & Game Logic
function moveBall() {
    //console.log(`🟢 Ball moving: X=${ball.x}, Y=${ball.y}`);

    ball.x += ball.speedX;
    ball.y += ball.speedY;
    if (ball.y < 0 || ball.y > height) {
        ball.speedY *= -1;
    }
    if (ball.x < 0 || ball.x > width) {
        //console.log("🏆 Game Over - Ball Left the Screen!");
    }
}
function checkCollisions() {
    if (!paddle1.intangible && ball.x - ball.size / 2 < paddle1.x + paddleWidth &&
        ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) {
        ball.speedX *= -1;
    }

    if (!paddle2.intangible && ball.x + ball.size / 2 > paddle2.x &&
        ball.y > paddle2.y && ball.y < paddle2.y + paddleHeight) {
        ball.speedX *= -1;
    }
}
function movePlayer1() {
    if (keyIsDown(87)) {
        paddle1.y = max(0, paddle1.y - paddle1.speed);
    }
    if (keyIsDown(83)) {
        paddle1.y = min(height - paddleHeight, paddle1.y + paddle1.speed);
    }
}
function movePlayer2() {
    if (keyIsDown(UP_ARROW)) {
        paddle2.y = max(0, paddle2.y - paddle2.speed);
    }
    if (keyIsDown(DOWN_ARROW)) {
        paddle2.y = min(height - paddleHeight, paddle2.y + paddle2.speed);
    }
}

function resetBall(scoringPlayer) {
    ball.x = width / 2;
    ball.y = height / 2;

    // Determine the direction based on the scoring player
    let direction = scoringPlayer === 1 ? 1 : -1;

    // Random angle between -45° and 45° but never too flat
    let angle = random(-PI / 4, PI / 4);
    while (abs(angle) < PI / 12) {  // prevent angles too close to horizontal
        angle = random(-PI / 4, PI / 4);
    }

    let baseSpeed = 5; // Base speed reset
    ball.speedX = baseSpeed * cos(angle) * (scoringPlayer === 1 ? 1 : -1); // send to the opposite player
    ball.speedY = baseSpeed * sin(angle) * (random() < 0.5 ? 1 : -1);

    console.log(`✅ Ball Reset: angle=${angle.toFixed(2)}, speedX=${ball.speedX.toFixed(2)}, speedY=${ball.speedY.toFixed(2)}`);
}

function increaseBallSpeed() {
    if (!ball) {
        //console.warn("⚠️ Ball is undefined. Skipping speed increase.");
        return;
    }

    if (abs(ball.speedX) < 12 && abs(ball.speedY) < 12) {
        ball.speedX *= 1.1;
        ball.speedY *= 1.1;
        //console.log(`🔥 Ball Speed Increased! New speeds: speedX=${ball.speedX.toFixed(2)}, speedY=${ball.speedY.toFixed(2)}`);
    } else {
        //console.log("⚠️ Max ball speed reached. No further increase.");
    }
}

function startBallSpeedIncrease() {
    clearInterval(window.ballSpeedInterval); // Prevent duplicate intervals
    window.ballSpeedInterval = setInterval(increaseBallSpeed, 15000);
    console.log("🚀 Ball speed boost activated every 15 seconds!");
}


function drawBall() {
    //console.log("⚪ Drawing Ball at:", ball.x, ball.y);
    fill(255);
    ellipse(ball.x, ball.y, ball.size);
}

function drawPaddles() {
    push();
    imageMode(CENTER);

    if (!paddle1.invisible) {
        image(player1Icon, paddle1.x + paddle1.width / 2, paddle1.y + paddle1.height / 2, paddle1.width, paddle1.height);
    }

    if (!paddle2.invisible) {
        image(player2Icon, paddle2.x + paddle2.width / 2, paddle2.y + paddle2.height / 2, paddle2.width, paddle2.height);
    }
    pop();
}

function updatePong() {
    movePlayer1();
    movePlayer2();
    drawPong();
}

function updateScore(winner) {
    if (winner === "player1") {
        player1Score++;
        console.log(`📊 Score Updated! Player 1: ${player1Score} | Player 2: ${player2Score}`);

        let p1Element = document.getElementById("player1-score");
        if (p1Element) {
            p1Element.innerText = player1Score;
        } else {
            console.warn("⚠️ player1-score element not found in HTML!");
        }

    } else if (winner === "player2") {
        player2Score++;
        console.log(`📊 Score Updated! Player 1: ${player1Score} | Player 2: ${player2Score}`);

        let p2Element = document.getElementById("player2-score");
        if (p2Element) {
            p2Element.innerText = player2Score;
        } else {
            console.warn("⚠️ player2-score element not found in HTML!");
        }
    }
}


function checkBallOutOfBounds() {
    if (player1Score >= 5) { // ✅ Set winning condition
        console.log("🏆 Team Iron Man Wins! Calling endGame...");
        endGame("player1"); // ✅ Call endGame instead of changeGameState
        return;
    } else if (player2Score >= 5) {
        console.log("🏆 Team Captain America Wins! Calling endGame...");
        endGame("player2"); // ✅ Call endGame instead of changeGameState
        return;
    }

    if (ball.x < 0) {
        console.log("🏆 Ball left screen on Player 1's side! Player 2 scores.");
        updateScore("player2");
        console.log("🔄 Calling resetBall() for Player 2...");
        resetBall(2);  // ✅ Pass the scoring player to resetBall()
    } else if (ball.x > width) {
        console.log("🏆 Ball left screen on Player 2's side! Player 1 scores.");
        updateScore("player1");
        resetBall(1);  // ✅ Pass the scoring player to resetBall()
    }
}

function endGame(winningPlayer) {
    console.log(`🎉 ${winningPlayer.toUpperCase()} WINS! Transitioning to win screen...`);

    changeGameState("winScreen", winningPlayer); // Pass winner to state change

    // ✅ Remove existing win screen elements if they exist
    let existingWinScreen = document.getElementById("win-screen");
    if (existingWinScreen) existingWinScreen.remove();

    // ✅ Create Win Screen Container
    let winScreen = document.createElement("div");
    winScreen.id = "win-screen";
    winScreen.style.position = "fixed";
    winScreen.style.width = "100%";
    winScreen.style.height = "100%";
    winScreen.style.top = "0";
    winScreen.style.left = "0";
    winScreen.style.backgroundImage = "url('media/win_background.jpg')";
    winScreen.style.backgroundSize = "cover";
    winScreen.style.backgroundPosition = "center";
    winScreen.style.display = "flex";
    winScreen.style.flexDirection = "column";
    winScreen.style.justifyContent = "center";
    winScreen.style.alignItems = "center";
    winScreen.style.zIndex = "9999"; // Ensure visibility above canvas
    document.body.appendChild(winScreen);
    console.log("✅ Win screen added to DOM");

    // ✅ Overlay Effect
    let overlay = document.createElement("div");
    overlay.classList.add("win-overlay");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = winningPlayer === "player1" ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 255, 0.5)";
    winScreen.appendChild(overlay);
    console.log("✅ Overlay added");

    // ✅ Winner Message
    let winnerMessage = document.createElement("div");
    winnerMessage.id = "winner-message";
    winnerMessage.innerText = winningPlayer === "player1" ? "🏆 Team Iron Man Wins!" : "🏆 Team Captain America Wins!";
    winnerMessage.style.fontSize = "60px";
    winnerMessage.style.color = "white";
    winnerMessage.style.textShadow = "0 0 10px yellow, 0 0 20px red, 0 0 40px darkred";
    winnerMessage.style.fontFamily = "Bangers, sans-serif";
    winnerMessage.style.background = "rgba(0, 0, 0, 0.5)";
    winnerMessage.style.padding = "20px";
    winnerMessage.style.borderRadius = "10px";
    winnerMessage.style.position = "absolute";
    winnerMessage.style.top = "30%";  // ✅ Adjusted position to ensure visibility
    winnerMessage.style.left = "50%";
    winnerMessage.style.transform = "translate(-50%, -50%)";
    winScreen.appendChild(winnerMessage);
    console.log("🏆 Winner Message Created:", winnerMessage);

    // ✅ Buttons Container
    showWinScreenButtons(winScreen);
}

function showWinScreenButtons(winScreen) {
    let buttonContainer = document.createElement("div");
    buttonContainer.id = "win-buttons";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "20px";
    buttonContainer.style.position = "absolute";
    buttonContainer.style.bottom = "15%";
    buttonContainer.style.left = "50%";
    buttonContainer.style.transform = "translateX(-50%)";

    // ✅ Rematch Button
    let rematchButton = document.createElement("button");
    rematchButton.id = "rematch-button";
    rematchButton.innerText = "🔄 Rematch";
    rematchButton.style.padding = "10px 20px";
    rematchButton.style.fontSize = "24px";
    rematchButton.style.cursor = "pointer";
    rematchButton.onclick = () => restartGame();
    buttonContainer.appendChild(rematchButton);

    // ✅ Back to Menu Button
    let menuButton = document.createElement("button");
    menuButton.id = "menu-button";
    menuButton.innerText = "🏙️ Back to Avengers Tower";
    menuButton.style.padding = "10px 20px";
    menuButton.style.fontSize = "24px";
    menuButton.style.cursor = "pointer";
    menuButton.onclick = () => changeGameState("startScreen");
    buttonContainer.appendChild(menuButton);

    winScreen.appendChild(buttonContainer);
    console.log("🎮 Win Buttons Created:", buttonContainer);
}

function restartGame() {
    console.log("🔄 Restarting Game...");

    // ✅ Remove Win Screen Elements
    let winnerText = document.getElementById("winner-message");
    let buttonContainer = document.getElementById("win-buttons");
    let oldWinScreen = document.getElementById("win-screen");
    let scoreboard = document.getElementById("scoreboard");

    if (winnerText) winnerText.remove();
    if (buttonContainer) buttonContainer.remove();
    if (oldWinScreen) oldWinScreen.remove();
    if (scoreboard) {
        console.log("🗑️ Removing scoreboard from character selection...");
        scoreboard.remove();  // ✅ Ensures complete removal
    }

    // ✅ Reset Scores
    player1Score = 0;
    player2Score = 0;

    // ✅ Reset Player Selections
    player1Confirmed = false;
    player2Confirmed = false;
    player1Choice = null;
    player2Choice = null;
    player1Index = 0;
    player2Index = 0;

    console.log("✅ Players can now reselect their heroes!");

    // ✅ Countdown Overlay
    let countdownOverlay = document.createElement("div");
    countdownOverlay.id = "countdown-overlay";
    countdownOverlay.style.position = "fixed";
    countdownOverlay.style.width = "100%";
    countdownOverlay.style.height = "100%";
    countdownOverlay.style.top = "0";
    countdownOverlay.style.left = "0";
    countdownOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    countdownOverlay.style.color = "white";
    countdownOverlay.style.display = "flex";
    countdownOverlay.style.justifyContent = "center";
    countdownOverlay.style.alignItems = "center";
    countdownOverlay.style.fontSize = "80px";
    countdownOverlay.style.fontFamily = "Bangers, sans-serif";
    countdownOverlay.innerText = "Reselect Your Hero! 3";
    document.body.appendChild(countdownOverlay);

    let countdown = 3;
    let countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownOverlay.innerText = `Reselect Your Hero! ${countdown}`;
        } else {
            clearInterval(countdownInterval);
            countdownOverlay.remove();
            changeGameState("characterSelection");
        }
    }, 1000);
}
