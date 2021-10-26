import "./episodes.js";
//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

// window.onload = setup;

window.onload = () => {
let episode = getOneEpisode();
let epiCard = document.querySelector(".epi-card");
let cardTitle = epiCard.querySelector(".title");
let cardImage = epiCard.querySelector(".img-preview");
let cardSumm = epiCard.querySelector(".summary");
let img = document.createElement("img");

cardTitle.textContent = episode.name;
img.src = episode.image.medium;
cardImage.append(img);
cardSumm.innerHTML = episode.summary;
};
