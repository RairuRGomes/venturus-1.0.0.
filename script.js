const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "e81fd9a676msh3162912de60c919p1faae1jsn22952cdc85b8",
  },
};
//#region Variables

var playerSection = document.getElementById("playerSection");
var searchInput = document.getElementById("search");
var data = [];
//#endregion

//#region Functions

function searchPlayers(value) {
  var res = [];
  value = value.trim();
  if (value.length < 4) return;
  fetch(
    `https://api-football-v1.p.rapidapi.com/v3/players?search=${value}&season=2020&league=61`,
    options
  )
    .then((response) => response.json())
    .then(({ response }) => {
      res = response;
    })
    .then(() => createPlayerList(res))
    .catch((err) => console.error(err));
}

function createPlayerList(playerList) {
  playerList.forEach((element) => {
    var playerName = document.createElement("p");
    playerName.innerHTML = element.player.name;
    playerSection.appendChild(playerName);
  });
}

//#endregion

//#region Events
searchInput.addEventListener("input", (e) => {
  if (e.inputType == "deleteContentBackward") playerSection.innerHTML = "";
  searchPlayers(e.target.value);
});
//#endregion
