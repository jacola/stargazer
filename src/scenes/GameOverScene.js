import { SCENES } from "../constants";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME_OVER });
  }

  create() {
    const { width, height } = this.cameras.main;
    const bg = this.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x111111
    );

    const playAgain = this.add
      .sprite(width / 2, height / 2, "entities", "UI/playagain")
      .setScale(4)
      .setVisible(false);

    setTimeout(() => {
      bg.setInteractive();
      bg.on("pointerup", () => this.scene.start(SCENES.GAME));
      playAgain.setVisible(true);
    }, 1000);

    this.add
      .sprite(width / 2, height / 4, "entities", "UI/score")
      .setScale(6)
      .setOrigin(0.5, 1);

    const score = this.add.bitmapText(
      width / 2,
      height / 4,
      "Starfont",
      this.registry.score
    );
    score.setOrigin(0.5, 0).setScale(2).setTint(0x00ff00);
  }

  update() {}
}
