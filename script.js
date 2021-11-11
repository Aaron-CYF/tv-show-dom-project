import "./episodes.js";
import "./shows.js"
//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
let searchBox = document.querySelector("#search-box");
let selectBox = document.querySelector("#select-box");
let filterText = document.querySelector("#filter-text");
let resetSearch = document.querySelector("#search-reset");
let epiCardCopy;
let showCardCopy;

function setup() {
  epiCardCopy = document.querySelector(".epi-card");
  showCardCopy = document.querySelector(".show-card")
  makePageForEpisodes(allEpisodes);
  searchBox.addEventListener("input", filterEpisodes);
  selectBox.addEventListener("change", chooseEpisode);
  resetSearch.addEventListener("click", doSearchReset);
}

function filterEpisodes(event) {
  makePageForEpisodes(allEpisodes.filter(epi => {
    return epi.name.toLowerCase().includes(event.target.value.toLowerCase()) || epi.summary.toLowerCase().includes(event.target.value.toLowerCase());
  }));
}

function chooseEpisode(event) {
  if (event.target.value == 0) {
    makePageForEpisodes(allEpisodes);
  } else {
    makePageForEpisodes([allEpisodes.find(epi => epi.id == event.target.value)])
  }
}

function doSearchReset() {
  selectBox.children[0].selected = "selected";
  searchBox.value = "";
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  selectBox.innerHTML = "";

  filterText.textContent = `Showing ${episodeList.length} episode(s) out of ${allEpisodes.length}`

  episodeList.forEach(epi => {
    let epiCard = epiCardCopy.cloneNode(true);
    let cardTitle = epiCard.querySelector(".title");
    let cardImage = epiCard.querySelector(".img-preview");
    let cardSumm = epiCard.querySelector(".summary");
    let img = document.createElement("img");
    let option = document.createElement("option");

    cardTitle.textContent = `${epi.name} - S${("0" + epi.season).slice(-2)}E${("0" + epi.number).slice(-2)}`;
    img.src = epi.image.medium;
    cardImage.append(img);
    cardSumm.innerHTML = epi.summary;

    option.innerText = `S${("0" + epi.season).slice(-2)}E${("0" + epi.number).slice(-2)} - ${epi.name}`;
    option.value = epi.id;

    main.append(epiCard);
    if(selectBox.innerHTML === "") {
      selectBox.innerHTML = "<option value='0'></option>";
    }

    selectBox.append(option);
    if (episodeList.length === 1) {
      selectBox.children[1].selected = "selected";
    }
    
  });
}

window.onload = setup;