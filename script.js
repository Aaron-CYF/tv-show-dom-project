import "./episodes.js";
import "./shows.js"
//You can edit ALL of the code here

//inserts shows.js into the HTML to load the functions into the browser
document.body.insertBefore(document.createElement("script"), document.body.getElementsByTagName("script")[0]).setAttribute("src", "./shows.js");

const allEpisodes = getAllEpisodes();
const main = document.querySelector("main");
const searchBox = document.querySelector("#search-box");
const selectBox = document.querySelector("#select-box");
const filterText = document.querySelector("#filter-text");
const resetSearch = document.querySelector("#search-reset");
const epiCard = document.querySelector(".epi-card");
const showCard = document.querySelector(".show-card");
let isShowPage = true;
let allShows = [];


function setup() {
  allShows = getAllShows();
  makePageMainContent([getOneShow()]);
  searchBox.addEventListener("input", filterEpisodes);
  selectBox.addEventListener("change", chooseEpisode);
  resetSearch.addEventListener("click", doSearchReset);
}


function filterEpisodes(event) {
  makePageMainContent(allEpisodes.filter(epi => {
    return epi.name.toLowerCase().includes(event.target.value.toLowerCase()) 
    || epi.summary.toLowerCase().includes(event.target.value.toLowerCase());
  }));
}


function chooseEpisode(event) {
  if (event.target.value == 0) {
    makePageMainContent(allEpisodes);
  } else {
    makePageMainContent([allEpisodes.find(epi => epi.id == event.target.value)])
  }
}


function doSearchReset() {
  selectBox.children[0].selected = "selected";
  searchBox.value = "";
  makePageMainContent(allEpisodes);
}


function makePageMainContent(data) {
  main.innerHTML = "";
  selectBox.innerHTML = "";

  makeCardList(data);
  fillSelectBox(data);
}


function createEpisodeIdentifier(episode = getOneEpisode()) {
  let season = "0" + episode.season;
  let epiNumber = "0" + episode.number;

  season = "S" + season.slice(-2);
  epiNumber = "E" + epiNumber.slice(-2);
  return season + epiNumber;
}


function fillSelectBox(contentList) {

  contentList.forEach(content => {
    let option = document.createElement("option");

    option.innerText = `${isShowPage ? "" : createEpisodeIdentifier(content) + " - "}${content.name}`;
    option.value = content.id;
  
    if (selectBox.innerHTML === "") {
      selectBox.innerHTML = "<option value='0'></option>";
    }

    selectBox.append(option);
  });

  if (contentList.length === 1) {
    selectBox.children[1].selected = "selected";
  }
}


function makeCardList(contentList) {

  filterText.textContent = `Showing ${contentList.length} ${isShowPage ? "show(s)" : "episode(s)"} out of ${isShowPage ? allShows.length : allEpisodes.length}`

  contentList.forEach(content => {
    let cardCopy = isShowPage ? showCard.cloneNode(true) : cardCopy = epiCard.cloneNode(true);
    let cardTitle = cardCopy.querySelector(".title");
    let cardImage = cardCopy.querySelector(".img-preview");
    let cardSumm = cardCopy.querySelector(".summary");
    let img = document.createElement("img");

    cardTitle.textContent = `${content.name}${isShowPage ? "" : " - " + createEpisodeIdentifier(content)}`;
    img.src = content.image.medium;
    cardImage.append(img);
    cardSumm.innerHTML = content.summary;

    main.append(cardCopy);
  });
}

window.onload = setup;