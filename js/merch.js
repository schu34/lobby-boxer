window.addEventListener("load", function() {

    var handler = StripeCheckout.configure({
        key: 'pk_test_eVAXqCo9lvS5VN7vKSfIjUzQ',
        image: '/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        shippingAddress: 'true',
        billingAddress: 'true'
    });

    document.getElementById('buy-cd-button').addEventListener("click", function(e) {
        handler.open({
            name: 'Big Bucks CD',
            description: '1 CD',
            amount: 1000,
            token: function(token, addresses) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`

                console.log(addresses);
                token.metadata = addresses;
                token.metadata.prod = "cd";
                post("/checkout", token);
            }
        });
        e.preventDefault();
        e.stopPropagation();
    });

    document.getElementById('buy-shirt-button').addEventListener("click", function(e) {
        if (e.target.innerText !== "Buy Now") { // make sure the user clicked a size button,not just buy now
            handler.open({
                name: 'Cat T-shirt',
                description: "1 shirt",
                amount: 1500,
                token: function(token, addresses) {
                    token.metadata = addresses;
                    token.metadata.size = e.target.innerText;
                    token.metadata.prod = "cat-shirt";
                    post("/checkout", token);
                }
            });
        }
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
