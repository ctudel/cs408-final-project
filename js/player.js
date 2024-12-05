export class Player {
  constructor(game, size, color) {
    this.game = game;
    this.size = size;
    this.color = color;
    this.x = game.width / 4;
    this.y = game.height / 2 - this.size;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.ground = this.y;

    // Player jump event
    window.addEventListener("keypress", (e) => {
      if (this.y > 0 && (e.key === 'w' || e.key === ' ')) {
        this.accelerate(-0.3);
      }
    });


    window.addEventListener("keyup", () => {
      this.accelerate(0.1);
    })
  }

  update() {
    this.gravitySpeed += this.gravity;
    console.log(this.gravitySpeed);
    this.y += this.gravitySpeed;
    this.sky();
    this.hitBottom();
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(this.x, this.y, this.size, this.size);
    context.strokeRect(this.x, this.y, this.size + 1, this.size + 1);
  }

  collisionDetect() {
    const pLeft = this.x;
    const pRight = this.x + this.size;
    const pTop = this.y;
    const pBottom = this.y + this.size;

    const obs = this.game.obstacle;
    const obsLeft = obs.x;
    const obsRight = obs.x + obs.width;
    const obsTop = obs.y;
    const obsBottom = obs.y + obs.height;

    if (pBottom < obsTop || pTop > obsBottom ||
      pRight < obsLeft || pLeft > obsRight) {
      return
    } else this.game.endGame = true;
  }

  hitBottom() {
    if (this.y > this.ground) {
      this.y = this.ground;
      this.gravitySpeed = 0;
    }
  }

  sky() {
    if (this.y < 0) {
      this.y = 0;
      this.gravitySpeed = 0;
    }
  }

  accelerate(n) {
    this.gravity = n;
  }
}
