var audio;

document.addEventListener("DOMContentLoaded", function () {


    audio = new CourseAudio({
        node: document.getElementById("flashContent")
    });

    audio.create({
        url:"CourseViewPlayer.swf",
        width:32,
        height:32,
        playIcon:'play.png',
        pauseIcon:'pause.png',
        name: 'audio'
    });

    /* ["mousemove", "mousedown", "mouseup"].forEach(function (e) {
     container.addEventListener(e, canvas.listener, true);
     });
     ["keypress", "keydown"].forEach(function (e) {
     document.addEventListener(e, canvas.listener, true);
     });       */

});