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
            if(sections.length){
                var activeSections = document.getElementsByClassName('lb-section-active');
                activeSections[0].classList.add("lb-section-left");
                activeSections[0].classList.remove("lb-section-active");


                sections[0].classList.add("lb-section-active");
                sections[0].classList.remove("lb-section");
            }

            touchDownX = null;
        } else if(touchDownX < newX){
            var leftSections = document.getElementsByClassName('lb-section-left');

            if(leftSections.length){
                var activeSections = document.getElementsByClassName('lb-section-active');
                activeSections[0].classList.add("lb-section");
                activeSections[0].classList.remove("lb-section-active");



                var array = [].slice.call(leftSections);

                var section = array.pop();
                section.classList.add("lb-section-active");
                section.classList.remove("lb-section-left");
            }
            touchDownX = null;
        }

    }, false);

});
