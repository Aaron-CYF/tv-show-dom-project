import "./episodes.js";
import "./shows.js"
//You can edit ALL of the code here

//inserts shows.js into the HTML to load the functions into the browser
document.body.insertBefore(document.createElement("script"), document.body.getElementsByTagName("script")[0]).setAttribute("src", "./shows.js");

const allEpisodes = [/*...getAllEpisodes()*/];
const main = document.querySelector("main");
const title = document.querySelector("h1");
const searchBox = document.querySelector("#search-box");
const selectBox = document.querySelector("#select-box");
const showSelect = document.querySelector("#show-select");
const filterText = document.querySelector("#filter-text");
const resetSearch = document.querySelector("#search-reset");
const contentCard = document.querySelector(".content-card");
let isShowPage = true;
let allShows = [];
let allContent = [...allEpisodes];


function setup() {
  allShows = [...getAllShows()].sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  if (isShowPage) allContent = [...allShows];
  makePageMainContent(allContent);
  allShows.forEach(buildShowSelect);
  generateDisplayEpisodeEventListener(showSelect, "change");
  searchBox.addEventListener("input", filterContent);
  selectBox.addEventListener("change", chooseCard);
  resetSearch.addEventListener("click", doSearchReset);
  document.querySelector("#mode-switch").addEventListener("click", () => {
    isShowPage = true;
    allContent = [...allShows]; 
    makePageMainContent(allContent);
  });
}


function filterContent(event) {
  makePageMainContent(allContent.filter(content => {
    if (isShowPage) {
      return content.name.toLowerCase().includes(event.target.value.toLowerCase()) 
      || content.summary.toLowerCase().includes(event.target.value.toLowerCase())
      || content.genres.find(genre => genre.toLowerCase() === event.target.value.toLowerCase());
    } else {
      return content.name.toLowerCase().includes(event.target.value.toLowerCase()) 
      || content.summary.toLowerCase().includes(event.target.value.toLowerCase());
    }
  }));
}


function chooseCard(event) {
  if (event.target.value == 0) {
    makePageMainContent(allContent);
  } else {
    makePageMainContent([allContent.find(content => content.id == event.target.value)])
  }
}


function buildShowSelect(show) {
  let option = document.createElement("option");

  option.innerText = show.name;
  option.value = show.id;
  showSelect.append(option);
}


function doSearchReset() {
  selectBox.children[0].selected = "selected";
  searchBox.value = "";
  makePageMainContent(allContent);
}


function makePageMainContent(data, showIndex) {
  main.innerHTML = "";
  selectBox.innerHTML = "";

  if (document.querySelector("h2")) document.querySelector("h2").remove();

  if (!isShowPage) {
    showSelect.parentNode.setAttribute("style", "");
    showSelect.children[showIndex].selected = "selected";
    title.insertAdjacentHTML("afterend", "<h2>" + allShows[showIndex].name + "</h2>");
  } else {
    showSelect.parentNode.setAttribute("style", "display: none;");
  }

  makeCardList(data, showIndex);
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


function generateDisplayEpisodeEventListener(element, eventType, showID, showIndex) {
  element.addEventListener(eventType, event => {
    if (event.currentTarget.tagName.toLowerCase() === "select") {
      showIndex = event.currentTarget.selectedIndex;
      showID = event.currentTarget.value;
    }
    if (!allEpisodes[showIndex])
      getEpisodesFromAPI(showID).then(data => {
        allEpisodes[showIndex] = data;
        isShowPage = false;
        makePageMainContent(allEpisodes[showIndex], showIndex);
      });
    else {
      isShowPage = false;
      makePageMainContent(allEpisodes[showIndex], showIndex);
    }
  });
}


function makeCardList(contentList, showIndex) {

  filterText.textContent = `Showing ${contentList.length} ${isShowPage ? "show(s)" : "episode(s)"} out of ${isShowPage ? allShows.length : allEpisodes[showIndex].length}`

  contentList.forEach((content, index) => {
    let cardCopy = contentCard.cloneNode(true);
    let cardTitle = cardCopy.querySelector(".title");
    let cardImage = cardCopy.querySelector(".img-preview");
    let epiId = cardCopy.querySelector(".epi-id");
    let cardSumm = cardCopy.querySelector(".summary");
    let cardExtras = cardCopy.querySelector(".extra-data");
    let cRating = cardExtras.querySelector(".rating");
    let cGenres = cardExtras.querySelector(".genres");
    let cStatus = cardExtras.querySelector(".status");
    let cRuntime = cardExtras.querySelector(".runtime");
    let img = document.createElement("img");

    cardTitle.textContent = content.name;
    if (isShowPage) {
      generateDisplayEpisodeEventListener(cardTitle, "click", content.id, index);
      cardTitle.style.cursor = "pointer";
      cardTitle.classList.add("show-title");
    }

    if (content.image) {
      img.src = content.image.medium;
      if (isShowPage) img.classList.add("show-image");
      cardImage.append(img);
    } else {
      cardImage.innerHTML = `
      <div>
        <div class="img-missing"
        style="height: ${isShowPage ? "292px" : "137px"};
        line-height: ${isShowPage ? "292px" : "137px"};
        width: ${isShowPage ? "207px" : "247px"};"
        unselectable="on">
          <p>Image missing.</p>
        </div>
      </div>`;
      if (isShowPage) cardImage.querySelector(".img-missing").parentNode.classList.add("show-image");
    }

    if (isShowPage) generateDisplayEpisodeEventListener(cardImage, "click", content.id, index);

    cardSumm.innerHTML = `<summary>${isShowPage ? "TV Show" : "Episode"} Summary</summary>` + content.summary;

    if (isShowPage) {
      cRating.innerText = "Average rating: " + content.rating ? content.rating.average : undefined;
      cGenres.innerText = "Genres: " + ((Array.isArray(content.genres)) ? content.genres.join(", ") : undefined);
      cStatus.innerText = "Status: " + content.status;
      cRuntime.innerText = `Runtime: ${content.runtime ? content.runtime + "mins per episode" : undefined}`;
      epiId.remove();
    } else {
      epiId.innerText = createEpisodeIdentifier(content);
      cardExtras.childNodes.forEach(child => child.remove());
      cardExtras.remove();
    }

    main.append(cardCopy);
    let fontSize = 1.25;
    while (cardTitle.clientHeight > 25 && fontSize > 0) {
      fontSize -= 0.125;
      cardTitle.style.fontSize = fontSize + "em";
    }
  });
}

async function getEpisodesFromAPI(showID) {
  let URI = "http://api.tvmaze.com/shows/" + showID + "/episodes";
  let data;
  
  try {
    let response = await fetch(URI);
    data = await response.json();
  } catch(error) {
    console.log("error:", error);
  }
  return data;
}

window.onload = setup;