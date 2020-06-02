import { SCENES } from "../constants";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME });
  }

  preload() {
    const { width, height } = this.cameras.main;
    this.add.rectangle(width / 2, height / 2, width, height, 0x0000ff);
  }

  creater() {}

  update() {}
}
