// let playerId = '';
// let lastEnemy = '';
// let highScore = 0;
//
//
// /* 
//  * GET
//  * Get Items and update table
//  */
// let getData = () => {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items");
//   xhr.send();
// }
//
// let getPlayer = (id) => {
//   playerId = id;
//   let xhr = new XMLHttpRequest();
//
//   xhr.open("GET", `https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items/${id}`);
//   xhr.send();
//
//   getPlayerInfo(xhr);
// }
//
// let getPlayerInfo = (xhr) => {
//   if (xhr.response) {
//     const player = JSON.parse(xhr.response);
//     lastEnemy = player.enemyName;
//     highScore = player.highScore;
//   }
// }

const form = document.getElementById("play-form");

/* 
 * EVENT LISTENERS
 */
document.getElementById("play").addEventListener('click', () => {
  form.style.display = 'flex';
});

/* 
 * Helper Functions 
 */
let closePopup = (e) => {
  if (e.target == document.getElementById("play-form")) {
    form.style.display = "none";
  }
}

window.onclick = closePopup;

