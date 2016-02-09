window.addEventListener("load", function(){
    //array of image html elements. each represents an album cover
    var imgs = document.getElementsByClassName('album-cover-image');
    imgs[0].onclick = function(){playQueue.playAlbum(bigBucks);};
    imgs[1].onclick = function(){playQueue.playAlbum(lobbyBoxerEP);};
    imgs[2].onclick = function(){playQueue.playAlbum(Teddy);};


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
