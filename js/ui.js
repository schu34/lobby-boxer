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
        albumPlayButtons[i].onclick = function(){
            var album = this.parentNode.innerText;
            if(album === "Big Bucks"){
                playQueue.playAlbum(bigBucks);
            } else if(album === "Teddy"){
                playQueue.playAlbum(teddy);
            } else{
                playQueue.playAlbum(lobbyBoxerEP);
            }
        };
    }

});

window.addEventListener(""); //TODO

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
    return albumTable.className === "lb-album-info fade-out";
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

function drawPlayButton(node){
    //var button = document.getElementById("nav-play");
    if(node.firstChild){
        node.removeChild(node.firstChild);
    }

    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("class", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("id", "play-path");
    var polygon = document.createElementNS(xmlns, "polygon");
    polygon.setAttribute("points", "0,0 0,20 20,10");
    polygon.setAttribute("class", "svg-path");
    polygon.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(polygon);

    node.appendChild(svg);

}

function drawPauseButton(){
    var button = document.getElementById("nav-play");
    button.removeChild(document.getElementById('play-path'));

    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "15");
    svg.setAttribute("height", "20");
    svg.setAttribute("class", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("id", "play-path");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M0,0 L0,20 L5,20 L5,0 L0,0 M10,0 L10,20 L15,20 L15,0, L10,0");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    button.appendChild(svg);
}

function drawNextButton(){
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("class", "svg");


    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 0 0 L 0 20 L 17.5 10 z M 20 0 L 17.5 0 L 17.5 20 L 20 20 z");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    document.getElementById("nav-next").appendChild(svg);
}

function drawPrevButton() {
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("class", "svg");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 20 0 L 20 20 L 2.5 10 z M 0 0 L 2.5 0 L 2.5 20 L 0 20 z");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    document.getElementById("nav-back").appendChild(svg);
}

function drawDownArrow(node){
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "50");
    svg.setAttribute("class", "svg");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 50 50 L 0 0 L 10 0 L 50 40 L 90 0 L 100 0");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    node.appendChild(svg);
}
