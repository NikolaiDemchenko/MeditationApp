window.addEventListener("DOMContentLoaded", () => {
   const doc = document;

   const play = doc.querySelector(".play-button"),
         pause = doc.querySelector(".pause-button"),
         video = doc.querySelector(".video"),
         audio = doc.querySelector(".audio"),
         time = doc.querySelector(".time"),
         outline = doc.querySelector(".move circle"),
         outlineLength = outline.getTotalLength();

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;

   let audioTime = 120;

   window.addEventListener("click", (e) => {
       if (getClassListContains(e, "play-button")) {
          changeVisibleOfPlayPauseBtn(play);
          video.play();
          audio.play();
          video.loop = "loop";
       }

       if (getClassListContains(e, "pause-button")) {
           changeVisibleOfPlayPauseBtn(pause);
           video.pause();
           audio.pause();
       }

       if (getClassListContains(e, "replay-button")) {
           audio.currentTime = 0;
       }

       if (getClassListContains(e, "rain-button")) {
           if (play.classList.contains("hide")) {
               play.classList.toggle("hide");
               pause.classList.toggle("hide");
           }

           video.src = "video/rain.mp4";
           audio.src = "sounds/rain.mp3";
       }

       if (getClassListContains(e, "sun-button")) {
           if (play.classList.contains("hide")) {
               play.classList.toggle("hide");
               pause.classList.toggle("hide");
           }

           video.src = "video/sun.mp4";
           audio.src = "sounds/sun.mp3";
       }

       if (getClassListContains(e, "two-min")) {
           audioTime = 120;
           time.innerHTML = `2:0`;
           audio.currentTime = 0;
       }

       if (getClassListContains(e, "five-min")) {
           audioTime = 300;
           time.innerHTML = `5:0`;
           audio.currentTime = 0;
       }

       if (getClassListContains(e, "ten-min")) {
           audioTime = 600;
           time.innerHTML = `10:0`;
           audio.currentTime = 0;
       }
   });

   function getClassListContains(e, className) {
       if (e.target.classList.contains(className)) {
           return true;
       }
       return false;
   }

   function changeVisibleOfPlayPauseBtn(btn) {
       if (btn.classList.contains("hide")) {
           play.classList.toggle("hide");
           pause.classList.toggle("hide");
       }
       else {
           play.classList.toggle("hide");
           pause.classList.toggle("hide");
       }
   }

   audio.ontimeupdate = function () {
       let timeLeft = audioTime - audio.currentTime,
           min = Math.floor(timeLeft / 60),
           sec = Math.floor(timeLeft % 60);

       time.innerHTML = `${min}:${sec}`;

       outline.style.strokeDashoffset = outlineLength - (audio.currentTime / audioTime) * outlineLength;

       if (timeLeft < 0) {
           audio.pause();
           video.pause();
           time.innerHTML = `0:0`;
           audio.currentTime = 0;
           play.classList.toggle("hide");
           pause.classList.toggle("hide");
       }
   }
});