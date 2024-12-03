import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { Background } from "./background.js";

/* Setup Data */
// Retrieve from URL
const urlParams = new URLSearchParams(window.location.search);
const result = urlParams.get('id');
let playerId = (result != '' && result != null) ? result : "Anonymous";
let enemyName = 'Evil Block';
console.log('Player ID: ' + playerId);

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
  return `rgb(${random(150, 255)},${random(150, 255)},${random(150, 255)})`;
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
    this.obstacle = new Obstacle(this, 50, random(10, (height / 6.5)), true);
  }

  update() {
    this.background.update();
    this.obstacle.update();
    this.player.update(secondsPassed);
    this.incrementScore();
  }

  draw() {
    // Moving background
    this.background.draw(this.context);

    // Ground layer 
    context.beginPath();
    context.fillStyle = "rgba(139, 69, 19, 1)";
    context.fillRect(0, height / 2, width, height);

    // Grass layer
    context.beginPath();
    context.fillStyle = "rgba(100, 255, 100, 1)";
    context.fillRect(0, height / 2, width, 30);

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
let animation;

// Animation function
function loop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  game.update();
  game.draw();
  game.collisionDetect();

  if (game.endGame) {
    getPlayerData(playerId);
    // let playerData = JSON.parse(getPlayerData(playerId));

    const popup = document.querySelector(".popup-container");
    popup.style.display = 'flex';

    const playerID = document.getElementById("player-id");
    playerID.innerHTML = `Player ID: ${playerId}`;

    const fScore = document.getElementById("final-score");
    fScore.innerHTML = `Score: ${game.score}`;

    const enemy = document.getElementById("enemy");
    enemy.innerHTML = `Hit by: ${enemyName}`;
    // submitPlayerData(playerData);
    stopAnimation();
  } else {
    animation = requestAnimationFrame(loop);
  }
}

// Persist parameters on refresh
document.getElementById("replay").addEventListener('click', () => {
  let url = window.location.href;
  window.location.href = url;
});

// Starts animation
function startAnimation() {
  animation = requestAnimationFrame(loop);
}

// Stops animation
function stopAnimation() {
  cancelAnimationFrame(animation);
}

// ===================
// Program starts here
// ===================
startAnimation();
console.log(playerId);














// ===================
// Process Player Data
// ===================
let getPlayerData = (playerId) => {
  console.log(playerId);
  let xhr = new XMLHttpRequest();
  // Wait for data to be fetched
  xhr.onload = () => {
    if (xhr.response) {
      let responseData = JSON.parse(xhr.response);
      console.log(responseData);
    }
  };
  // TODO: uncomment for real functionality
  // xhr.open("GET", `https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items/${playerId}`);
  xhr.open("GET", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items/123");
  xhr.send();

}

let submitPlayerData = (playerData) => {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items");
  xhr.setRequestHeader("Content-Type", "application/json");
  console.log(JSON.stringify(playerData));
  xhr.send(JSON.stringify(playerData));
}
