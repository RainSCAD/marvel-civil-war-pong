let heroIcons = {}; // ✅ Declare heroIcons as an empty object
let player1Icon, player2Icon;

// ✅ Preload all hero icons
function preloadHeroIcons() {
    console.log("🔍 Debugging preloadHeroIcons() is running...");
    console.log("📂 Checking heroIcons object BEFORE loading:", heroIcons);

    heroIcons["Iron Man"] = loadImage("media/ironman_icon.png",
        () => console.log("✅ Iron Man icon loaded!"),
        () => console.error("🚨 Failed to load Iron Man icon!")
    );

    heroIcons["Falcon"] = loadImage("media/falcon_icon.jpg",
        () => console.log("✅ Falcon loaded!"),
        () => console.error("🚨 Failed to load Falcon icon!")
    );

    heroIcons["War Machine"] = loadImage("media/war_machine_icon.jpg",
        () => console.log("✅ War Machine loaded!"),
        () => console.error("🚨 Failed to load War Machine icon!")
    );

    heroIcons["Vision"] = loadImage("media/vision_icon.jpg",
        () => console.log("✅ Vision loaded!"),
        () => console.error("🚨 Failed to load Vision icon!")
    );

    heroIcons["Black Widow"] = loadImage("media/black_widow_icon.png",
        () => console.log("✅ Black Widow loaded!"),
        () => console.error("🚨 Failed to load Black Widow icon!")
    );

    heroIcons["Black Panther"] = loadImage("media/black_panther_icon.png",
        () => console.log("✅ Black Panther loaded!"),
        () => console.error("🚨 Failed to load Black Panther icon!")
    );

    heroIcons["Spider Man"] = loadImage("media/spiderman_icon.png",
        () => console.log("✅ Spider-Man loaded!"),
        () => console.error("🚨 Failed to load Spider-Man icon!")
    );

    heroIcons["Captain America"] = loadImage("media/captain_icon.png",
        () => console.log("✅ Captain America loaded!"),
        () => console.error("🚨 Failed to load Captain America icon!")
    );

    heroIcons["Bucky Barnes"] = loadImage("media/bucky_icon.jpg",
        () => console.log("✅ Bucky Barnes loaded!"),
        () => console.error("🚨 Failed to load Bucky Barnes icon!")
    );

    heroIcons["Ant-Man"] = loadImage("media/antman_icon.jpg",
        () => console.log("✅ Ant-Man loaded!"),
        () => console.error("🚨 Failed to load Ant-Man icon!")
    );

    heroIcons["Scarlet Witch"] = loadImage("media/scarlet_witch_icon.jpg",
        () => console.log("✅ Scarlet Witch loaded!"),
        () => console.error("🚨 Failed to load Scarlet Witch icon!")
    );

    heroIcons["Hawkeye"] = loadImage("media/hawkeye_icon.png",
        () => console.log("✅ Hawkeye loaded!"),
        () => console.error("🚨 Failed to load Hawkeye icon!")
    );

    console.log("🔍 Hero Icons Debug:", heroIcons);
    console.log("🦸‍♂️ Player Choices Debug:", player1Choice, player2Choice);

}
