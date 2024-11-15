import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { Background } from "./background.js";

// set up canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const score = document.getElementById("counter");
const width = (canvas.width = Math.min(1000, window.innerWidth));
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Game {
  constructor() {
    this.width = width;
    this.height = height;
    this.context = context;
    this.speed = 3;
    this.endGame = false;
    this.score = 0;
    // Class objects
    this.background = new Background(this);
    this.player = new Player(this, 100, randomRGB());
    this.obstacle = new Obstacle(this, 50, 100, true);
  }

  update() {
    this.background.update();
    this.obstacle.update();
    this.player.update(secondsPassed);
    this.incrementScore();
  }

  draw() {
    // Canvas color
    context.fillStyle = "rgba(35, 35, 35, 0.25)";
    context.fillRect(0, 0, width, height);

    // Moving background
    this.background.draw(this.context);

    // Ground layer 
    context.beginPath();
    context.fillStyle = "rgba(139, 69, 19, 1)";
    context.fillRect(0, height / 2, width, 200);

    // Grass layer
    context.beginPath();
    context.fillStyle = "rgba(100, 255, 100, 1)";
    context.fillRect(0, height / 2, width, 20);

    this.obstacle.draw(this.context);
    this.player.draw(this.context);
  }

  collisionDetect() {
    this.player.collisionDetect();
  }

  incrementScore() {
    const dodged = this.obstacle.x - this.obstacle.width < this.player.x;
    if (!this.obstacle.hit && dodged) {
      score.innerHTML = `Score: ${++this.score}`;
      this.obstacle.hit = true;
    }
  }
}

//======================
// Animation Starts Here
//======================


// Animation fields
const game = new Game();
let secondsPassed = 0;
let oldTimeStamp = 0;

// Animation function
function loop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  game.update();
  game.draw();
  game.collisionDetect();

  if (game.endGame) {
    cancelAnimationFrame();
  }

  // When all balls are eaten, go to the next round
  requestAnimationFrame(loop);
}


// ===================
// Program starts here
// ===================
requestAnimationFrame(loop);
