var http = require('http');

var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var request = require('request');
var async = require('async');

var stripe = require('stripe')('sk_live_cBnpupKibdAMZHGqItcraaNd');

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

app.get("/", function(req, res) {
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
    console.log("/checkout  prod = " + req.body.metadata.prod);
    if (req.body.metadata.prod === "shirt") {
        return chargeShirt(req.body, function(err){});
    }

    if (req.body.metadata.prod === "cd") {
        return chargeCd(req.body, function(err) {
            if (err) {
                res.send(err);
                console.log("ERROR" + err);
            }
        });
    }

    if(req.body.metadata.prod === "pack"){
        return chargePack(req.body);
    }
    res.send(202);

});

function chargeShirt(token, callback) {
    //TODO: refactor app.post(/checkout) into this

    var id = token.id;

    var skuId = token.metadata.type + "-shirt-" + token.metadata.size;
    console.log("charging for shirt...");

    return checkSoldOut(token, 1500, [skuId]);
    // stripe.skus.retrieve(skuId, createCharge(1500, token));

}

function chargeCd(token, callback) {
    console.log("charging for CD...");
    var id = token.id;

    var skuId = token.metadata.album + "-cd";
    return checkSoldOut(token, 1000, [skuId]);
    // stripe.skus.retrieve(skuId, createCharge(1000, token));
}

function chargePack(token){

    console.log("charging for pack");
    var shirtSku = token.metadata.shirtType + "-shirt-" + token.metadata.shirtSize;
    var cdSku = token.metadata.album + "-cd";
    return checkSoldOut(token, 2000, [shirtSku, cdSku]);

}

function checkSoldOut(token, price, skuIds){

    console.log("checking if sold out");

    var soldOut = false;

    var skus = [];

    async.each(skuIds,function(skuId, callback){
        stripe.skus.retrieve(skuId, function(err, sku){
            if(err){
                return callback(err);
            }else if(sku.inventory.quantity < 0){
                soldOut = true;
                return callback();
            } else {
                console.log("not sold out of " + sku.id);
                skus.push(sku);
                return callback();

            }
        });
    },function(err){
        if (err) {
            console.log(err);
        }else if(!soldOut){
            return createCharge(token, price, skus);
        }else{
            console.log("sold out");
        }
    });

}

function createCharge(token, price, skus){

    var domesticShipping = 300, internationShipping = 1400

    if (token.metadata.shipping_address_country_code == "US") {
        price += domesticShipping;
    } else {
        price += internationShipping;
    }

    console.log("createing charge...");

    var options = {
        amount: price, // amount in cents
        currency: "usd",
        source: token.id,
        description: skus[0].id,
        metadata: token.metadata
    };
    var charge = stripe.charges.create(options, decrementSkus(skus));
}

function decrementSkus(skus){
    return function(err, charge){
        if(err){
            console.log("ERROR: " + err);
        } else{
            console.log("updating sku");
            async.each(skus, function(sku, callback){
                console.log("decrementing " + sku.id);
                stripe.skus.update(sku.id, {
                    inventory: {
                        quantity: sku.inventory.quantity - 1
                    }
                });
                return callback();
            });

        }
    };
}

http.createServer(app).listen(process.env.PORT || 5000);

console.log("listening on port 5000");
