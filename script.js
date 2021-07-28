const background = document.querySelector("#main");
const bugArray = document.querySelectorAll(".item_img");
let carrotArray = document.querySelectorAll(".carrot_img");
const bgAudio = new Audio("sound/bg.mp3");
const bugAudio = new Audio("sound/bug_pull.mp3");
const carrotAudio = new Audio("sound/carrot_pull.mp3");
const winAudio = new Audio("sound/game_win.mp3");
const lostAudio = new Audio("sound/alert.wav");
const playStopButton = document.querySelector(".play_icon_box");
const playButton = document.querySelector(".play_stop_icon");
const bottomHalfBox = document.querySelector(".bottom_half");
const gameBoxBackground = document.querySelector(".game_box_background");
console.log(window);
const wonBox = document.querySelector(".won_box");
const lostBox = document.querySelector(".lost_box");
const replayBox = document.querySelector(".replay_box");
let carrotNumber = document.querySelector(".carrot_number");
const countdown = document.querySelector(".countdown");
let countdownNum = countdown.innerText;
let timer = setInterval(() => countdownFunction(), 1000);

clearInterval(timer);

function countdownFunction() {
  countdownNum--;
  countdown.innerText = countdownNum;
  if (countdownNum === 0) {
    console.log("0s");
    clearInterval(timer);
    gameBoxBackground.classList.remove("display_none");
    lostBox.classList.remove("display_none");
    bgAudio.pause();
    lostAudio.play();
  }
}

function newGame(event) {
  console.log("play-stop click success");
  console.log(event.target);
  if (
    event.target.className === "fas fa-undo game_button lost_button" ||
    event.target.className === "fas fa-undo game_button won_button" ||
    event.target.className === "fas fa-undo game_button replay_button" ||
    event.target.className === "play_icon_box play_box" ||
    event.target.className === "fas fa-play play_stop_icon play_icon"
  ) {
    countdownNum = 10;
    countdown.innerText = 10;
    clearInterval(timer);
    timer = setInterval(() => countdownFunction(), 1000);
    console.log("play button click success");
    bgAudio.pause();
    bgAudio.currentTime = 0;
    bgAudio.play();
    bgAudio.loop = true;
    bugArray.forEach(function (bugCarrotArrayItem) {
      console.dir(bugCarrotArrayItem);
      const randomNumX = Math.random();
      const randomNumY = Math.random();
      const bugX = parseInt(randomNumX * 1280);
      const bugY = parseInt(randomNumY * 295);
      bugCarrotArrayItem.style.transform = `translate(${bugX - 25}px, ${
        bugY - 25
      }px)`;
      bugCarrotArrayItem.classList.remove("display_none");
      playStopButton.className = "play_icon_box stop_box";
      playButton.className = "fas fa-stop play_stop_icon stop_icon";
      carrotArray = document.querySelectorAll(".carrot_img");
      carrotNumber.innerText = carrotArray.length;
    });
    return;
  }
  if (
    event.target.className === "play_icon_box stop_box" ||
    event.target.className === "fas fa-stop play_stop_icon stop_icon"
  ) {
    console.dir("stop success");
    console.log(wonBox);
    console.log(replayBox);
    bgAudio.pause();
    gameBoxBackground.classList.remove("display_none");
    replayBox.classList.remove("display_none");
    clearInterval(timer);
  }
}

playStopButton.addEventListener("click", newGame);
gameBoxBackground.addEventListener("click", function (event) {
  if (event.target.className === "fas fa-undo game_button replay_button") {
    gameBoxBackground.classList.add("display_none");
    replayBox.classList.add("display_none");
    newGame(event);
  } else if (event.target.className === "fas fa-undo game_button won_button") {
    gameBoxBackground.classList.add("display_none");
    wonBox.classList.add("display_none");
    newGame(event);
  } else if (event.target.className === "fas fa-undo game_button lost_button") {
    gameBoxBackground.classList.add("display_none");
    lostBox.classList.add("display_none");
    newGame(event);
  } else if (
    replayBox.className === "replay_box game_box" &&
    event.target.className !== "fas fa-undo game_button replay_button" &&
    event.target.className !== "fas fa-undo game_button won_button" &&
    event.target.className !== "fas fa-undo game_button lost_button"
  ) {
    console.log("replay cancel");
    timer = setInterval(() => countdownFunction(), 1000);
    gameBoxBackground.classList.add("display_none");
    replayBox.classList.add("display_none");
    bgAudio.play();
    return;
  }
  return;
});
bottomHalfBox.addEventListener("click", function (event) {
  if (event.target.className === "bug_img item_img") {
    console.dir(event.target);
    bugAudio.pause();
    bugAudio.currentTime = 0;
    bugAudio.play();
    event.target.classList.toggle("display_none");
    gameBoxBackground.classList.remove("display_none");
    lostBox.classList.remove("display_none");
    bgAudio.pause();
    lostAudio.play();
    clearInterval(timer);
    return;
  }
  if (event.target.className === "carrot_img item_img") {
    console.dir(event.target);
    carrotAudio.pause();
    carrotAudio.currentTime = 0;
    carrotAudio.play();
    event.target.classList.toggle("display_none");
    carrotArray = document.querySelectorAll(".carrot_img:not(.display_none)");
    carrotNumber.innerText = carrotArray.length;
    console.log(carrotArray);
    if (carrotArray.length === 0) {
      console.log("you won");
      gameBoxBackground.classList.remove("display_none");
      wonBox.classList.remove("display_none");
      bgAudio.pause();
      winAudio.play();
      clearInterval(timer);
    }
  }
  return;
});
