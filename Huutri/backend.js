var express=require('express');
var app=express();
var path=require('path');

app.get('/',function(req,res){
	console.log(req.url);
	res
	   .status(200)
	   .sendFile(path.join(__dirname,"/index.html"));
});

app.listen(3000,function(){
    console.log("hello");
});
