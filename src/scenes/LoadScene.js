import { SCENES } from "../constants";

// /Users/jl/devel/stargazer/src/assets/sprites/entities.png

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LOAD });
  }

  preload() {
    // Background
    const { width, height } = this.cameras.main;
    this.add.rectangle(width / 2, height / 2, width, height, 0x2f2f2f);

    // Progress bar info
    const barWidth = width * 0.8;
    const barHeight = 50;

    // Frame for progress bar
    this.add.rectangle(
      width / 2,
      height / 2,
      barWidth + 4,
      barHeight + 4,
      0x000000
    );

    // Actual bar that gets updated
    const progressBar = this.add
      .rectangle(
        width / 2 - barWidth / 2,
        height / 2,
        barWidth,
        barHeight,
        0xb0c4de
      )
      .setOrigin(0, 0.5);

    // Load everything here
    this.load.atlas(
      "entities",
      "./assets/sprites/entities.png",
      "./assets/sprites/entities.json"
    );

    // Updates
    this.load.on("progress", (percent) => {
      progressBar.displayWidth = barWidth * percent;
    });

    this.load.on("complete", () => {
      this.scene.start(SCENES.GAME);
    });
  }
}
