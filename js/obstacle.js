export class Obstacle {
  constructor(game, width, height, exists) {
    this.game = game;
    this.x = this.game.width + 100;
    this.y = this.game.height / 2 - height;
    this.initX = this.x;
    this.initY = this.y;
    this.width = width;
    this.height = height;
    this.speedFactor = 4;
    this.exists = exists;
    this.hit = false;
  }

  update(secondsPassed) {
    if (this.exists && this.x > -this.width) {
      this.x -= this.game.speed * this.speedFactor;

    } else {
      this.exists = false;
    }
  }

  draw(ctx) {
    if (this.exists) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 255, 1)";
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width + 1, this.height + 1);

    } else {
      this.x = this.initX;
      this.y = this.initY;
      this.exists = true;
      this.hit = false;
    }
  }
}
