window.addEventListener("load", function() {

    var handler = StripeCheckout.configure({
        key: 'pk_live_irQYOgZ48bFBO0ws2TWYASgn',
        //image: '/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        shippingAddress: 'true',
        billingAddress: 'true'
    });

    document.getElementById('buy-cd-button').addEventListener("click", function(e) {
        buyCd("big-bucks", handler);
        e.preventDefault();
        e.stopPropagation();
    });

    document.getElementById('cat-shirt-button-container').addEventListener("click", function(e) {
        size = document.getElementById('cat-shirt-size-selector').value;

        if (size === "S" ||
            size === "M" ||
            size === "L" ||
            size === "XL") { // make sure the user clicked a size button
            buyShirt("cat", size, handler);
        } else {
            alert("Please select a size");
        }
        e.preventDefault();
        e.stopPropagation();
    });

    document.getElementById('knife-shirt-button-container').addEventListener("click", function(e) {
        size = document.getElementById('knife-shirt-size-selector').value;
        if (size === "S" ||
            size === "M" ||
            size === "L" ||
            size === "XL") { // make sure the user clicked a size button
            buyShirt("knife", size, handler);
        } else {
            alert("Please select a size");
        }
        e.preventDefault();
        e.stopPropagation();
    });

    document.getElementById("buy-merch-pack-button").addEventListener("click", function(e){
        var shirtType = document.getElementById('shirt-selector').value;
        var shirtSize = document.getElementById('pack-shirt-size-selector').value;
        var album = "big-bucks";//for now, since theres only one album

        if (shirtType && shirtSize && album) {
            buyMerchPack(shirtType, shirtSize, album, handler);
        } else {
            alert("Please select a shirt and a size.");
        }
        e.preventDefault();
        e.stopPropagation();
    });
});


function post(path, params) {
    var http = new XMLHttpRequest();
    http.open("POST", path, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function(){
        if(http.responseText === "sold-out"){
            window.location.href = "/html/sold-out.html";
        } else if(http.responseText === "card-declined"){
            window.location.href = "/html/declined-card.html";
        }
    };

    var str = JSON.stringify(params);

    http.send(str);
}

function buyShirt(type, size, handler){

    size = size.toLowerCase();

    var options  = {
        name: type,
        description: "1 shirt",
        // amount: 1500,
        token: function(token, addresses) {
            token.metadata = addresses;
            token.metadata.size = size;
            token.metadata.prod = "shirt";
            token.metadata.type = "cat";
            post("/checkout", token);
        }
    };

    buy(options, handler);
}

function buyCd(album, handler){
    var options = {
        name: 'Big Bucks CD',
        description: '1 CD',
        // amount: 1000,
        token: function(token, addresses) {
            // Use the token to create the charge with a server-side script.
            // You can access the token ID with `token.id`

            console.log(addresses);
            token.metadata = addresses;
            token.metadata.prod = "cd";
            token.metadata.album = "big-bucks";
            post("/checkout", token);
        }
    };

    buy(options, handler);
}

function buyMerchPack(shirtType, shirtSize, album, handler){

    shirtSize = shirtSize.toLowerCase();
    var options = {
        name:"Merch Pack",
        description:"1 shirt + 1 cd",
        // amount: 2000,
        token: function(token, addresses){
            token.metadata = addresses;
            token.metadata.prod = "pack";
            token.metadata.shirtType = shirtType;
            token.metadata.shirtSize = shirtSize;
            token.metadata.album = album;
            post("/checkout", token);
        }
    };
    buy(options, handler);
}

function buy(options, handler){
    console.log(options);
    handler.open(options);
}
