// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(150, 255)},${random(150, 255)},${random(150, 255)})`;
}

export class Obstacle {
  constructor(game, width, height, exists) {
    this.game = game;
    this.x = this.game.width + width;
    this.y = this.game.height / 2 - height;
    this.width = width;
    this.height = height;
    this.color = randomRGB();
    this.speedFactor = 3.5;
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
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width + 1, this.height + 1);

    } else {
      this.height = random((this.game.height / 10), (this.game.height / 7));
      this.x = this.game.width + this.width;
      this.y = this.game.height / 2 - this.height;
      this.color = randomRGB();
      this.exists = true;
      this.hit = false;
    }
  }
}
