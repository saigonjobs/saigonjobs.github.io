var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var mongo = require('mongodb');
var assert=require('assert');
var url="mongodb://localhost:27017/shopping";
var url1="mongodb://localhost:27017/main";

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    var Myproducts = [];
    Myproducts.push(docs.slice(0,docs.length));
    res.render('shop/index', { title: 'Express',products : Myproducts });
  });
});
router.post('/delete', function(req, res, next){
  var id = req.body.id;
  console.log(id);
  mongo.connect(url,{ useNewUrlParser: true },function(err,db){
    var dbo = db.db("shopping");
    var ObjectId = mongo.ObjectID;
    assert.equal(null,err);
    dbo.collection('products').deleteOne({"_id": ObjectId(id)},function(err,result){
      assert.equal(null,err);
      console.log("Item deleted!");
      db.close();
      console.log("Item deleted!");
      console.log("Item deleted!");
      console.log("Item deleted!");
    })
  })
  res.redirect('/');

});
router.post('/insert', function(req, res, next) {
  console.log(req.body);
  var item = {
    _path : req.body.path,
    _discription : req.body.discription,
    _title : req.body.title,
    _price : req.body.price
  };

  mongo.connect(url,{ useNewUrlParser: true },function(err,db){
    assert.equal(null, err);
    var dbo=db.db('main');
    dbo.collection('products').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });
  res.redirect('/');
});

module.exports = router;
