import { Camera } from "./JS/Camera";
import { Drone } from "./JS/Drone";
import { Vector2 } from "./JS/Vector";

class Game {
  #mainCanvas = document.getElementById("main-canvas");
  #mainCtx = this.#mainCanvas.getContext("2d");
  #size = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: Vector2.zero(),
    areaSize: 1000,
  };

  #Drone = null;
  #Camera = null;
  constructor() {
    this.#mainCanvas.width = this.#size.width;
    this.#mainCanvas.height = this.#size.height;

    this.#Drone = new Drone();
    this.#Camera = new Camera({
      target: this.#Drone,
      center: Object.assign({}, this.#size.center, {}),
    });
  }

  start() {}

  #updates() {
    this.#Drone.update();
    return this.#Camera.update();
  }

  #draw() {
    this.#Drone.draw(this.#mainCtx);
    this.#Camera.draw(this.#mainCtx);
  }

  #render(fov) {
    this.#Camera.render();
  }

  #animate() {
    const { width, height } = this.#size;
    this.#mainCtx.clearRect(0, 0, width, height);

    const fov = this.#updates();
    this.#draw();

    requestAnimationFrame(() => this.#animate());
  }
}

new Game();
