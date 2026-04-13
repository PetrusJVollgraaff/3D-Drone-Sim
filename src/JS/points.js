import { Vector2 } from "./Vector2";

class Points {
  #center = Vector2.zero();
  #size = 50;
  constructor(center = Vector2.zero()) {
    this.#center = center;
  }

  draw(ctx) {
    this.path = new Path2D();
    const { x, y } = this.#center;
    const radius = this.#size / 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();

    this.path.arc(0, 0, radius, 0, Math.PI * 2);

    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke(this.path);
    ctx.restore();
  }
}

export { Points };
