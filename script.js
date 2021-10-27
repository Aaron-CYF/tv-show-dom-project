import "./episodes.js";
//You can edit ALL of the code here
var searchBox = document.querySelector('#search-box');
var selectBox = document.querySelector('#select-box');
var filterText = document.querySelector('#filter-text');
var resetSearch = document.querySelector('#search-reset');
var epiCardCopy;

function setup() {
  const allEpisodes = getAllEpisodes();
  epiCardCopy = document.querySelector(".epi-card");
  makePageForEpisodes(allEpisodes);
  searchBox.addEventListener('input', filterEpisodes);
  selectBox.addEventListener('change', chooseEpisode);
  resetSearch.addEventListener('click', doSearchReset);
}

function filterEpisodes(event) {
  makePageForEpisodes(getAllEpisodes().filter(epi => {
    return epi.name.toLowerCase().includes(event.target.value.toLowerCase()) || epi.summary.toLowerCase().includes(event.target.value.toLowerCase());
  }));
}

function chooseEpisode(event) {
  if (event.target.value == 0) {
    makePageForEpisodes(getAllEpisodes());
  } else {
    makePageForEpisodes([getAllEpisodes().find(epi => epi.id == event.target.value)])
  }
}

function doSearchReset() {
  selectBox.children[0].selected = 'selected';
  searchBox.value = "";
  makePageForEpisodes(getAllEpisodes());
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  let main = document.querySelector('main');
  main.innerHTML = "";
  selectBox.innerHTML = "";

  filterText.textContent = `Showing ${episodeList.length} episode(s) out of ${getAllEpisodes().length}`

  episodeList.forEach(epi => {
    let epiCard = epiCardCopy.cloneNode(true);
    let cardTitle = epiCard.querySelector(".title");
    let cardImage = epiCard.querySelector(".img-preview");
    let cardSumm = epiCard.querySelector(".summary");
    let img = document.createElement("img");
    let option = document.createElement('option');

    cardTitle.textContent = `${epi.name} - S${('0' + epi.season).slice(-2)}E${('0' + epi.number).slice(-2)}`;
    img.src = epi.image.medium;
    cardImage.append(img);
    cardSumm.innerHTML = epi.summary;

    option.innerText = `S${('0' + epi.season).slice(-2)}E${('0' + epi.number).slice(-2)} - ${epi.name}`;
    option.value = epi.id;

    main.append(epiCard);
    if(selectBox.innerHTML === "") {
      selectBox.innerHTML = "<option value='0'></option>";
    }

    selectBox.append(option);
    if (episodeList.length === 1) {
      selectBox.children[1].selected = 'selected';
    }
    
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