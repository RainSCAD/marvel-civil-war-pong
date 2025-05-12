let menuOptions = ["▶ Start Game", "🦸‍♂️ Hero List", "⚙️ Settings"];
let menuIndex = 0; // ✅ Tracks menu selection

function drawStartScreen() {

    document.getElementById("start-screen").style.display = "flex";

    // ✅ Update Menu Highlighting in HTML
    for (let i = 0; i < menuOptions.length; i++) {
        let optionElement = document.getElementById(`menuOption${i}`);
        if (optionElement) {
            optionElement.classList.toggle("highlight", i === menuIndex);
        }
    }
}

// ✅ Handle Menu Navigation
function keyPressed() {
    if (gameState === "startScreen") {
        if (keyCode === UP_ARROW) {
            menuIndex = (menuIndex - 1 + menuOptions.length) % menuOptions.length;
        } else if (keyCode === DOWN_ARROW) {
            menuIndex = (menuIndex + 1) % menuOptions.length;
        } else if (keyCode === ENTER) {
            selectMenuOption();
        }

        drawStartScreen(); // ✅ Update the menu UI dynamically
    }
}

// ✅ Handles Selection Logic
function selectMenuOption() {
    if (menuIndex === 0) {
        startGame();
    } else if (menuIndex === 1) {
        openHeroList();
    } else if (menuIndex === 2) {
        openSettings();
    }
}

// ✅ Start Game (Goes to Character Selection)
function startGame() {
    console.log("🎮 Starting Game...");
    gameState = "characterSelection";
    changeGameState("characterSelection");

    // ✅ Hide the start screen UI
    document.getElementById("start-screen").style.display = "none";
}


// ✅ Open Hero List
function openHeroList() {
    console.log("📜 Opening Hero List...");
    gameState = "heroList";
    changeGameState("heroList");

    // Hide the start screen UI
    document.getElementById("start-screen").style.display = "none";
}

// ✅ Open Settings (Placeholder)
function openSettings() {
    console.log("⚙️ Settings (Placeholder) - No functionality yet.");
}

// ✅ Expose Functions to Global Scope
window.startGame = startGame;
window.openHeroList = openHeroList;
window.showStartScreen = drawStartScreen;
window.openSettings = openSettings;
