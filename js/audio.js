window.onload = function(){
    //array of image html elements. each represents an album cover
    var imgs = [];
    imgs = document.getElementsByClassName('album-cover-image');
    imgs[1].onclick = function(){playQueue.playAlbum(lobbyBoxerEP);};


    //set up event handlers for playback control buttons
    document.getElementById('nav-play').onclick = function(){playQueue.pause();};
    document.getElementById('nav-next').onclick = function(){playQueue.playNext();};
    document.getElementById('nav-back').onclick = function(){playQueue.playPrev();};

    //connect label property in playQueue to
    playQueue.label = document.getElementById('song-title');


    //set audio element options
    playQueue.song.controls = false;
    playQueue.song.autoplay = false;
    // var source = ctx.createMediaElementSource(playQueue.song);
    // source.connect(ctx.destination);


    //SOMTHING NEEDS TO CHANGE HERE SINCE THIS HAS NOTHING TO DO WITH AUDIO
    loadScrollHandlers();
    // window.onscroll = function(){
    //
    //     console.log("scroll event detected");
    //     if(window.scrollY > 300){
    //         document.getElementById("nav").className = "lb-nav-sticky";
    //     } else {
    //         document.getElementById("nav").className = "lb-nav";
    //     }
    // };

};
