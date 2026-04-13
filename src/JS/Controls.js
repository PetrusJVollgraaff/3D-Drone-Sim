class Controls {
  #dir = {
    left: false,
    right: false,
    up: false,
    down: false,
    forward: false,
    backward: false,
  };
  constructor() {
    this.#keyDownEvtListener();
    this.#keyUpEvtListener();
  }

  get getcontrols() {
    const { left, right, up, down, forward, backward } = this.#dir;
    return { left, right, up, down, forward, backward };
  }

  #keyDownEvtListener() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.#dir.left = true;
          return;
        case "ArrowRight":
          this.#dir.right = true;
          return;

        case "ArrowUp":
          this.#dir.forward = true;
          return;
        case "ArrowDown":
          this.#dir.backward = true;
          return;
      }
    });
  }

  #keyUpEvtListener() {
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.#dir.left = false;
          return;
        case "ArrowRight":
          this.#dir.right = false;
          return;

        case "ArrowUp":
          this.#dir.forward = false;
          return;
        case "ArrowDown":
          this.#dir.backward = false;
          return;
      }
    });
  }
}

export { Controls };
