import { Vector2 } from "./Vector";

class Camera {
  static maxViewDist = 1000;
  #center = Vector2.zero();
  #front = Vector2.zero();
  #left = Vector2.zero();
  #right = Vector2.zero();

  #target = null;
  #fovAngle = Math.PI * 0.5;
  #z = -50;
  constructor({ center = Vector2.zero(), target }) {
    this.#center = center;
    this.#target = target;
  }

  update() {
    this.#center = this.#target.getCenter;
    const dir = this.#target.getDir;
    const p = this.#fovAngle / 2;
    const frontOffset = Vector2.toXY(dir, Camera.maxViewDist);
    const leftOffset = Vector2.toXY(dir - p, Camera.maxViewDist);
    const rightOffset = Vector2.toXY(dir + p, Camera.maxViewDist);

    this.#front = Vector2.add(this.#center, frontOffset);
    this.#left = Vector2.add(this.#center, leftOffset);
    this.#right = Vector2.add(this.#center, rightOffset);

    return [this.#center, this.#left, this.#right];
  }

  render(ctx, points = []) {}
  draw(ctx) {
    this.path = new Path2D();
    ctx.beginPath();

    this.path.moveTo(this.#left.x, this.#left.y);
    this.path.lineTo(this.#center.x, this.#center.y);
    this.path.lineTo(this.#right.x, this.#right.y);
    this.path.closePath();
    ctx.strokeStyle = "cyan";
    ctx.stroke(this.path);
  }
}

export { Camera };
