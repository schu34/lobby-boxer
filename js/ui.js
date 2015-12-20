var loadScrollHandlers = function(){
    var navBar = document.getElementById('nav');

    //if the user loads the page already scrolled down
    if(window.scrollY > 230){
        navBar.className = "lb-nav-sticky";
    }

    window.onscroll = function(){

        console.log("scroll event detected");
        if(window.scrollY > 230){
            navBar.className = "lb-nav-sticky";
        } else {
            navBar.className = "lb-nav";
        }
    };
};
