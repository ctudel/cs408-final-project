/* Setup Data */
const grid = document.getElementById('grid');

const loading = document.createElement('p');
loading.innerHTML = "Loading Profile<br>Please Wait...";
grid.appendChild(loading);


// Retrieve params from URL
const urlParams = new URLSearchParams(window.location.search);
const result = urlParams.get('id');
let playerId = (result != '' && result != null) ? result : "Anonymous";
console.log(playerId);

/* Get a certain player's data if exists */
let getAndLoadPlayer = (playerId) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items/${playerId}`);
  xhr.send();

  // Wait for data to be fetched
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let responseData;
      if (xhr.response) responseData = JSON.parse(xhr.response); // if user exists parse data

      let highScore = (responseData)
        ? responseData["highScore"]
        : `No games have been played as ${playerId}`;

      let enemyName = (responseData)
        ? responseData["enemyName"]
        : `${playerId} has met no foes yet`;

      loading.style.display = "none";
      populateProfileInfo(playerId);
      generateStats(highScore, enemyName);
    } // endif
  };
}

window.onload = getAndLoadPlayer(playerId);




/*
 * ================
 * HELPER FUNCTIONS
 * ================
 */
const pInfo = document.getElementById('player');
const stats = document.getElementById('stats');

let populateProfileInfo = (playerId) => {
  let color = randomRGB();
  const divBlock = document.createElement("div");
  divBlock.style.backgroundColor = color.toString();
  divBlock.style.width = "10vw";
  divBlock.style.height = "10vw";
  divBlock.style.margin = "auto";
  divBlock.style.border = "2px #000 solid";

  const p = document.createElement("p");
  p.innerHTML = `Player: ${playerId}`;

  const delBtn = document.createElement("button");
  delBtn.innerHTML = 'Delete Player';
  delBtn.id = 'del-btn';

  pInfo.appendChild(divBlock);
  pInfo.appendChild(p);
  pInfo.appendChild(delBtn);
  pInfo.style.display = "block";
  delBtnListener(delBtn);
}

let generateStats = (highScore, enemyName) => {
  // score styles
  const p1 = document.createElement("p");
  p1.innerHTML = "Highest Score";
  const scoreContainer = document.createElement("div");
  scoreContainer.id = "stat";
  const score = document.createElement("p");
  score.innerHTML = highScore;
  scoreContainer.appendChild(score);

  // holds score
  const container1 = document.createElement("div");
  container1.appendChild(p1);
  container1.appendChild(scoreContainer);

  // obstacle styles
  const p2 = document.createElement("p");
  p2.innerHTML = "Last Killed By";
  const obsContainer = document.createElement("div");
  obsContainer.id = "stat";
  const obstacle = document.createElement("p");
  obstacle.innerHTML = enemyName;
  obsContainer.appendChild(obstacle);

  // holds obstacle
  const container2 = document.createElement("div");
  container2.appendChild(p2);
  container2.appendChild(obsContainer);

  stats.appendChild(container1);
  stats.appendChild(container2);
  stats.style.display = "flex";
}

let delBtnListener = (delBtn) => {
  delBtn.addEventListener('click', () => {
    userIn = prompt("Type your player id to confirm");
    if (userIn === playerId) {
      deletePlayer();
    } else {
      alert('Incorrect player id, cancelling request');
    }
  });
}

let deletePlayer = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items/${playerId}`);

  xhr.onload = () => {
    alert(`Player ${playerId} has been deleted`);
    window.location.href = '/index.html';
  }

  xhr.send();
}

function randomRGB() {
  return `rgb(${random(150, 255)},${random(150, 255)},${random(150, 255)})`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
