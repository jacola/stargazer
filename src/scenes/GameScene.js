import { SCENES, CONSTANTS } from "../constants";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.add.rectangle(width / 2, height / 2, width, height, 0x111111);

    this.ship = this.add.sprite(
      width / 2,
      height - 40,
      "entities",
      "ships/orange"
    );

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
    const { pointer, ship } = this;
    if (pointer.isDown) {
      const difX = pointer.x - ship.x;
      const difY = pointer.y - ship.y;

      if (
        Math.abs(difX) < CONSTANTS.SHIP_SPEED &&
        Math.abs(difY) < CONSTANTS.SHIP_SPEED
      ) {
        ship.x = pointer.x;
        ship.y = pointer.y;
      } else {
        const direction = new Phaser.Math.Vector2(difX, difY).normalize();

        ship.x += direction.x * CONSTANTS.SHIP_SPEED;
        ship.y += direction.y * CONSTANTS.SHIP_SPEED;
      }
    }
  }
}
