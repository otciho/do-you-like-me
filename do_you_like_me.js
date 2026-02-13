const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const loadingText = document.querySelector(".loading-text");
const funnyMessage = [
  "Evaluating your honesty...💗",
  "Running diagnostics...",
  "Measuring affection levels...📈",
  "Verifying you didn't misclick...👀",
  "Checking heart compatibility...🔍"
]
const resultVideo = document.querySelector(".result-video");
const resultGif = document.querySelector(".result-gif");
const replayBtn = document.querySelector(".js-replay-btn");

function showVideoHideGif() {
  if (resultVideo) resultVideo.style.display = "block";
  if (resultGif) resultGif.style.display = "none";
}

function showGifHideVideo() {
  if (resultVideo) resultVideo.style.display = "none";
  if (resultGif) resultGif.style.display = "block";
}


function enableGifFallback() {
  showGifHideVideo();
}

if (resultVideo) {
  // If loading/playing fails, use GIF
  resultVideo.addEventListener("error", enableGifFallback);
  resultVideo.addEventListener("stalled", enableGifFallback);


}


if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    resultContainer.style.display = "none";
    questionContainer.style.display = "block";
    noBtn.style.transform = "translate(0px, 0px)";
    heartLoader.style.display = "none";

    showVideoHideGif();

    if (resultVideo) {
      resultVideo.currentTime = 0;
      const p = resultVideo.play();
      if (p && typeof p.catch === "function") p.catch(showGifHideVideo);
    }
  });
}



let loadingIntervalId = null;

function setRandomLoadingMessage(){
  const msg = funnyMessage[Math.floor(Math.random()*funnyMessage.length)];
  loadingText.textContent = msg;
}

function startLoadingMessage(){
  setRandomLoadingMessage();
  loadingIntervalId = setInterval(setRandomLoadingMessage,1000);

}

function stopLoadingMessage(){
  if (loadingIntervalId !== null){
    clearInterval(loadingIntervalId);
    loadingIntervalId=null;
  }
}

//checking whether it is opened on mobile or laptop
let isMobile = window.innerWidth <= 768;

window.addEventListener("resize",()=> {
  isMobile = window.innerWidth <= 768;
})

function moveNoButton() {

//adding logic if it is a mobile
  let xRange, yRange;
  if (isMobile) {
    xRange = 100;
    yRange = 50;
  } else {
    xRange = 200;
    yRange = 100;
  }

  const x = Math.random() * xRange - xRange/2;
  const y = Math.random() * yRange - yRange/2;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

const isTouch = 'ontouchstart' in window;

if (isTouch) {
  noBtn.addEventListener("click", moveNoButton);
} else {
  noBtn.addEventListener("mouseover", moveNoButton);
}

yesBtn.addEventListener("click", () => {
  noBtn.style.transform = "translate(0px, 0px)";

  questionContainer.style.display = "none";
  heartLoader.style.display = "flex";

  startLoadingMessage();

  setTimeout(() => {
  stopLoadingMessage();

  heartLoader.style.display = "none";

  // ✅ SHOW RESULT SCREEN
  resultContainer.style.display = "block";

  // reset media
  showVideoHideGif();

  if (resultVideo) {
    resultVideo.currentTime = 0;
    const p = resultVideo.play();
    if (p && typeof p.catch === "function") p.catch(showGifHideVideo);
  }
}, 3000);

});
