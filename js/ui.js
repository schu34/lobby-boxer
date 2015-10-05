var loadScrollHandlers = function(){
    var navBar = document.getElementById('nav');

    window.onscroll = function(){

        console.log("scroll event detected");
        if(window.scrollY > 230){
            navBar.className = "lb-nav-sticky";
        } else {
            navBar.className = "lb-nav";
        }
    };
};
