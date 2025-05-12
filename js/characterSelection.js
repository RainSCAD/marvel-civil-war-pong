// ✅ Player Selection State Variables
let player1Index = 0;
let player2Index = 0;
let player1Confirmed = false;
let player2Confirmed = false;
let player1Choice = null;
let player2Choice = null;


function setupCharacterSelectionScreen() {
    if (document.getElementById("character-selection-container")) {
        return; // Avoid duplicate UI
    }

    // ✅ Add title
    let title = document.createElement("h1");
    title.id = "character-selection-title";
    title.innerText = "Pick a Side!";
    document.body.appendChild(title);


    // ✅ Instructions below title
    let instructions = document.createElement("p");
    instructions.id = "character-selection-instructions";
    instructions.innerText = "Player 1 (W/S + Enter) • Player 2 (Arrow Keys + Enter)";
    document.body.appendChild(instructions);

    // ✅ Container for both teams
    let container = document.createElement("div");
    container.id = "character-selection-container";
    container.className = "character-selection-container";
    document.body.appendChild(container);


    // 🔴 Team Iron Man (Left)
    let ironManDiv = document.createElement("div");
    ironManDiv.id = "team-ironman";
    ironManDiv.innerHTML = `
        <h2>Team Iron Man</h2>
        <ul class="hero-list" id="ironman-list">
            <li>🦾 Iron Man - Repulsor Blast</li>
            <li>🚀 War Machine - Missile Barrage</li>
            <li>🔮 Vision - Density Shift</li>
            <li>🕵️ Black Widow - Stealth Dodge</li>
            <li>🐆 Black Panther - Speed Boost</li>
            <li>🕷️ Spider Man - Web Snare</li>
        </ul>`;
    container.appendChild(ironManDiv);

    // 🔵 Team Captain America (Right)
    let capDiv = document.createElement("div");
    capDiv.id = "team-cap";
    capDiv.innerHTML = `
        <h2>Team Captain America</h2>
        <ul class="hero-list" id="cap-list">
            <li>🛡️ Captain America - Shield Block</li>
            <li>🕊️ Falcon - Aerial Evasion</li>
            <li>💪 Bucky Barnes - Arm Slam</li>
            <li>🐜 Ant-Man - Shrink Dodge</li>
            <li>🔮 Scarlet Witch - Telekinesis Redirect</li>
            <li>🏹 Hawkeye - Precision Shot</li>
        </ul>`;
    container.appendChild(capDiv);

    // ✅ Grey Out Player 2 (For Now)
    document.getElementById("team-cap").classList.add("greyed-out");
}

/**
 * ✅ Draws the Character Selection Screen (Only When Needed)
 */
function drawCharacterSelectionScreen() {
    if (gameState !== "characterSelection") {
        console.warn("⚠️ drawCharacterSelectionScreen() running when gameState is", gameState, "- Stopping execution!");
        return;
    }

    setupCharacterSelectionScreen(); // ✅ Ensure UI is created before drawing

    background(charSelectBg);

    let ironmanList = document.getElementById("ironman-list")?.children;
    let capList = document.getElementById("cap-list")?.children;

    // ✅ Remove previous highlights & selection borders
    for (let hero of ironmanList) hero.classList.remove("highlight", "selected");
    for (let hero of capList) hero.classList.remove("highlight", "selected");

    // ✅ Highlight Player 1's selection (if not confirmed yet)
    if (!player1Confirmed) {
        ironmanList[player1Index].classList.add("highlight");
    } else {
        ironmanList[player1Index].classList.add("selected"); // ✅ Add green outline when confirmed
    }

    // ✅ Highlight Player 2's selection (only if Player 1 confirmed)
    if (player1Confirmed && !player2Confirmed) {
        document.getElementById("team-cap").classList.remove("greyed-out");
        capList[player2Index].classList.add("highlight");
    } else if (player2Confirmed) {
        capList[player2Index].classList.add("selected"); // ✅ Add green outline when confirmed
    }
}


/**
 * ✅ Handles Player Selection Input
 */
function handleCharacterSelectionInput() {
    console.log("🎮 Key Pressed in Character Selection!");

    let ironmanList = document.getElementById("ironman-list")?.children;
    let capList = document.getElementById("cap-list")?.children;

    if (!ironmanList || !capList) {
        console.error("🚨 ERROR: Hero lists not found! Character selection UI may not have loaded.");
        return;
    }

    if (!player1Confirmed) {
        if (keyCode === 87) player1Index = (player1Index - 1 + ironmanList.length) % ironmanList.length; // W key (Up)
        if (keyCode === 83) player1Index = (player1Index + 1) % ironmanList.length; // S key (Down)
        if (keyCode === ENTER) {
            console.log("✅ Player 1 selected:", ironmanList[player1Index].innerText);
            player1Confirmed = true;

            // ✅ Extract hero name while IGNORING emojis
            player1Choice = ironmanList[player1Index].innerText.replace(/^[^\w]+/, '').split(" - ")[0].trim();
            sessionStorage.setItem("player1Choice", player1Choice); // ✅ Store choice in sessionStorage
        }
    } else if (!player2Confirmed) {
        if (keyCode === UP_ARROW) player2Index = (player2Index - 1 + capList.length) % capList.length;
        if (keyCode === DOWN_ARROW) player2Index = (player2Index + 1) % capList.length;
        if (keyCode === ENTER) {
            console.log("✅ Player 2 selected:", capList[player2Index].innerText);
            player2Confirmed = true;

            // ✅ Extract hero name while IGNORING emojis
            player2Choice = capList[player2Index].innerText.replace(/^[^\w]+/, '').split(" - ")[0].trim();
            sessionStorage.setItem("player2Choice", player2Choice); // ✅ Store choice in sessionStorage

            // ✅ Call Ability Instructions & Start Countdown
            if (player1Confirmed && player2Confirmed) {
                console.log("✅ Both players locked in! Showing ability instructions...");

                console.log("✅ Player 1 Selected Hero:", player1Choice);
                console.log("✅ Player 2 Selected Hero:", player2Choice);

                console.log("🔍 Checking ability for Player 1:", getHeroAbility(player1Choice));
                console.log("🔍 Checking ability for Player 2:", getHeroAbility(player2Choice));

                let ability1 = getHeroAbility(player1Choice);
                let ability2 = getHeroAbility(player2Choice);

                if (!ability1 || !ability2) {
                    console.error("❌ Error: One or both abilities are undefined!");
                }

                console.log("📢 Calling showAbilityInstructions now...");

                showAbilityOverlay(player1Choice, ability1, player2Choice, ability2);


                // ✅ Start Countdown Once Players Are Ready
                let checkReadyInterval = setInterval(() => {
                    if (playersReady.player1 && playersReady.player2) {
                        console.log("✅ Both players ready! Starting final countdown...");
                        clearInterval(checkReadyInterval);
                        startCountdown(); // 🚀 Start the 5-sec countdown
                    }
                }, 500);
            }
        }
    }

    drawCharacterSelectionScreen(); // ✅ Update UI
}
