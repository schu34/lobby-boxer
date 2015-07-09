var http = require('http');

var express = require('express');
var app = express();


var request = require('request');

app.use(express.static(__dirname));

http.createServer(app).listen(3000);

console.log("listening on port 3000");
