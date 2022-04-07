console.log("hello mama");

const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resetBtn = document.querySelector(".resetBtn");
const inputBox = document.querySelectorAll(".input");
const form = document.querySelector(".form");
const activeDisplay = document.querySelector(".activeDisplay");
const inputContainer = document.querySelector(".inputContainer");

const activeHH = document.querySelector(".activeHH");
const activeMM = document.querySelector(".activeMM");
const activeSS = document.querySelector(".activeSS");

const result = document.querySelector(".result");

let intervalID;
form.addEventListener("submit", formStart);
let ss;

function countdown() {
  if (ss > 0) {
    let hh = ss / 3600; //hours with decimals
    let hour = Math.floor(hh); //integer of hour

    let mm = (hh - hour) * 60; //minutes with decimals
    let minute = Math.floor(mm); //interger of minute

    let second = Math.floor((mm - minute) * 60); //interger of seconds
    //decrease by 1 second
    ss -= 1;
    // render each change
    activeHH.innerHTML = hour;
    activeMM.innerHTML = minute;
    activeSS.innerHTML = second;
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
  intervalID = setInterval(countdown, 100);

  startBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");
  inputContainer.classList.toggle("hidden");
  activeDisplay.classList.toggle("hidden");
}

pauseBtn.addEventListener("click", stopCountdown);
function stopCountdown() {
  console.log("pls stop");
  clearInterval(intervalID);
  startBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");
  inputContainer.classList.toggle("hidden");
  activeDisplay.classList.toggle("hidden");
}

// function startTimer(x) {
//   console.log(hourInput);

//   //   hideButton(startBtn);
//   //   hideButton(pauseBtn);
//   //   hideButton(resetBtn);
// }

// function disableInput() {
//   inputBox.forEach((x) => (x.disabled = false));
// }
// function hideButton(x) {
//   x.classList.toggle("hidden");
// }
