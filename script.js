$(document).ready(function() {
  const updateTime = function() {
    let minutes = parseInt($("#update-time").val());
    if (minutes < 1 || minutes > 59) {
      window.location.reload();
      return false;
    }
    localStorage.setItem("timerLength", minutes);
    window.location.reload();
  };

  const timesUp = function() {
    $("audio")
      .get(0)
      .play();
    console.log("Timer up!");
    pomoCount++;
    localStorage.setItem(dayKey, pomoCount);
    $("#total").text(pomoCount);

    setTimeout(function() {
      window.location.reload();
    }, 1000);
  };

  const updateBadge = function(mins) {
    if (chrome.browserAction) {
      if (mins === 0) mins = 1;
      chrome.browserAction.setBadgeText({ text: String(mins) });
    }
  };

  const formatTime = function(time) {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    updateBadge(mins);

    let clock = "";

    if (hrs > 0) {
      clock += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    clock += "" + mins + ":" + (secs < 10 ? "0" : "");
    clock += "" + secs;

    return clock;
  };

  const startTimer = function(duration) {
    const countdownNumberEl = document.getElementById("countdown-number");
    const circle = document.getElementsByClassName("countdown-circle")[0];
    const countdown = duration;
    let newcountdown = countdown;
    const maxoffset = 2 * Math.PI * 100;
    let offset = 0;

    countdownNumberEl.textContent = formatTime(countdown);

    tick = setInterval(function() {
      if (paused) {
      } else {
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
      }
    }, 1000);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let d = new Date();
  let month = monthNames[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();
  let dayKey = month + day + year;

  let paused = true;

  let timerLength = localStorage.getItem("timerLength") || 25;

  let pomoCount = localStorage.getItem(dayKey) || 0;


  $("#timerLength").text(timerLength + " min");
  
  $("#timerLength").click(function() {
    $("#timerLength").text("");
    $("#timerLength").append(
      "<input id='update-time' value='" + timerLength + "'>"
    );

    $("#update-time")
      .focus()
      .select();

    $("#update-time").keypress(function() {
      if (event.keyCode === 13) {
        updateTime();
      }
    });

    $("#update-time").blur(function() {
      updateTime();
    });
  });

  $("#today").text(month + " " + day + " : ");

  $("#total").text(pomoCount);

  $(".fa-pause").hide();

  $(".fa-play").click(function() {
    paused = false;
    $(".fa-play").hide();
    $(".fa-pause").show();
  });

  $(".fa-pause").click(function() {
    paused = true;
    $(".fa-pause").hide();
    $(".fa-play").show();
  });

  startTimer(timerLength * 60);
});
