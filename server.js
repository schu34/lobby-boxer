var http = require('http');

var express = require('express');
var app = express();


var request = require('request');

var FBid = '887526761334958';
var FBSecret = 'f8e8b4d25231bbea3e83e8fb83de022c';
var FBurl = 'https://graph.facebook.com/v2.5/lobbyboxerstl/albums';
var FBRootUrl = 'https://graph.facebook.com/v2.5/';
var accessKey = '?access_token='+ FBid + '|' + FBSecret;
var FBCoverPhotoReq = "&fields=cover_photo,name";
var FBlinkReq = "&fields=images";
var FBPhotosUrl = FBRootUrl + "/1264750496873466/photos";
var FBtagged = "&type=uploaded";

app.use(express.static(__dirname));

// function getAlbumList(){
//     var url =
// }

function getPhotoList(callback){
    var url = FBPhotosUrl + accessKey + FBlinkReq; //+ FBtagged;
    request(url, function(error, res, body){
        if(error){
            console.log(error);
        } else {
            callback(body);
        }
    });
}

app.get('/photos', function(req, res){
    getPhotoList(function(json){
        res.send(json);
    });

});


http.createServer(app).listen(process.env.PORT || 5000);

console.log("listening on port 5000");
