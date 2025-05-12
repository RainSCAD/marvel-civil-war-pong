let backButtonX = 20;
let backButtonY = 0; // This will be updated inside drawHeroListScreen()
let backButtonWidth = 120;
let backButtonHeight = 40;

function drawHeroListScreen() {
    background(0);  // Reset background

    // ✅ Draw Background Image
    if (heroListBackground) {
        image(heroListBackground, 0, 0, width, height);
    }

    // ✅ Red transparent overlay (Team Iron Man)
    fill(255, 0, 0, 100);
    rect(0, 0, width / 2, height);

    // ✅ Blue transparent overlay (Team Captain America)
    fill(0, 0, 255, 100);
    rect(width / 2, 0, width / 2, height);

    // ✅ Dark opacity boxes for text readability
    fill(0, 150);
    rect(20, 80, width / 2 - 40, height - 160, 20);
    rect(width / 2 + 20, 80, width / 2 - 40, height - 160, 20);

    // ✅ Titles for teams clearly displayed
    fill(255);
    textSize(30);
    textAlign(CENTER, TOP);
    text("Team Iron Man", width / 4, 40);
    text("Team Captain America", 3 * width / 4, 40);

    // ✅ Hero and abilities text style
    textAlign(LEFT, TOP);
    fill(255);
    textSize(18);

    // ✅ Define heroes arrays with emojis clearly included
    const teamIronMan = [
        "🦾 Iron Man: Repulsor Blast - Temporarily speeds up ball.",
        "🚀 War Machine: Missile Barrage - Slows opponent paddle.",
        "🔮 Vision: Density Shift - Paddle temporarily intangible.",
        "🕵️ Black Widow: Stealth Dodge - Paddle briefly invisible.",
        "🐆 Black Panther: Speed Boost - Increases paddle speed briefly.",
        "🕷️ Spider-Man: Web Slowdown - Slows ball temporarily."
    ];

    const teamCaptainAmerica = [
        "🛡️ Captain America: Shield Reflect - Reflect ball at high speed.",
        "🕊️ Falcon: Aerial Evasion - Extends paddle vertically.",
        "💪 Bucky Barnes: Arm Slam - Hits ball harder and faster.",
        "🐜 Ant-Man: Shrink Dodge - Briefly shrinks paddle size.",
        "🔮 Scarlet Witch: Telekinesis Redirect - Changes ball trajectory.",
        "🏹 Hawkeye: Precision Shot - Paddle hits ball accurately."
    ];

    // ✅ Display Team Iron Man Heroes
    let ironY = 100;  // Define ironY clearly here
    for (let i = 0; i < teamIronMan.length; i++) {
        text(teamIronMan[i], 40, ironY + i * 40);
    }

    // ✅ Display Team Captain America Heroes
    let capY = 100;  // Define capY clearly here
    for (let i = 0; i < teamCaptainAmerica.length; i++) {
        text(teamCaptainAmerica[i], width / 2 + 40, capY);
        capY += 40;  // Increment capY to space the lines
    }

    // ✅ Set correct Y position dynamically
    backButtonY = height - 60;

    // ✅ Larger Back Button for clarity
    fill(0, 200);
    rect(backButtonX, backButtonY, backButtonWidth, backButtonHeight, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Back", backButtonX + backButtonWidth / 2, backButtonY + backButtonHeight / 2);
}

function mousePressed() {
    console.log(`🖱️ Mouse clicked at (${mouseX}, ${mouseY})`); // Debugging log

    // Check if the player clicked the Back button
    if (
        mouseX >= backButtonX &&
        mouseX <= backButtonX + backButtonWidth &&
        mouseY >= backButtonY &&
        mouseY <= backButtonY + backButtonHeight
    ) {
        console.log("🔙 Back button clicked! Returning to menu...");
        gameState = "startScreen"; // ✅ Change game state to menu
    }
}