$(document).ready(function() {
    function fancyTimeFormat(time) {
        // Hours, minutes and seconds
        const hrs = ~~(time / 3600);
        const mins = ~~((time % 3600) / 60);
        const secs = ~~time % 60;
      
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
      
        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
      
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        if (secs === 0) alert('Timer is up!');
        return ret;
      }
      const countdownNumberEl = document.getElementById("countdown-number");
      const circle = document.getElementsByClassName("countdown-circle")[0];
      const countdown = 5;
      let newcountdown = countdown;
      const maxoffset = 2 * Math.PI * 100;
      let offset = 0;
      countdownNumberEl.textContent = fancyTimeFormat(countdown);
      
      tick = setInterval(function() {
        newcountdown = --newcountdown <= 0 ? 0 : newcountdown;
        if (offset - maxoffset / countdown >= -Math.abs(maxoffset)) {
          offset = offset - maxoffset / countdown;
        } else {
          offset = -Math.abs(maxoffset);
          clearInterval(tick);
        }
      
        countdownNumberEl.textContent = fancyTimeFormat(newcountdown);
        circle.setAttribute("style", "stroke-dashoffset:" + offset + "px");
      }, 1000);
      
});

