window.addEventListener("load", function(){
    document.getElementById('header').className = "lb-section-active container-1";

    console.log("mobile stuff loaded");


    touchDownX = null;
    touchDownY = null;

    window.addEventListener("touchstart", function(e){
        touchDownX = e.touches[0].clientX;
        console.log("touchStart: " + touchDownX);
    }, false);

    window.addEventListener("touchend", function(e){
        var newX = e.changedTouches[0].clientX;
        console.log("touchMove: " + newX);
        if(touchDownX > newX){
            var sections = document.getElementsByClassName('lb-section');
            sections[0].classList.add("lb-section-active");
            sections[0].classList.remove("lb-section");
            touchDownX = null;
        } else if(touchDownX < newX){
            var activeSections = document.getElementsByClassName('lb-section-active');
            var array = [].slice.call(activeSections);

            var section = array.pop();
            section.classList.add("lb-section");
            section.classList.remove("lb-section-active");
            touchDownX = null;
        }

    }, false);

});
