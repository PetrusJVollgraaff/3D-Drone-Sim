import { Camera } from "./JS/Camera";
import { Drone } from "./JS/Drone";
import { Points } from "./JS/points";
import { Vector2 } from "./JS/Vector2";

class Game {
  #size = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: new Vector2({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }),
    areaSize: 1000,
  };
  #minDistBetween = 25;

  #mainCanvas = document.getElementById("main-canvas");
  #mainCtx = this.#mainCanvas.getContext("2d");
  #mapCanvas = document.getElementById("map-canvas");
  #mapCtx = this.#mapCanvas.getContext("2d");

  #Drone = null;
  #Camera = null;
  #debug = false;
  constructor(debug = false) {
    this.#debug = debug;
    if (debug) this.#size.center.x = this.#size.width / 4;

    this.#mainCanvas.width = debug ? this.#size.width / 2 : this.#size.width;
    this.#mainCanvas.height = this.#size.height;

    this.#mapCanvas.width = debug ? this.#size.width / 2 : this.#size.width;
    this.#mapCanvas.height = this.#size.height;

    this.#Drone = new Drone(
      new Vector2(Object.assign({}, this.#size.center, {})),
    );
    this.#Camera = new Camera({
      target: this.#Drone,
      center: new Vector2(Object.assign({}, this.#size.center, {})),
    });

    const bounds = this.#setBounds();
    const treeCount = 50;

    this.locations = this.#generateItems(treeCount, bounds);
    this.points = this.locations.map((center) => new Points(center));
  }

  #setBounds() {
    const { center, areaSize } = this.#size;
    return {
      top: center.y - areaSize / 2,
      right: center.x + areaSize / 2,
      left: center.x - areaSize / 2,
      bottom: center.y + areaSize / 2,
    };
  }

  start() {
    this.#animate();
  }

  #updates() {
    this.#Drone.update();
    //return this.#Camera.update();
  }

  #draw() {
    this.#Drone.draw(this.#mapCtx);
    this.points.forEach((p) => p.draw(this.#mapCtx));
    //this.#Camera.draw(this.#mainCtx);
  }

  #render(fov) {
    this.#Camera.render();
  }

  #animate() {
    const { width, height } = this.#size;
    this.#mapCtx.clearRect(0, 0, this.#debug ? width / 2 : width, height);

    const fov = this.#updates();
    //this.#render(fov)
    this.#draw();

    requestAnimationFrame(() => this.#animate());
  }

  #generateItems(count, bounds) {
    const locations = [];

    for (let i = 0; i < count; i++) {
      const center = new Vector2({
        x: lerp(bounds.left, bounds.right, Math.random()),
        y: lerp(bounds.top, bounds.bottom, Math.random()),
      });

      const centers = locations.map((item) => item.center);
      centers.push(this.#Drone.getCenter);

      const nearbyTree = centers.find((item) => {
        if (item) {
          return distance(center, item) < this.#minDistBetween;
        }
      });

      !nearbyTree && locations.push(center);
    }

    return locations;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

document.addEventListener("DOMContentLoaded", () => {
  new Game(true).start();
});
