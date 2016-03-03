var http = require('http');

var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var request = require('request');

var stripe = require('stripe')('sk_test_rxcYUYRubfBT6gItLcpcg02f');

var FBid = '887526761334958';
var FBSecret = 'f8e8b4d25231bbea3e83e8fb83de022c';
var FBurl = 'https://graph.facebook.com/v2.5/lobbyboxerstl/albums';
var FBRootUrl = 'https://graph.facebook.com/v2.5/';
var accessKey = '?access_token=' + FBid + '|' + FBSecret;
var FBCoverPhotoReq = "&fields=cover_photo,name";
var FBlinkReq = "&fields=images";
var FBPhotosUrl = FBRootUrl + "/1264750496873466/photos";
var FBtagged = "&type=uploaded";

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html");
});


function getPhotoList(callback) {
    var url = FBPhotosUrl + accessKey + FBlinkReq; //+ FBtagged;
    request(url, function(error, res, body) {
        if (error) {
            console.log(error);
        } else {
            callback(body);
        }
    });
}

app.get('/photos', function(req, res) {
    getPhotoList(function(json) {
        res.send(json);
    });

});

app.post('/checkout', function(req, res) {
    console.log(req.body);
    var stripeToken = req.body.id;
    if (req.body.metadata.prod === "cat-shirt"){
        var size = req.body.metadata.size;
        skuId = 'sku_801YZYedpc8Zo'+size[0];
        stripe.skus.retrieve(skuId, function(err, sku) {
            if (!err) {
                if (sku.inventory.quantity > 0) {
                    var charge = stripe.charges.create({
                        amount: 1500, // amount in cents, again
                        currency: "usd",
                        source: stripeToken,
                        description: "CD",
                        metadata: req.body.metadata
                    }, function(err, charge) {
                        if (err && err.type === 'StripeCardError') {
                            // The card has been declined
                            res.send("card-declined");
                        } else {
                            stripe.skus.update(skuId, {
                                inventory: {
                                    quantity: sku.inventory.quantity - 1
                                }
                            });
                            res.send("success");
                        }
                    });
                } else {
                    res.send("sold-out");
                    console.log("SOLD OUT  OF " + req.body.metadata.size);
                }
            }
        });
    }

    if (req.body.metadata.prod === "cd") {
        stripe.skus.retrieve('sku_801FQapyyPayfF', function(err, sku) {
            if (!err) {
                if (sku.inventory.quantity > 0) {
                    var charge = stripe.charges.create({
                        amount: 1000, // amount in cents, again
                        currency: "usd",
                        source: stripeToken,
                        description: "CD",
                        metadata: req.body.metadata
                    }, function(err, charge) {
                        if (err && err.type === 'StripeCardError') {
                            // The card has been declined
                        } else {
                            stripe.skus.update('sku_801FQapyyPayfF', {
                                inventory: {
                                    quantity: sku.inventory.quantity - 1
                                }
                            });
                            res.status(302);
                            res.send();
                        }
                    });
                }
            }
        });
    }


    // var charge = stripe.charges.create({
    //     amount: 1500, // amount in cents, again
    //     currency: "usd",
    //     source: stripeToken,
    //     description: "Example charge",
    //     metadata: req.body.metadata
    // }, function(err, charge) {
    //     if (err && err.type === 'StripeCardError') {
    //         // The card has been declined
    //     }
    // });
    // res.status(302);
    // res.send();

});


http.createServer(app).listen(process.env.PORT || 5000);

console.log("listening on port 5000");
