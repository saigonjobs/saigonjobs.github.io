var express = require('express');
var route=express.Router();
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var Info=require('./model/info');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/database';

app.get('/',function(req,res,next){
  console.log(req.url);
  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("database");
      var resultArray=[];
      dbo.collection("applicant_info").find().limit(1).sort({$natural:-1}).toArray(function(err,result){
        if (err) throw err;
        resultArray.push(result);
        db.close();
        console.log(resultArray);
        res.render('profile',{items : resultArray[0]});
      });

    });

});


app.route('/edit')
  .get(function(req, res, next) {
    res.render('edit');
});

app.post('/insert', function(req, res, next) {
  console.log(req.body);
  var item = {
    familyname: req.body.familyname,
    givename: req.body.givename,
    address: req.body.address,
    email: req.body.email,
    dob: req.body.dob,
    aca: req.body.academiclv,
    gender: req.body.gender,
    phonenumber: req.body.phonenumber,
    graduate: req.body.graduate
  };

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    var db=client.db('database');
    db.collection('applicant_info').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      client.close();
    });
  });
  res.redirect('/');
});





app.listen(3000,function(){
  console.log("We are listen at port 3000");
});
