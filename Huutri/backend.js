var express=require('express');
var route=express.Route();
var bodyParser=require('body-parser');
var app=express();
var path=require('path');
var objectId=require('mongodb').ObjectId;
var assert=require('assert');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(( extended:true)));

var MongoClient=mongodb.MongoClient;
var url='mongodb://localhost::27017/cmt.table';

app.get('/',function(req,res){
	console.log(req.url);
	res
	   .status(200)
	   .sendFile(path.join(__dirname,"/index.html"));
});

app.listen(3000,function(){
    console.log("hello");
});
