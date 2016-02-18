window.addEventListener("load", function(){
    var infoRows = document.getElementsByClassName("lb-album-info-row");

    for (var i = 0; i < infoRows.length; i++) {
        infoRows[i].onclick = playSong;
    }
    function playSong(){
        playQueue.playSongWithTitle(this.innerText);
    }


    //set up event handlers for playback control buttons
    document.getElementById('nav-play').onclick = function(){playQueue.pause();};
    document.getElementById('nav-next').onclick = function(){playQueue.playNext();};
    document.getElementById('nav-back').onclick = function(){playQueue.playPrev();};

    //connect label property in playQueue to
    playQueue.label = document.getElementById('song-title');
    var progress = document.getElementById('seekbar');

    playQueue.song.ontimeupdate = function(){
        if(playQueue.song.duration){
            progress.value = playQueue.song.currentTime/playQueue.song.duration;
        }
    };


    //set audio element options
    playQueue.song.controls = false;
    playQueue.song.autoplay = false;
});
