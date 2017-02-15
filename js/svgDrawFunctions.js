//desktop stuff

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

function drawCloseButton(node){
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "svg");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 0 0 L 10 0 L 100 100 L 90 100   M 90 0 L 100 0 L 10 100 L 0 100");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    node.appendChild(svg);
}


//Mobile Stuff
function drawMenuButton() {
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "svg");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 0 0  L 100 0  L 100 20  L 0 20 M 0 40 L 100 40 L 100 60  L 0 60 M 0 80 L 100 80 L 100 100 L 0 100");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    document.getElementById("nav-menu").appendChild(svg);
}

function drawLeftArrow() {
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 50 100");
    svg.setAttribute("class", "svg");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 50 0 L 10 50 L 50 100 L 40 100 L 0 50 L 40 0");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    document.getElementById("left-button").appendChild(svg);
}

function drawRightArrow() {
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 50 100");
    svg.setAttribute("class", "svg");

    var path = document.createElementNS(xmlns, "path");
    path.setAttribute("d", "M 0 0 L 40 50 L 0 100 L 10 100 L 50 50 L 10 0");
    path.setAttribute("class", "svg-path");
    path.setAttribute("fill", "rgb(240, 242, 144)");

    svg.appendChild(path);

    document.getElementById("right-button").appendChild(svg);
}
