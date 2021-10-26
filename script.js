import "./episodes.js";
//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let epiCardCopy = document.querySelector(".epi-card");
  let main = document.querySelector('main');
  main.innerHTML = "";

  episodeList.forEach(epi => {
    let epiCard = epiCardCopy.cloneNode(true);
    console.log(epiCardCopy);
    let cardTitle = epiCard.querySelector(".title");
    let cardImage = epiCard.querySelector(".img-preview");
    let cardSumm = epiCard.querySelector(".summary");
    let img = document.createElement("img");

    cardTitle.textContent = `${epi.name} - S${('0' + epi.season).slice(-2)}${('0' + epi.number).slice(-2)}`;
    img.src = epi.image.medium;
    cardImage.append(img);
    cardSumm.innerHTML = epi.summary;

    main.append(epiCard);
    
  });
}



// window.onload = () => {
// let episode = getOneEpisode();
// let epiCard = document.querySelector(".epi-card");
// let cardTitle = epiCard.querySelector(".title");
// let cardImage = epiCard.querySelector(".img-preview");
// let cardSumm = epiCard.querySelector(".summary");
// let img = document.createElement("img");

// cardTitle.textContent = episode.name;
// img.src = episode.image.medium;
// cardImage.append(img);
// cardSumm.innerHTML = episode.summary;
// };

window.onload = setup;