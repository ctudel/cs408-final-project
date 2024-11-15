export class Player {
  constructor(game, x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.game = game;
    this.jumping = false;
    this.jumpSpeed = 500;
    this.ground = game.height / 2 - this.size;

    // Player jump event
    window.addEventListener("keydown", (e) => {
      if (e.key === 'w' || e.key === ' ') {
        this.jumping = true;
      }
    });
  }

  update(secondsPassed) {
    // jump to a certain height
    if (this.jumping && this.y > this.ground / 2) {
      this.y -= this.jumpSpeed * secondsPassed * 1.5;

      // start falling once max height is reached
    } else if (this.y < this.ground - 5) {
      this.jumping = false;
      this.y += this.jumpSpeed * secondsPassed;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 0, 255, 1)";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeRect(this.x, this.y, this.size + 1, this.size + 1);
  }

  collisionDetect() {
    const dx = this.x - this.game.obstacle.x;
    const dy = this.y - this.game.obstacle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size - 0.1)
      this.game.endGame = true;
  }
}
