import { SCENES } from "../constants";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.add.rectangle(width / 2, height / 2, width, height, 0x111111);

    this.add.sprite(width / 2, height - 40, "entities", "ships/orange");

    // Pointer
    this.pointer = {
      isDown: false,
      x: 0,
      y: 0,
    };

    this.input.on("pointerdown", (pointer) => {
      this.pointer.isDown = true;
      this.pointer.x = pointer.worldX;
      this.pointer.y = pointer.worldY;
    });

    this.input.on("pointermove", (pointer) => {
      this.pointer.x = pointer.worldX;
      this.pointer.y = pointer.worldY;
    });

    this.input.on("pointerup", () => {
      this.pointer.isDown = false;
    });
  }

  update() {
    const { pointer } = this;
    if (pointer.isDown) {
      console.log(pointer.x, pointer.y);
    }
  }
}
