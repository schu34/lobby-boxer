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
    currentPositionInQueue:-1,
    song: new Audio(),
    label: {},
    playFirst: function(){
        this.playSong(0);
    },
    loadSong: function(queuePos){
        this.currentPositionInQueue = queuePos;
        var tempSong = new Audio();
        tempSong.src = "../audio/" + this.queue[queuePos] + ".mp3";
        tempSong.controls = false;
        tempSong.autoplay = false;
        this.song = tempSong;

        //var titleNode  = document.getElementById('song-title');
        this.label.innerText = this.queue[queuePos];
    },
    playSong: function(queuePos){

        if(queuePos >= 0 && queuePos < this.queue.length){

            this.loadSong(queuePos);
            var source = ctx.createMediaElementSource(this.song);
            source.connect(ctx.destination);
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
        song.pause();
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
        if(prevNum === 0 || nextNum > this.queue.length){
            this.reset();
        } else {
            this.playSong(nextNum);
        }
    },
    reset: function(){
        this.song = new Audio();
        this.currentPositionInQueue = -1;
        this.queue = [];
    }
};



window.onload = function(){
    var imgs = [];
    imgs = document.getElementsByClassName('album-cover-image');
    imgs[1].onclick = function(){playQueue.playAlbum(lobbyBoxerEP);};

    document.getElementById('nav-play').onclick = function(){playQueue.pause();};

    playQueue.label = document.getElementById('song-title');

};
