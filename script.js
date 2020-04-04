$(document).ready(function() {
  const timesUp = function() {
    alert("Timer up!");
    // play bell sound
    // update pomodors complete in local storage
    // window.location.reload();
  };

  const formatTime = function(time) {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    let clock = "";

    if (hrs > 0) {
      clock += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    clock += "" + mins + ":" + (secs < 10 ? "0" : "");
    clock += "" + secs;

    return clock;
  };

  const countdownNumberEl = document.getElementById("countdown-number");
  const circle = document.getElementsByClassName("countdown-circle")[0];
  const countdown = 5;
  let newcountdown = countdown;
  const maxoffset = 2 * Math.PI * 100;
  let offset = 0;

  countdownNumberEl.textContent = formatTime(countdown);

  tick = setInterval(function() {
    newcountdown = --newcountdown <= 0 ? 0 : newcountdown;

    if (offset - maxoffset / countdown >= -Math.abs(maxoffset)) {
      offset = offset - maxoffset / countdown;
    } else {
      offset = -Math.abs(maxoffset);
      clearInterval(tick);
    }

    if (newcountdown === 0) {
      timesUp();
      clearInterval(tick);
    }

    countdownNumberEl.textContent = formatTime(newcountdown);

    circle.setAttribute("style", "stroke-dashoffset:" + offset + "px");
  }, 1000);
});
