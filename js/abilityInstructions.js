let playersReady = { player1: false, player2: false };


window.getHeroAbility = function (heroName) {
    const abilities = {
        "Iron Man": { name: "Repulsor Blast", description: "Fires energy from Iron Man's hand, pushing the ball back." },
        "War Machine": { name: "Missile Barrage", description: "Fires multiple missiles that disrupt the ball’s movement." },
        "Vision": { name: "Density Shift", description: "Becomes intangible for a few seconds, making the ball pass through." },
        "Black Widow": { name: "Stealth Dodge", description: "Briefly becomes invisible, confusing the opponent." },
        "Black Panther": { name: "Speed Boost", description: "Increases paddle movement speed temporarily." },
        "Spider-Man": { name: "Web Snare", description: "Slows down the ball for a few seconds." },
        "Captain America": { name: "Shield Block", description: "Blocks the ball and sends it back at a faster speed." },
        "Falcon": { name: "Aerial Evasion", description: "Allows quick movement to dodge obstacles." },
        "Bucky Barnes": { name: "Arm Slam", description: "Hits the ball with extra force." },
        "Ant-Man": { name: "Shrink Dodge", description: "Temporarily shrinks to avoid ball collisions." },
        "Scarlet Witch": { name: "Telekinesis Redirect", description: "Alters ball trajectory using psychic power." },
        "Hawkeye": { name: "Precision Shot", description: "Aims the ball at the opponent with perfect accuracy." }
    };
    return abilities[heroName] || { name: "Unknown", description: "No ability found." };
};

// ✅ Show Ability Overlay Screen
window.showAbilityOverlay = function (player1Hero, player1Ability, player2Hero, player2Ability) {
    console.log("📜 Debug: Calling showAbilityOverlay", player1Hero, player1Ability, player2Hero, player2Ability);

    console.log("📜 Debug: Calling showAbilityInstructions", player1Hero, player1Ability, player2Hero, player2Ability);

    if (!player1Ability || !player2Ability) {
        console.error("❌ Error: One or both abilities are undefined!");
        return;
    }

    let overlay = document.createElement("div");
    overlay.id = "ability-overlay";
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex; flex-direction: row; justify-content: space-between; align-items: center;
        color: white; font-family: Bangers, sans-serif;
        z-index: 9999; padding: 20px;
    `;

    overlay.innerHTML = `
        <!-- Left Side: Team Iron Man -->
        <div style="width: 50%; height: 100%; background: rgba(255, 0, 0, 0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 10px; text-align: center;">
                <h2>🔥 Team Iron Man 🔥</h2>
                <h3>${player1Hero}</h3>
                <p><b>${player1Ability.name}</b></p>
                <p>${player1Ability.description}</p>
                <p><strong>Press 'Q' to activate ability</strong></p>
                <button id="player1-ready" class="ready-button">Player 1 Ready</button>
            </div>
        </div>

        <!-- Right Side: Team Captain America -->
        <div style="width: 50%; height: 100%; background: rgba(0, 0, 255, 0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 10px; text-align: center;">
                <h2>🛡️ Team Captain America 🛡️</h2>
                <h3>${player2Hero}</h3>
                <p><b>${player2Ability.name}</b></p>
                <p>${player2Ability.description}</p>
                <p><strong>Press 'P' to activate ability</strong></p>
                <button id="player2-ready" class="ready-button">Player 2 Ready</button>
            </div>
        </div>
    `;

    console.log("✅ Attempting to add overlay to the DOM:", overlay);
    document.body.appendChild(overlay);
    console.log("✅ Ability overlay appended successfully!", document.getElementById("ability-overlay"));

    // ✅ Handle Ready Button Clicks
    document.getElementById("player1-ready").addEventListener("click", () => {
        playersReady.player1 = true;
        checkBothPlayersReady();
    });

    document.getElementById("player2-ready").addEventListener("click", () => {
        playersReady.player2 = true;
        checkBothPlayersReady();
    });
}

// ✅ Check if both players are ready
function checkBothPlayersReady() {
    if (playersReady.player1 && playersReady.player2) {
        console.log("✅ Both players ready! Fading out overlay...");

        let overlay = document.getElementById("ability-overlay");
        if (overlay) {
            overlay.style.transition = "opacity 1s ease-out";
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.remove();
                console.log("🚀 Overlay removed, starting countdown...");
                startCountdown();
            }, 1000); // Give time for fade effect
        }
    }
}