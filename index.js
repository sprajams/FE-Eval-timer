const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");
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
    let second = ss - (hour * 3600 + minute * 60);
    // render each change
    activeHH.innerHTML = hour;
    activeMM.innerHTML = minute;
    activeSS.innerHTML = second;
    //decrease by 1 second
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

  if (intervalID == "paused") {
    intervalID = null;
    hrData = parseFloat(activeHH.innerHTML);
    minData = parseFloat(activeMM.innerHTML);
    ssData = parseFloat(activeSS.innerHTML);
    totalSeconds = hrData * 3600 + minData * 60 + ssData;
    ss = totalSeconds;
  }

  activeHH.innerHTML = hrData;
  activeMM.innerHTML = minData;
  activeSS.innerHTML = ssData;
  intervalID = setInterval(countdown, 500);
}

startBtn.addEventListener("click", startAction);
function startAction() {
  startBtn.classList.add("hidden");
  inputContainer.classList.add("hidden");
  if (inputContainer.classList.contains("hidden")) {
    activeDisplay.forEach((x) => x.classList.remove("hidden"));
    return;
  } else {
    inputContainer.classList.toggle("hidden");
  }
}

pauseBtn.addEventListener("click", paused);
function paused() {
  stopCountdown();
  intervalID = "paused";
  console.log(intervalID);
}

function stopCountdown() {
  console.log("pls stop");
  clearInterval(intervalID);
  intervalID = null;
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
}

resetBtn.addEventListener("click", resetForm);
function resetForm() {
  stopCountdown();
  form.reset();
  inputContainer.classList.remove("hidden");
  activeDisplay.forEach((x) => x.classList.add("hidden"));
}
