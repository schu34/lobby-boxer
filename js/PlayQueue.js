var playQueue = {
    queue: [],
    currentPositionInQueue: -1,
    song: new Audio(),
    label: {},
    playButton: {},
    playFirst: function(){
        this.playSong(0);
    },
    loadSong: function(queuePos){
        this.currentPositionInQueue = queuePos;
        this.song.src = "../audio/" + this.queue[queuePos] + ".mp3";

        this.label.innerText = this.queue[queuePos];
    },
    loadSongWithTitle: function(title){
        this.queue[0] = title;
    },
    playSongWithTitle: function(title) {
        this.reset();
        this.loadSongWithTitle(title);
        this.playFirst();
    },
    playSong: function(queuePos){

        if(queuePos >= 0 && queuePos < this.queue.length){
            this.loadSong(queuePos);
            this.song.currentTime = 0;
            drawPauseButton();
            this.song.play();
        } else {
            this.reset();
        }
    },
    playAlbum: function(album){
        this.reset();
        this.queue = album.tracklist;
        this.playFirst();
        var t = this;
        this.song.onended = function(){
            t.playNext();
        };
    },
    pause: function(){
        if(this.song.paused){
            drawPauseButton();
            this.song.play();
        }
        else{
            drawPlayButton(document.getElementById('nav-play'));
            this.song.pause();
        }
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
            this.reset();
        } else {
            this.playSong(prevNum);
        }
    },
    reset: function(){
        this.song.pause();
        this.currentPositionInQueue = -1;
        this.queue = [];
        this.label.innerText = "Click an album to listen";
        drawPlayButton(document.getElementById('nav-play'));
    }
};
