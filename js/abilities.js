let player1Cooldown = 0;
let player2Cooldown = 0;
const cooldownTime = 30000; // ✅ 30-second cooldown

function updateCooldowns() {
    player1Cooldown = max(player1Cooldown - deltaTime, 0);
    player2Cooldown = max(player2Cooldown - deltaTime, 0);
}

function keyPressed() {
    if (gameState !== "playing") return;

    if (key === "q" && player1Cooldown <= 0) {
        activateAbility(1, player1Choice);
        player1Cooldown = cooldownTime;
    } else if (key === "p" && player2Cooldown <= 0) {
        activateAbility(2, player2Choice);
        player2Cooldown = cooldownTime;
    }
}

function activateAbility(player, choice) {
    console.log(`🚀 Player ${player} activated ${choice}'s ability!`);

    switch (choice.trim()) {
        case "Iron Man":
            ball.speedX *= 1.8;
            ball.speedY *= 1.8;
            setTimeout(() => {
                ball.speedX /= 1.8;
                ball.speedY /= 1.8;
            }, 3000);
            break;

        case "War Machine":
            if (player === 1) {
                paddle2.speed *= 0.5;
                setTimeout(() => paddle2.speed /= 0.5, 3000);
            } else {
                paddle1.speed *= 0.5;
                setTimeout(() => paddle1.speed /= 0.5, 3000);
            }
            break;

        case "Vision":
            let paddle = player === 1 ? paddle1 : paddle2;
            paddle.intangible = true;
            setTimeout(() => paddle.intangible = false, 3000);
            break;

        case "Black Widow":
            let paddleBW = player === 1 ? paddle1 : paddle2;
            paddleBW.invisible = true;
            setTimeout(() => paddleBW.invisible = false, 3000);
            break;

        case "Black Panther":
            let paddleBP = player === 1 ? paddle1 : paddle2;
            paddleBP.speed *= 2;
            setTimeout(() => paddleBP.speed /= 2, 3000);
            break;

        case "Spider-Man":
            ball.speedX *= 0.5;
            ball.speedY *= 0.5;
            setTimeout(() => {
                ball.speedX *= 2;
                ball.speedY *= 2;
            }, 3000);
            break;

        case "Captain America":
            ball.speedX *= -2;
            ball.speedY *= 1.5;
            break;

        case "Falcon":
            let paddleFalcon = player === 1 ? paddle1 : paddle2;
            paddleFalcon.height *= 2;
            setTimeout(() => paddleFalcon.height /= 2, 3000);
            break;

        case "Bucky Barnes":
            ball.speedX *= 2;
            ball.speedY *= 2;
            setTimeout(() => {
                ball.speedX /= 2;
                ball.speedY /= 2;
            }, 4000);
            break;

        case "Ant-Man":
            let paddleAnt = player === 1 ? paddle1 : paddle2;
            paddleAnt.height /= 2;
            setTimeout(() => paddleAnt.height *= 2, 3000);
            break;

        case "Scarlet Witch":
            ball.speedY *= -1.5;
            ball.speedX *= -1.5;
            break;

        case "Hawkeye":
            let paddleHawkeye = player === 1 ? paddle1 : paddle2;
            paddleHawkeye.speed *= 2.5;
            setTimeout(() => paddleHawkeye.speed /= 2.5, 4000);
            break;

        default:
            console.warn("⚠️ No ability found for:", choice);
    }
}

function drawCooldownBars() {
    // Player 1 cooldown bar
    fill(255, 255, 255, 100);
    rect(20, height - 30, 200, 20);
    fill(0, 255, 0);
    rect(20, height - 30, 200 * ((cooldownTime - player1Cooldown) / cooldownTime), 20);

    // Player 2 cooldown bar
    fill(255, 255, 255, 150);
    rect(width - 220, height - 30, 200, 20);
    fill(0, 255, 0, 200);
    rect(width - 220, height - 30, 200 * ((cooldownTime - player2Cooldown) / cooldownTime), 20);
}