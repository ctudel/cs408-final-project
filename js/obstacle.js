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
    this.speedFactor = game.width * 0.001;
    this.exists = exists;
    this.hit = false;
  }

  update() {
    if (this.exists && this.x > -this.width) {
      this.x -= this.game.speed * this.speedFactor;
    } else {
      this.exists = false;
    }
    console.log(this.y);
  }

  draw(ctx) {
    if (this.exists) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width + 1, this.height + 1);

    } else {
      this.height = random(200 - this.game.player.size, (this.game.height / 2 - (this.game.player.size + 20)));
      this.x = this.game.width + this.width;
      this.y = this.topOrBottom();
      this.color = randomRGB();
      this.exists = true;
      this.hit = false;
    }
  }

  topOrBottom() {
    return (Math.random() >= 0.5) ? 0 : this.game.height / 2 - this.height;
  }
}
