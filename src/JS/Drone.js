import { Controls } from "./Controls";
import { Vector2 } from "./Vector2";

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
  constructor(center = Vector2.zero()) {
    this.#center = center;
  }

  get getCenter() {
    return this.#center;
  }

  get getDir() {
    return this.#dir;
  }

  update() {
    const { left, right, up, down, forward, backward } =
      this.#controls.getcontrols;
    const { epsilon, friction, maxSpeed, speedChange, dirChange } =
      this.#Options;

    left && (this.#dir -= dirChange);
    right && (this.#dir += dirChange);

    forward && (this.#speed += speedChange);
    backward && (this.#speed -= speedChange);

    if (this.#speed > 0) {
      this.#speed -= friction;
    } else if (this.#speed < 0) {
      this.#speed += friction;
    }

    Math.abs(this.#speed) < epsilon && (this.#speed = 0);

    if (this.#speed > maxSpeed) {
      this.#speed = maxSpeed;
    } else if (this.#speed < -maxSpeed) {
      this.#speed = -maxSpeed;
    }

    this.#center = this.#center.add(
      Vector2.toXY({
        dir: this.#dir,
        mag: this.#speed,
      }),
    );
  }

  draw(ctx) {
    this.path = new Path2D();
    const { x, y } = this.#center;
    const radius = this.#size / 2;

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
