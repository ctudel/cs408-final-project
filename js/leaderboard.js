const lbTable = document.getElementById("lb-table");

const loading = document.getElementById("loading");
const loadText = document.createElement("p");
loadText.innerHTML = "Loading Leaderboard Please Wait...";
loadText.style.fontSize = "2rem";
loadText.style.color = "#fff";
loading.appendChild(loadText);

// Request for all player data
let getPlayers = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items");

  xhr.onload = () => {
    loading.style.display = "none";
    if (xhr.response) {
      let responseData = JSON.parse(xhr.response);
      responseData.sort((a, b) => b.highScore - a.highScore);
      let idx = 1;

      responseData.forEach((data) => {
        genBoardItem(data, idx);
        idx++;
      });

    }
  };

  xhr.send();
}


window.onload = getPlayers;





/* 
 * ================
 * HELPER FUNCTIONS
 * ================
 */
let genBoardItem = (data, idx) => {
  let tr = document.createElement("tr");

  let rank = document.createElement("td");
  rank.innerHTML = idx;

  let playerId = document.createElement("td");
  playerId.innerHTML = `${data["id"]}`;

  let score = document.createElement("td");
  score.innerHTML = `${data["highScore"]}`;

  tr.appendChild(rank);
  tr.appendChild(playerId);
  tr.appendChild(score);
  lbTable.appendChild(tr);
}
