export class Obstacle {
  constructor(x, y, width, height, exists, ctx) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.width = width;
    this.height = height;
    this.exists = exists;
    this.scored = false;
  }

  update(secondsPassed) {
    if (this.exists && this.x > -this.width) {
      this.x -= 510 * secondsPassed;

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
      this.scored = false;
    }
  }
}
