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

app.use(express.static(__dirname));

function getAlbums(callback){
    request(FBurl + accessKey + FBCoverPhotoReq, function(error, response, body){
        if (error) {
            console.log("ERROR" + error);
        } else {
            callback(body);
            //console.log("body: "+ body);
        }
    });

}

function getPhotoURLs(albums, callback){

    var completedRequests = 0;

    var pictureURLs = [];
    albums.forEach(function(album, i, a){
         var url = FBRootUrl + album.cover_photo.id + accessKey + FBlinkReq;
        //console.log("getPhotourl: " + url);

        request(url, function(error, response, body){
            if(error){
                console.log("ERROR" + error);
            } else {


                completedRequests++;

                var bodyObj = JSON.parse(body);
                //console.log(bodyObj);
                pictureURLs[i] = {url:bodyObj.images[0].source, name: album.name};

                if(completedRequests === albums.length){ //make sure we have all photos before sending response
                    callback(pictureURLs);
                }
            }
        });
    });
}

app.get('/photoAlbumList', function(req, res){

    getAlbums(function(JSONResponse){
        var objResponse = JSON.parse(JSONResponse);
        var albums = objResponse.data;

        getPhotoURLs(albums, function(pictureURLs){
            var resString = JSON.stringify(pictureURLs);
            res.send(pictureURLs);
        });
    });
});

http.createServer(app).listen(3000);

console.log("listening on port 3000");
