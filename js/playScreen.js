function startGameWithHeroes() {
    console.log("🔥 Both players confirmed! Showing ability instructions...");


    // ✅ Show Ability Instructions FIRST
    let player1Hero = player1Choice;
    let player1Ability = getHeroAbility(player1Hero);
    let player2Hero = player2Choice;
    let player2Ability = getHeroAbility(player2Hero);
    
    console.log("📜 Calling showAbilityInstructions...");
    showAbilityInstructions(player1Hero, player1Ability, player2Hero, player2Ability);

    // Wait for both players to press "Ready"
    let playersReady = false;

    function checkPlayersReady() {
        if (player1Ready && player2Ready) {
            playersReady = true;
            startCountdown();
        } else {
            setTimeout(checkPlayersReady, 500); // Check again after 500ms
        }
    }

    function startCountdown() {
        console.log("⏳ Starting 5-second countdown...");

        let countdown = 5; // Reset countdown
        let countdownText = document.getElementById("countdown-text");

        let countdownInterval = setInterval(() => {
            if (countdownText) countdownText.innerText = countdown; // ✅ Update countdown

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                let overlay = document.getElementById("countdown-overlay");
                if (overlay) overlay.remove(); // 🚀 Remove countdown overlay
                startPlayScreen(); // ✅ Transition to play screen
            }
            countdown--;
        }, 1000);
    }

    checkPlayersReady(); // Start checking if players are ready
}

// ✅ Remove Countdown and Load Play Screen
function startPlayScreen() {
    console.log("🎮 Switching to Play Screen!");

    removeCountdownOverlay();

    gameState = "playing";
    changeGameState("playing"); // ✅ Change state

    // ✅ Ensure scoreboard is created or displayed
    let scoreboard = document.getElementById("scoreboard");
    if (!scoreboard) {
        console.log("📊 Creating Scoreboard...");
        scoreboard = document.createElement("div");
        scoreboard.id = "scoreboard";
        scoreboard.innerHTML = `<span id="player1-score">0</span> - <span id="player2-score">0</span>`;
        document.body.appendChild(scoreboard);
    } else {
        //console.warn("⚠️ Scoreboard already exists!");
    }

    setTimeout(() => {
        drawPlayScreen();
    }, 500);
}

function drawPlayScreen() {
    background(playBackground);

    // ✅ Draw Scoreboard
    //drawScoreboard();

    // ✅ Check if icons are loaded
    if (!player1Icon || !player2Icon) {
        //console.warn("⚠️ Player icons not loaded yet! Retrying...");
        setTimeout(drawPlayScreen, 500); // ✅ Retry every 500ms
        return;
    }

    //console.log("✅ Player icons loaded! Showing them on screen...");

    // ✅ Adjust Hero Icon Positions
    let player1X = 50; // 🔴 Left side of screen
    let player2X = width - 150; // 🔵 Right side of screen
    let playerY = height / 2 - 50; // 🔽 Centered vertically

    //console.log("✅ Player icons loaded! Showing them on screen...");
    image(player1Icon, paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    image(player2Icon, paddle2.x, paddle2.y, paddleWidth, paddleHeight);
}

// Removes all DOM elements or UI related to Play Screen
function removePlayScreenUI() {
    let elementsToRemove = ["scoreboard", "cooldown-bars"];
    elementsToRemove.forEach(id => {
        let el = document.getElementById(id);
        if (el) el.remove();
    });

    // If debris are p5.js objects, clear their array:
    debris = [];
    console.log("🧹 Play screen UI cleaned up!");
}
