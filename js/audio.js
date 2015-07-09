var ctx = new AudioContext();

var currentSongTitle;

var playing = false;

var play = function(){
    currentSong.play();
};

var pause = function(){
    currentSong.pause();
};

var playQueue = {
    queue: [],
    currentPositionInQueue: -1,
    song: new Audio(),
    label: {},
    playFirst: function(){
        this.playSong(0);
    },
    loadSong: function(queuePos){
        this.currentPositionInQueue = queuePos;
        this.song.src = "../audio/" + this.queue[queuePos] + ".mp3";

        this.label.innerText = this.queue[queuePos];
    },
    playSong: function(queuePos){

        if(queuePos >= 0 && queuePos < this.queue.length){
            this.loadSong(queuePos);
            this.song.currentTime = 0;
            this.song.play();
        } else {
            this.reset();
        }
    },
    playAlbum: function(album){
        this.reset();
        this.queue = album.tracklist;
        this.playFirst();
    },
    pause: function(){
        if(this.song.paused)
            this.song.play();
        else
            this.song.pause();
    },
    playNext: function(){
        var nextNum = this.currentPositionInQueue + 1;
        if(nextNum === 0 || nextNum > this.queue.length){
            this.reset();
        } else {
            this.playSong(nextNum);
        }
    },
    playPrev: function(){
        var prevNum = this.currentPositionInQueue - 1;

        if(this.song.currentTime > 2){
            this.song.currentTime = 0;
        } else if(prevNum < 0){
            this.song.pause();
            this.reset();
        } else {
            this.playSong(prevNum);
        }
    },
    reset: function(){
        this.song.pause();
        this.currentPositionInQueue = -1;
        this.queue = [];
        this.label.innerText = "";
    }
};



window.onload = function(){
    var imgs = [];
    imgs = document.getElementsByClassName('album-cover-image');
    imgs[1].onclick = function(){playQueue.playAlbum(lobbyBoxerEP);};

    document.getElementById('nav-play').onclick = function(){playQueue.pause();};
    document.getElementById('nav-next').onclick = function(){playQueue.playNext();};
    document.getElementById('nav-back').onclick = function(){playQueue.playPrev();};

    playQueue.label = document.getElementById('song-title');
    playQueue.song.controls = false;
    playQueue.song.autoplay = false;
    var source = ctx.createMediaElementSource(playQueue.song);
    source.connect(ctx.destination);


};
