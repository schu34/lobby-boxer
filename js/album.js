function Album(title, numTracks, tracklist){
    this.title = title;
    this.numTracks = numTracks;
    this.tracklist = tracklist;
    this.currentTrack = -1;

    this.getCurrentTrackTitle = function(){
        return tracklist[currentTrack];
    };

}

var teddyTracks = ["These Is Fightin' Words", "You're Not An Immigrant, Yet", "Midwest Bedtime Stories"];

var Teddy = new Album("Teddy", 3, teddyTracks);

var lobbyBoxerTracks = ["A Perfect Future", "The Truman Show", "Headrush", "Cap'n Gown", "Fragile Girl"];

var lobbyBoxerEP = new Album("Lobby Boxer", 5, lobbyBoxerTracks);
