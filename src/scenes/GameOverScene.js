import { SCENES } from "../constants";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME_OVER });
  }

  preload() {
    const { width, height } = this.cameras.main;
    this.add.rectangle(width / 2, height / 2, width, height, 0xff0000);
  }

  creater() {}

  update() {}
}
