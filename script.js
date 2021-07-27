const background = document.querySelector("#main");
const bugArray = document.querySelectorAll(".item_img");
const carrotArray = document.querySelectorAll(".carrot_img");
const bgAudio = new Audio("sound/bg.mp3");
const bugAudio = new Audio("sound/bug_pull.mp3");
const carrotAudio = new Audio("sound/carrot_pull.mp3");
const playStopButton = document.querySelector(".play_icon_box");
console.log(window);

playStopButton.addEventListener("click", function (event) {
  bgAudio.play();
  bugArray.forEach(function (bugArrayItem) {
    console.dir(bugArrayItem);
    const randomNumX = Math.random();
    const randomNumY = Math.random();
    const bugX = parseInt(randomNumX * 1280);
    const bugY = parseInt(randomNumY * 295);
    bugArrayItem.style.transform = `translate(${bugX - 25}px, ${bugY - 25}px)`;
    bugArrayItem.classList.remove("display_none");
  });
});

background.addEventListener("click", function (event) {
  if (
    event.target.className === "play_icon_box" ||
    event.target.className === "fas fa-play play_stop_icon"
  ) {
    return;
  }
  if (event.target.className === "bug_img item_img") {
    console.dir(event.target);
    bugAudio.pause();
    bugAudio.currentTime = 0;
    bugAudio.play();
    event.target.classList.toggle("display_none");
    return;
  }
  if (event.target.className === "carrot_img item_img") {
    console.dir(event.target);
    carrotAudio.pause();
    carrotAudio.currentTime = 0;
    carrotAudio.play();
    event.target.classList.toggle("display_none");
    return;
  }
});
