window.addEventListener("load", function(){
    var vidIds = ["ama23IRyQ3s:Lobby Boxer Goes to Barnfest 5 (The Documentary)",
                  "w0F7ldB_V-c:Cap'n Gown (Music Video)",
                  "IgC_vW9lS0g:Fragile Girl LIVE @ Fubar - 12/1/13",
                  "MP6MU7rwnlk:Galaxy Radio Acoustic Sessions",
                  "BJyLx0Vxe4k:Midwest Bedtime Stories LIVE @ Webster University",
                  "n-e6zPMqVP8:Intro/Song 1 - Live at FUBAR St. Louis"];


    var container = document.getElementById('video-container');

    vidIds.forEach(function(v){

        var splitIds = v.split(":");

        var source  = "http://img.youtube.com/vi/" + splitIds[0] + "/hqdefault.jpg";
        var videoURL = "https://www.youtube.com/watch?v=" + splitIds[0];
        var div = document.createElement("div");
        div.className = "lb-photo-album";

        a = document.createElement("a");
        a.href = videoURL;
        var infoDiv = document.createElement("div");
        infoDiv.className = "video-info";
        infoDiv.innerText = splitIds[1];


        var img = new Image();
        img.src = source;
        img.className = "album-thumbnail-vid";

        div.appendChild(img);
        div.appendChild(infoDiv);
        a.appendChild(div);

        container.appendChild(a);
    });

});
