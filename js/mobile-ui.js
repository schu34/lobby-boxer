var xmlns = "http://www.w3.org/2000/svg";
window.addEventListener("load", function() {
    document.getElementById('header').className = "lb-section-active container-1";

    console.log("mobile stuff loaded");

    touchDownX = null;
    touchDownY = null;

    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchend", handleTouchEnd, false);

    document.getElementById('right-button').addEventListener("click", handleLeftSwipe);
    document.getElementById('left-button').addEventListener("click", handleRightSwipe);

    document.getElementById('nav-menu').addEventListener("click", showAlbumMenu);
    document.getElementById('album-list').addEventListener("click", showAlbum);

    var navLinks = document.getElementsByClassName('lb-nav-list');

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].onclick = goToSection;
    }

    drawMenuButton();
    drawLeftArrow();
    drawRightArrow();

});

function showAlbum(e) {
    document.getElementById('album-list').className = "lb-album-info fade-out";
    if (e.target.innerText === "Teddy (EP)") {
        document.getElementById('teddy').className = "lb-album-info fade-in";
    } else if (e.target.innerText === "Big Bucks") {
        document.getElementById('big-bucks').className = "lb-album-info fade-in";
    } else if (e.target.innerText === "Lobby Boxer (EP)") {
        document.getElementById("lobby-boxer").className = "lb-album-info fade-in";
    }
    e.stopPropagation();
}

function goToSection(e) {
    if (screen.width < 480) {
        var sectionId = e.target.innerText.toUpperCase();
        var currentId = document.getElementsByClassName("lb-section-active")[0].id.toUpperCase()
        while (currentId !== sectionId) {
            handleLeftSwipe();
            currentId = document.getElementsByClassName("lb-section-active")[0].id.toUpperCase();
        }
    }
}

function showAlbumMenu() {
    document.getElementById('album-list').className = "lb-album-info fade-in";
}

function handleTouchStart(e) {
    if (e.touches[0].target.classList.contains("lb-section-active")) {
        touchDownX = e.touches[0].clientX;
    } else {
        touchDownX = null;
    }
}

function handleTouchEnd(e) {
    if (touchDownX) {
        var newX = e.changedTouches[0].clientX;
        if (touchDownX > newX) {
            handleLeftSwipe();
            touchDownX = null;
        } else if (touchDownX < newX) {
            handleRightSwipe();
            touchDownX = null;
        }
    }
}

function handleLeftSwipe() {
    var sections = document.getElementsByClassName('lb-section');
    document.getElementById("left-button").className = "left-button fade-in";
    if (sections.length) {
        var activeSections = document.getElementsByClassName('lb-section-active');
        activeSections[0].classList.add("lb-section-left");
        activeSections[0].classList.remove("lb-section-active");

        sections[0].classList.add("lb-section-active");
        sections[0].classList.remove("lb-section");
    }
    if (!sections.length) {
        document.getElementById('right-button').className = "right-button fade-out";
    }
}

function handleRightSwipe() {
    var leftSections = document.getElementsByClassName('lb-section-left');
    document.getElementById('right-button').className = "right-button fade-in";
    if (leftSections.length) {
        var activeSections = document.getElementsByClassName('lb-section-active');
        activeSections[0].classList.add("lb-section");
        activeSections[0].classList.remove("lb-section-active");

        //the easiest way to get the last element from an html collection
        var array = [].slice.call(leftSections);
        var section = array.pop();


        section.classList.add("lb-section-active");
        section.classList.remove("lb-section-left");
    }
    if (!leftSections.length) {
        document.getElementById('left-button').className = "left-button fade-out";
    }
}
