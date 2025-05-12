let countdown = 5; // ✅ Set countdown timer (Change to 10 if needed)
let countdownActive = false; // ✅ Prevent multiple countdowns

function startCountdown() {
    console.log("🔥 Starting Countdown...");

    // ✅ Prevent multiple countdowns from running
    if (countdownActive) {
        console.warn("⚠️ Countdown already running! Skipping duplicate...");
        return;
    }

    countdownActive = true;
    showCountdownOverlay();

    let countdownInterval = setInterval(() => {
        countdown--;
        let countdownText = document.getElementById("countdown-text");

        if (countdownText) {
            countdownText.innerText = countdown; // ✅ Update countdown number
        }

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownActive = false;
            removeCountdownOverlay();
            startPlayScreen(); // ✅ Transition to the play screen
        }
    }, 1000);
}

// ✅ Display Countdown Overlay
function showCountdownOverlay() {
    //console.log("⏳ Showing countdown overlay...");

    let overlay = document.createElement("div");
    overlay.id = "countdown-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.fontSize = "80px";
    overlay.style.color = "white";
    overlay.style.fontFamily = "Bangers, sans-serif";
    overlay.style.zIndex = "10";
    overlay.innerHTML = `<h1 id="countdown-text">5</h1>`;

    document.body.appendChild(overlay);
}


// ✅ Remove Countdown Overlay
function removeCountdownOverlay() {
    let overlay = document.getElementById("countdown-overlay");
    if (overlay) {
        //console.log("🛑 Removing Countdown Overlay...");
        overlay.remove();
    }
}
