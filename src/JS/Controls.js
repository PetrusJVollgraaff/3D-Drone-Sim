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

  #keyDownEvtListener() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.#dir.left = true;
          return;
        case "ArrowRight":
          this.#dir.right = true;
          return;
      }
    });
  }

  #keyUpEvtListener() {
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.#dir.left = true;
          return;
        case "ArrowRight":
          this.#dir.right = true;
          return;
      }
    });
  }
}

export { Controls };
