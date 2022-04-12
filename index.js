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
    activeHH.innerHTML = hour.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    activeMM.innerHTML = minute.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    activeSS.innerHTML = second.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    console.log(hour, minute, second);
    // decrease by 1 second
    ss -= 1;
  } else {
    stopCountdown();
  }
}

function formStart(e) {
  e.preventDefault();
  //get form data user inputted
  let formData = new FormData(form);
  let hrData = parseFloat(formData.get("hour"));
  let minData = parseFloat(formData.get("minute"));
  let ssData = parseFloat(formData.get("second"));
  let totalSeconds = hrData * 3600 + minData * 60 + ssData;
  ss = totalSeconds;
  // if pause btn is clicked, reset data to values on display/active screen
  if (intervalID == "paused") {
    hrData = parseFloat(activeHH.innerHTML);
    minData = parseFloat(activeMM.innerHTML);
    ssData = parseFloat(activeSS.innerHTML);
    totalSeconds = hrData * 3600 + minData * 60 + ssData;
    ss = totalSeconds;
    intervalID = null;
  }

  // initial call
  countdown();
  // subsequent delayed calls
  intervalID = setInterval(countdown, 1000);
  // on submit, hide inputs & start btn, show display screen with pause + reset btns
  inputContainer.classList.add("hidden");
  startBtn.classList.add("hidden");
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
  // console.log(intervalID);
}

function stopCountdown() {
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
