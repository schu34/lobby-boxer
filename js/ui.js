window.addEventListener("load", function(){loadScrollHandlers();});

window.onscroll =  function(){
    console.log("scroll event detected");
    if(window.scrollY > 230){
        navBar.className = "lb-nav-sticky";
    } else {
        navBar.className = "lb-navbar";
    }
};


var loadScrollHandlers = function(){
    var navBar = document.getElementById('nav');
    //if the user loads the page already scrolled down
    if(window.scrollY > 230){
        navBar.className = "lb-nav-sticky";
    }


    console.log("scroll handler loaded");
};
