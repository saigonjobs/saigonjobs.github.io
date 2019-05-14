var express = require('express');
var app = express();
var path = require('path');

app.get('/',function(req,res){
  console.log(req.url);
  res
    .status(200)
    .sendFile(path.join(__dirname,"/profile.html"));
});

app.get('/edit', function(req, res) {
  console.log(req.url);
  res
    .status(200)
    .sendFile(path.join(__dirname,"/edit.html"));
});

app.listen(3000,function(){
  console.log("We are listen at port 3000");
});
