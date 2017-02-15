var xmlns = "http://www.w3.org/2000/svg";
window.addEventListener("load", function(){
    loadScrollHandlers();
    drawPlayButton(document.getElementById("nav-play"));
    drawNextButton();
    drawPrevButton();
    var covers = document.getElementsByClassName('album-cover-image');
    covers[0].onclick = function(e){
                                    hideAlbumTables();
                                    showAlbumTable("big-bucks");
                                    e.stopPropagation();
                                };
    covers[1].onclick = function(e){
                                    hideAlbumTables();
                                    showAlbumTable("lobby-boxer");
                                    e.stopPropagation();
                                };
    covers[2].onclick = function(e){
                                    hideAlbumTables();
                                    showAlbumTable("teddy");
                                    e.stopPropagation();
                                };

    document.body.onclick = hideAlbumTables;

    var albumPlayButtons = document.getElementsByClassName('album-play-button');

    for (var i = 0; i < albumPlayButtons.length; i++) {
        drawPlayButton(albumPlayButtons[i]);
        albumPlayButtons[i].onclick = playFullAlbum;
    }

    var closeButtons = document.getElementsByClassName('album-close-button');
    for (var j = 0; j < closeButtons.length; j++) {
        drawCloseButton(closeButtons[j]);
    }

});

function playFullAlbum(e){
    //get parent untill we find somthing with innner text;
    var element = e.target;
    while(element.innerText === undefined || element.innerText === "") element = element.parentNode;

    var album = element.innerText;
    console.log(album);
    if(album.trim() === "Big Bucks"){
        playQueue.playAlbum(bigBucks);
    } else if(album.trim() === "Teddy"){
        playQueue.playAlbum(teddy);
    } else{
        playQueue.playAlbum(lobbyBoxerEP);
    }
}

function showAlbumTable(album){
    var el = document.getElementById(album);
    if (el.classList.contains("fade-in")) {
        el.className = "lb-album-info fade-out";
    } else {
        el.className = "lb-album-info fade-in";
    }


}

function hideAlbumTable(album){
    document.getElementById(album).className = "lb-album-info fade-out";
}

function hideAlbumTables(){
    hideAlbumTable("big-bucks");
    hideAlbumTable("lobby-boxer");
    hideAlbumTable("teddy");
}

function isVisable(albumTable){
    return albumTable.className === "lb-album-info fade-in";
}

function scroll() {
    var navBar = document.getElementById('nav');

    console.log("scroll event detected");
    if(window.scrollY > 260){
        navBar.className = "lb-nav-sticky";
    } else {
        navBar.className = "lb-navbar";
    }
}


function loadScrollHandlers(){
    var navBar = document.getElementById('nav');
    //if the user loads the page already scrolled down
    if(window.scrollY > 260){
        navBar.className = "lb-nav-sticky";
    }
    document.onscroll =  scroll;


    console.log("scroll handler loaded");
}
