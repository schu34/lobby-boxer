var xmlns = "http://www.w3.org/2000/svg";
window.addEventListener("load", function(){
    document.getElementById('header').className = "lb-section-active container-1";

    console.log("mobile stuff loaded");

    touchDownX = null;
    touchDownY = null;

    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchend", handleTouchEnd, false);

    document.getElementById('nav-menu').addEventListener("click", showAlbumMenu);
    document.getElementById('album-list').addEventListener("click", showAlbum);


    drawMenuButton();

});

function showAlbum(e){
    document.getElementById('album-list').className = "lb-album-info fade-out";
    if(e.target.innerText === "Teddy (EP)"){
        document.getElementById('teddy').className = "lb-album-info fade-in";
    }else if(e.target.innerText === "Big Bucks"){
        document.getElementById('big-bucks').className = "lb-album-info fade-in";
    } else if(e.target.innerText === "Lobby Boxer (EP)"){
        document.getElementById("lobby-boxer").className = "lb-album-info fade-in";
    }
    e.stopPropagation();
}

function showAlbumMenu(){
    document.getElementById('album-list').className = "lb-album-info fade-in";
}

function handleTouchStart(e){
    if(e.touches[0].target.classList.contains("lb-section-active")){
        touchDownX = e.touches[0].clientX;
    } else {
        touchDownX = null;
    }
}

function handleTouchEnd(e){
    if(touchDownX){
        var newX = e.changedTouches[0].clientX;
        if(touchDownX > newX){
            handleLeftSwipe();
            touchDownX = null;
        } else if(touchDownX < newX){
            handleRightSwipe();
            touchDownX = null;
        }
    }
}

function handleLeftSwipe(){
    var sections = document.getElementsByClassName('lb-section');
    if(sections.length){
        var activeSections = document.getElementsByClassName('lb-section-active');
        activeSections[0].classList.add("lb-section-left");
        activeSections[0].classList.remove("lb-section-active");

        sections[0].classList.add("lb-section-active");
        sections[0].classList.remove("lb-section");
    }
}

function handleRightSwipe(){
    var leftSections = document.getElementsByClassName('lb-section-left');

    if(leftSections.length){
        var activeSections = document.getElementsByClassName('lb-section-active');
        activeSections[0].classList.add("lb-section");
        activeSections[0].classList.remove("lb-section-active");
        //the easiest way to get the last element from an html collection
        var array = [].slice.call(leftSections);
        var section = array.pop();


        section.classList.add("lb-section-active");
        section.classList.remove("lb-section-left");
    }
}

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
