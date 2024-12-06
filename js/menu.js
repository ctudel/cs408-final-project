const playForm = document.getElementById("play-form");
const profileForm = document.getElementById("profile-form");

/*
 * ===============
 * EVENT LISTENERS
 * =============== 
 */
document.getElementById("play").addEventListener('click', () => {
  playForm.style.display = 'flex';
});

document.getElementById("leaderboard").addEventListener('click', () => {
  window.location.href = '/pages/leaderboard.html';
});

document.getElementById("profile").addEventListener('click', () => {
  profileForm.style.display = 'flex';
});

/*
 * ================
 * HELPER FUNCTIONS
 * ================
 */
let closePopup = (e) => {
  if (e.target == playForm || e.target == profileForm) {
    playForm.style.display = "none";
    profileForm.style.display = "none";
  }
}

window.onclick = closePopup;
