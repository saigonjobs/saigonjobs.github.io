var Product = require('../models/product');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true });
var products = [
    new Product({
        path: "http://oneterrace.vn/wp-content/uploads/2018/01/image1-2.jpg",
        discription : "Minion",
        title : "My Minion1",
        price : "1000$"
    }),
    new Product({
        path: "http://oneterrace.vn/wp-content/uploads/2018/01/image1-2.jpg",
        discription : "Minion",
        title : "My Minion2",
        price : "2000$"
    }),
    new Product({
        path: "http://oneterrace.vn/wp-content/uploads/2018/01/image1-2.jpg",
        discription : "Minion",
        title : "My Minion3",
        price : "3000$"
    }),
    new Product({
        path: "http://oneterrace.vn/wp-content/uploads/2018/01/image1-2.jpg",
        discription : "Minion4",
        title : "My Minion",
        price : "4000$"
    }),
]
var done = 0
for( var i = 0; i<products.length;i++){
    products[i].save(function(err,result){
        done ++;
        if(done ===  products.length){
            exit();
        }
        if (err) return console.error(err);
        console.log(" saved to bookstore collection.");
    });
};
function exit(){
    mongoose.disconnect();
}