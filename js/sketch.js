// ✅ Global Game Variables
let gameState = "startScreen"; // Start on main screen
let backgroundToUse = null; // Active background image

// ✅ Background Images
let startBackground;
let heroListBackground;
let charSelectBg;
let playBackground;
let winLoseBackground;

// ✅ Soundtrack
let soundtrack;
let soundtrackStarted = false;

function preload() {
    console.log("🎵 Preloading assets...");

    startBackground = loadImage("media/Marvel_Start.jpg");
    heroListBackground = loadImage("media/Marvel_Start.jpg");
    charSelectBg = loadImage("media/character_selection_bg.jpg");
    playBackground = loadImage("media/play_screen_bg.jpg");
    winLoseBackground = loadImage("media/win_background.jpg");

    soundtrack = loadSound("media/Marvel Opening Theme.mp3");

    preloadHeroIcons();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log("🎮 Game initialized. Current state:", gameState);

    userStartAudio().then(() => startMusic());

    setInterval(increaseBallSpeed, 15000);

    changeBackground("startScreen");
    loop();
}

function draw() {
    background(backgroundToUse);

    switch (gameState) {
        case "startScreen":
            drawStartScreen();
            break;
        case "characterSelection":
            drawCharacterSelectionScreen();
            break;
        case "playing":
            drawPlayScreen();
            drawPong();
            break;
        case "winScreen":
            // Managed by DOM
            break;
        case "heroList":
            drawHeroListScreen();
            break;
        default:
            console.warn(`Unhandled gameState: ${gameState}`);
    }
}

function changeBackground(state) {
    switch (state) {
        case "startScreen":
            backgroundToUse = startBackground;
            break;
        case "characterSelection":
            backgroundToUse = charSelectBg;
            break;
        case "heroList":
            backgroundToUse = heroListBackground;
            break;
        case "playing":
            backgroundToUse = playBackground || color(0);
            break;
        case "winScreen":
            backgroundToUse = winLoseBackground || color(0);
            break;
        default:
            backgroundToUse = color(0);
    }
    redraw();
}

// ✅ Music Control
function startMusic() {
    if (soundtrack && !soundtrack.isPlaying()) {
        soundtrack.loop();
        console.log("🎵 Soundtrack started!");
        soundtrackStarted = true;
    }
}

function changeGameState(newState, winner = null) {
    console.log(`🔄 Changing gameState from ${gameState} ➡️ ${newState}`);
    gameState = newState;

    let scoreboard = document.getElementById("scoreboard");
    let countdownOverlay = document.getElementById("countdown-overlay");
    let winScreen = document.getElementById("win-screen");

    if (countdownOverlay) countdownOverlay.remove();
    if (winScreen) winScreen.remove();

    if (newState === "characterSelection") {
        document.getElementById("start-screen").style.display = "none";

        let scoreboard = document.getElementById("scoreboard");
        if (scoreboard) {
            //console.log("🗑️ Removing scoreboard from Character Selection...");
            scoreboard.remove();
        }

        // ✅ Reset scores before recreating the scoreboard
        player1Score = 0;
        player2Score = 0;

        if (scoreboard) {
            console.log("🗑️ Removing scoreboard from character selection...");
            scoreboard.remove();  // ✅ Ensures complete removal
        }
    }
    else if (newState === "playing") {
        removeCountdownOverlay();
        removeCharacterSelectionUI();

        setupPong();
        startBallSpeedIncrease();

        // ✅ Create Scoreboard ONLY if it doesn't exist
        let scoreboard = document.getElementById("scoreboard");
        if (!scoreboard) {
            scoreboard = document.createElement("div");
            scoreboard.id = "scoreboard";
            scoreboard.innerHTML = `<span id="player1-score">0</span> - <span id="player2-score">0</span>`;
            scoreboard.style.position = "absolute";
            scoreboard.style.top = "10px";
            scoreboard.style.left = "50%";
            scoreboard.style.transform = "translateX(-50%)";
            scoreboard.style.fontSize = "40px";
            scoreboard.style.color = "yellow";
            scoreboard.style.fontFamily = "Bangers, sans-serif";
            document.body.appendChild(scoreboard);
        } else {
            scoreboard.style.display = "block";  // ✅ Only show it again if it was hidden
        }

        setTimeout(drawPlayScreen, 500);

        if (typeof ball !== "undefined") {
            setInterval(increaseBallSpeed, 15000);
        }
    }
    else if (newState === "winScreen") {
        removeCountdownOverlay();
        removeCharacterSelectionUI();
        removePlayScreenUI();

        // Remove existing elements
        let oldWinScreen = document.getElementById("win-screen");
        if (oldWinScreen) oldWinScreen.remove();

        // Create win-screen element
        let winScreen = document.createElement("div");
        winScreen.id = "win-screen";
        winScreen.style.position = "fixed";
        winScreen.style.width = "100%";
        winScreen.style.height = "100%";
        winScreen.style.backgroundImage = "url('media/win_background.jpg')";
        winScreen.style.backgroundSize = "cover";
        winScreen.style.backgroundPosition = "center";
        winScreen.style.display = "flex";
        winScreen.style.flexDirection = "column";
        winScreen.style.justifyContent = "center";
        winScreen.style.alignItems = "center";
        document.body.appendChild(winScreen);

        // Color overlay
        let overlay = document.createElement("div");
        overlay.classList.add("win-overlay");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = (winner === "Team Iron Man") ? "rgba(255, 0, 0, 0.4)" : "rgba(0, 0, 255, 0.4)";
        winScreen.appendChild(overlay);

        // Winner Message
        let winnerMessage = document.createElement("h1");
        winnerMessage.id = "winner-message";
        winnerMessage.innerHTML = `🏆 <span>${winner} WINS!</span>`;
        winnerMessage.style.color = winner === "Team Iron Man" ? "red" : "blue";
        winnerMessage.style.fontSize = "60px";
        winnerMessage.style.textShadow = "0 0 20px yellow";
        winnerMessage.style.fontFamily = "Bangers, sans-serif";
        winScreen.appendChild(winnerMessage);

        // Buttons
        let buttonContainer = document.createElement("div");
        buttonContainer.id = "win-buttons";
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "20px";
        buttonContainer.style.position = "absolute";
        buttonContainer.style.bottom = "15%";
        buttonContainer.style.left = "50%";
        buttonContainer.style.transform = "translateX(-50%)";
        winScreen.appendChild(buttonContainer);

        // Rematch button
        let rematchButton = document.createElement("button");
        rematchButton.innerHTML = "🔄 Rematch";
        rematchButton.onclick = () => changeGameState("characterSelection");
        buttonContainer.appendChild(rematchButton);

        // Back to Menu button
        let menuButton = document.createElement("button");
        menuButton.innerHTML = "🏠 Back to Menu";
        menuButton.onclick = () => changeGameState("startScreen");
        buttonContainer.appendChild(menuButton);
    }

    else if (newState === "startScreen") {
        let startScreen = document.getElementById("start-screen");
        if (startScreen) startScreen.style.display = "flex";
        if (scoreboard) scoreboard.style.display = "none";
        if (winScreen) winScreen.remove();
    }

    changeBackground(newState);
    redraw();
}


