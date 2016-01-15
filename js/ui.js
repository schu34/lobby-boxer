var xmlns = "http://www.w3.org/2000/svg";
window.addEventListener("load", function(){
    loadScrollHandlers();
    drawPlayButton();
    drawNextButton();
    drawPrevButton();
});

window.addEventListener(""); //TODO

function scroll() {
    var navBar = document.getElementById('nav');

    console.log("scroll event detected");
    if(window.scrollY > 230){
        navBar.className = "lb-nav-sticky";
    } else {
        navBar.className = "lb-navbar";
    }
}


function loadScrollHandlers(){
    var navBar = document.getElementById('nav');
    //if the user loads the page already scrolled down
    if(window.scrollY > 230){
        navBar.className = "lb-nav-sticky";
    }
    document.onscroll =  scroll;


    console.log("scroll handler loaded");
}

function drawPlayButton(){
    var button = document.getElementById("nav-play");
    var p = document.getElementById('play-path');
    if(p){
        button.removeChild(p);
    }

    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("id", "play-path");
    var polygon = document.createElementNS(xmlns, "polygon");
    polygon.setAttribute("points", "0,0 0,20 20,10");
    polygon.setAttribute("fill", "rgb(142, 197, 235)");

    svg.appendChild(polygon);

    button.appendChild(svg);

}

function drawPauseButton(){
    var button = document.getElementById("nav-play");
    button.removeChild(document.getElementById('play-path'));

    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "15");
    svg.setAttribute("height", "20");
    svg.setAttribute("id", "play-path");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M0,0 L0,20 L5,20 L5,0 L0,0 M10,0 L10,20 L15,20 L15,0, L10,0");
    path.setAttribute("fill", "rgb(142, 197, 235)");

    svg.appendChild(path);

    button.appendChild(svg);
}

function drawNextButton(){
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");


    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 0 0 L 0 20 L 17.5 10 z M 20 0 L 17.5 0 L 17.5 20 L 20 20 z");
    path.setAttribute("fill", "rgb(142, 197, 235)");

    svg.appendChild(path);

    document.getElementById("nav-next").appendChild(svg);
}

function drawPrevButton() {
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");


    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 20 0 L 20 20 L 2.5 10 z M 0 0 L 2.5 0 L 2.5 20 L 0 20 z");
    path.setAttribute("fill", "rgb(142, 197, 235)");

    svg.appendChild(path);

    document.getElementById("nav-back").appendChild(svg);
}

function drawDownArrow(node){
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "50");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 50 50 L 0 0 L 10 0 L 50 40 L 90 0 L 100 0");
    path.setAttribute("fill", "rgb(142, 197, 235)");

    svg.appendChild(path);

    node.appendChild(svg);
}
