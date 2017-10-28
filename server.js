var express = require('express');
var app = express();
var path = require('path');
var public = __dirname;

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(public + "index.html"));
});

app.use('/', express.static(public));

console.log('starting at', 8080)
app.listen(8080);
