import { LABELS, SCENES, CONSTANTS } from "../constants";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.lastSpawn = Date.now();
    this.spawnRate = 500;
    this.entities = [];

    this.add.rectangle(width / 2, height / 2, width, height, 0x111111);

    const bounds = this.matter.world.setBounds(0, -100, width, height + 200);
    for (let key in bounds.walls) {
      bounds.walls[key].label = key;
      bounds.walls[key].isWall = true;
    }

    this.ship = this.matter.add.sprite(
      width / 2,
      height - 40,
      "entities",
      "ships/orange",
      { label: LABELS.PLAYER, shape: this.cache.json.get("shapes").orange }
    );
    this.ship.setFixedRotation();

    this.matter.world.on("collisionstart", (event) => {
      for (let collision of event.pairs) {
        const { bodyA, bodyB } = collision;
        console.log(bodyA.parent.label, bodyB.parent.label, collision);
        let player = null;
        let objHit = null;
        if (bodyA.parent.label === LABELS.PLAYER) {
          player = bodyA;
          objHit = bodyB;
        }
        if (bodyB.parent.label === LABELS.PLAYER) {
          player = bodyB;
          objHit = bodyA;
        }

        if (player) {
          if (objHit.parent.label === LABELS.STAR) {
            this.removeEntity(objHit);
          }
        }

        // Floor check
        if (bodyA.isWall || bodyB.isWall) {
          const wall = bodyA.isWall ? bodyA : bodyB;
          const obj = bodyA.isWall ? bodyB : bodyA;

          if (wall.label === "bottom" && obj.parent.label === LABELS.STAR) {
            this.removeEntity(obj);
          }
        }
      }
    });

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

  removeEntity(obj) {
    this.entities = this.entities.filter((e) => e.body.id !== obj.parent.id);
    obj.gameObject.setVisible(false).setActive(false);
    obj.parent.destroy();
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

    const { entityLimit, entities } = this;

    if (Date.now() > this.lastSpawn + this.spawnRate) {
      const { width } = this.cameras.main;

      const newStar = this.matter.add.sprite(
        width * Math.random(),
        -80,
        "entities",
        "items/stars/gold",
        {
          label: LABELS.STAR,
          id: Math.floor(Math.random() * 1000000),
          shape: this.cache.json.get("shapes").gold,
        }
      );
      newStar.setFrictionAir(0);
      newStar.setVelocityY(3);
      entities.push(newStar);
      this.lastSpawn = Date.now();
    }
  }
}
