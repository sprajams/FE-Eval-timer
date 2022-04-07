console.log("hello mama");

const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");
// const inputBox = document.querySelectorAll(".input");
const form = document.querySelector(".form");
const activeDisplay = document.querySelectorAll(".active");
const inputContainer = document.querySelector(".inputContainer");

const activeHH = document.querySelector(".activeHH");
const activeMM = document.querySelector(".activeMM");
const activeSS = document.querySelector(".activeSS");

form.addEventListener("submit", formStart);
let intervalID;
let ss;

function countdown() {
  if (ss > 0) {
    let hh = ss / 3600; //hours with decimals
    let hour = Math.floor(hh); //integer of hour

    let mm = (hh - hour) * 60; //minutes with decimals
    let minute = Math.floor(mm); //interger of minute

    let second = Math.floor((mm - minute) * 60); //interger of seconds
    // render each change
    activeHH.innerHTML = hour;
    activeMM.innerHTML = minute;
    activeSS.innerHTML = second; //decrease by 1 second
    ss -= 1;
  } else {
    stopCountdown();
  }
}

function formStart(e) {
  e.preventDefault();
  let formData = new FormData(form);
  let hrData = parseFloat(formData.get("hour"));
  let minData = parseFloat(formData.get("minute"));
  let ssData = parseFloat(formData.get("second"));
  let totalSeconds = hrData * 3600 + minData * 60 + ssData;
  ss = totalSeconds;
  intervalID = setInterval(countdown, 1000, true);
}

startBtn.addEventListener("click", startAction);
function startAction() {
  console.log("starteeeed");
  startBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");
  inputContainer.classList.toggle("hidden");
  activeDisplay.forEach((x) => x.classList.toggle("hidden"));
  if (inputContainer.classList.contains("hidden")) {
    return;
  } else {
    inputContainer.classList.toggle("hidden");
    activeDisplay.forEach((x) => x.classList.toggle("hidden"));
  }
}

pauseBtn.addEventListener("click", stopCountdown);
function stopCountdown() {
  console.log("pls stop");
  clearInterval(intervalID);
  startBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");
  //   resetBtn.classList.toggle("hidden");
}
