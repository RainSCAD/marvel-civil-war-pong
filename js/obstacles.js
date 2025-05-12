let debris = [];
let debrisInterval;
let spawnRate = 5000; // Start at 5 seconds

function startDebris() {
    console.log("🌪️ Starting debris spawning...");
    clearInterval(debrisInterval);

    debrisInterval = setInterval(() => {
        let newDebris = {
            x: random(width * 0.3, width * 0.7), // Spawns in middle
            y: -20, // Starts off-screen
            size: random(15, 30), // Different sizes for realism
            speedY: random(2, 5), // Different falling speeds
            type: random(["normal", "speedBoost", "slowDown"]) // Random effect
        };

        debris.push(newDebris);
        console.log("🌪️ New debris spawned:", newDebris);
    }, spawnRate);
}

function drawDebris() {
    for (let d of debris) {
        // Different colors for different debris types
        if (d.type === "speedBoost") {
            fill(255, 0, 0); // Red for speed boost
        } else if (d.type === "slowDown") {
            fill(0, 0, 255); // Blue for slow down
        } else {
            fill(150); // Gray for normal debris
        }

        stroke(0);
        ellipse(d.x, d.y, d.size);
        d.y += d.speedY;

        // ✅ Ball collision with debris
        let distance = dist(ball.x, ball.y, d.x, d.y);
        if (distance < ball.size / 2 + d.size / 2) {
            console.log("💥 Ball hit debris!");

            if (d.type === "speedBoost") {
                ball.speedX *= 1.3;
                ball.speedY *= 1.3;
                console.log("🚀 Ball speed increased!");
            } else if (d.type === "slowDown") {
                ball.speedX *= 0.7;
                ball.speedY *= 0.7;
                console.log("🐢 Ball slowed down!");
            } else {
                ball.speedX *= -1.2;
                ball.speedY *= -1.1;
            }
        }
    }

    // ✅ Remove debris that falls off screen
    debris = debris.filter(d => d.y < height + 50);
}

// 📈 Increase Debris Spawn Rate Over Time
function increaseDebrisRate() {
    spawnRate = max(1000, spawnRate * 0.9); // Decrease spawn time
    clearInterval(debrisInterval);
    debrisInterval = setInterval(startDebris, spawnRate);
}
setInterval(increaseDebrisRate, 20000); // Makes debris spawn faster every 20 seconds