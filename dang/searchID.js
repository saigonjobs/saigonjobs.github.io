const MongoClient = require('mongodb').MongoClient;

module.exports = function searchID(id, res) {
    console.log("ID", id);
    if ((id === '') || (id == undefined)) {
        res.render('index', {result: []});
    } else {
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("jobInfo");
            dbo.collection("jobInfo").find({"id": id}).toArray(function(err, result) {
                if (err) throw err;
                res.render('index',{result: result, detail: true});
                db.close();
                console.log("IDDDDDDDDD")
            });
        });
    }
}
