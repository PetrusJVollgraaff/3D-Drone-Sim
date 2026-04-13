import { Camera } from "./JS/Camera";
import { Drone } from "./JS/Drone";
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
}

document.addEventListener("DOMContentLoaded", () => {
  new Game(true).start();
});
