export class Player {
  constructor(game, size, color) {
    this.game = game;
    this.size = size;
    this.color = color;
    this.x = game.width / 4;
    this.y = game.height / 2 - this.size;
    this.jumping = false;
    this.jumpSpeed = 500;
    this.ground = this.y;

    // Player jump event
    window.addEventListener("keydown", (e) => {
      if ((e.key === 'w' || e.key === ' ') && this.y >= this.ground) {
        this.jumping = true;
      }
    });
  }

  update(secondsPassed) {
    console.log(this.ground);
    console.log(this.y);
    // jump to a certain height
    if (this.jumping && this.y > this.ground / 2) {
      this.y -= this.jumpSpeed * secondsPassed * 1.5;

      // start falling once max height is reached
    } else if (this.y < this.ground) {
      this.jumping = false;
      this.y += this.jumpSpeed * secondsPassed;
    }
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(this.x, this.y, this.size, this.size);
    context.strokeRect(this.x, this.y, this.size + 1, this.size + 1);
  }

  collisionDetect() {
    const dx = this.x - this.game.obstacle.x;
    const dy = this.y - this.game.obstacle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size - 0.1)
      this.game.endGame = true;
  }
}