function removeCharacterSelectionUI() {
    ["character-selection-title", "character-selection-instructions", "character-selection-container"].forEach(id => {
        let element = document.getElementById(id);
        if (element) element.remove();
    });
}

function keyPressed() {
    if (gameState === "characterSelection") {
        handleCharacterSelectionInput();
    } else if (gameState === "playing") {
        if (key === "q" && player1Cooldown <= 0) {
            activateAbility(1, player1Choice);
            player1Cooldown = cooldownTime;
        } else if (key === "p" && player2Cooldown <= 0) {
            activateAbility(2, player2Choice);
            player2Cooldown = cooldownTime;
        }
    }
}

function showAbilityInstructions(player1Hero, player2Hero) {
    console.log("📝 Showing ability instructions...");

    // Create Overlay
    let overlay = document.createElement("div");
    overlay.id = "ability-instructions";

    // Player 1 Side
    let leftSide = document.createElement("div");
    leftSide.className = "ability-left";
    leftSide.innerHTML = `
        <h2 class="ability-text">🔴 Player 1: Press Q to use ability!</h2>
        <p class="cooldown-text">Cooldown: 30 seconds</p>
        <h3>${player1Hero.name} - ${player1Hero.ability}</h3>
        <p>${player1Hero.abilityDescription}</p>
        <button class="ready-button" id="ready-p1">✅ Ready</button>
    `;

    // Player 2 Side
    let rightSide = document.createElement("div");
    rightSide.className = "ability-right";
    rightSide.innerHTML = `
        <h2 class="ability-text">🔵 Player 2: Press P to use ability!</h2>
        <p class="cooldown-text">Cooldown: 30 seconds</p>
        <h3>${player2Hero.name} - ${player2Hero.ability}</h3>
        <p>${player2Hero.abilityDescription}</p>
        <button class="ready-button" id="ready-p2">✅ Ready</button>
    `;

    overlay.appendChild(leftSide);
    overlay.appendChild(rightSide);
    document.body.appendChild(overlay);

    // ✅ Event Listeners for "Ready" Buttons
    let p1Ready = false;
    let p2Ready = false;

    document.getElementById("ready-p1").addEventListener("click", () => {
        p1Ready = true;
        document.getElementById("ready-p1").disabled = true;
        checkBothPlayersReady();
    });

    document.getElementById("ready-p2").addEventListener("click", () => {
        p2Ready = true;
        document.getElementById("ready-p2").disabled = true;
        checkBothPlayersReady();
    });

    function checkBothPlayersReady() {
        if (p1Ready && p2Ready) {
            console.log("✅ Both players are ready! Starting countdown...");
            document.body.removeChild(overlay);
            startCountdownOverlay();
        }
    }
}

// ✅ Resize Canvas
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
