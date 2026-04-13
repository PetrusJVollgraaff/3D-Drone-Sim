import { Controls } from "./Controls";
import { Vector2 } from "./Vector";

class Drone {
  #Options = {
    maxSpeed: 5,
    friction: 0.4,
    speedChange: 0.6,
    dirChange: 0.05,
    epsilon: 0.01,
  };

  #motors = {
    frontleft: 0,
    frontright: 0,
    backright: 0,
    backleft: 0,
  };

  #Roll = null;
  #Pitch = null;

  #center = Vector2.zero();
  #size = 50;
  #speed = 0;
  #dir = -Math.PI / 2;
  #controls = new Controls();
  constructor() {}

  get getCenter() {
    return this.#center;
  }

  get getDir() {
    return this.#dir;
  }

  update() {}

  draw(ctx) {
    this.path = new Path2D();
    const { x, y } = this.#center;
    const radius = size / 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.#dir + Math.PI / 2);
    ctx.beginPath();

    this.path.moveTo(0, -radius);
    this.path.arc(0, 0, radius, 0, Math.PI);
    ctx.fillStyle = "red";
    ctx.fill(this.path);

    ctx.restore();
  }
}

export { Drone };
