const MongoClient = require('mongodb').MongoClient;

module.exports = function search(text, res) {
    if ((text === '') || (text == undefined)) {
        res.render('index', {result: []});
    } else {
        var tagList = text.split(" ");
        for (var i = tagList.length; i >= 0; i--) {
            if (tagList[i] == '')
                tagList.splice(tagList.indexOf(tagList[i]), 1);
        }

        var queryList = [];
        for (var i = 0; i < tagList.length; i++){
        	queryList.push({"tag": tagList[i]});
        }

        var query = { $or: queryList };
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("jobInfo");
            dbo.collection("jobInfo").find(query).toArray(function(err, result) {
                if (err) throw err;
                res.render('index',{result: result, detail: false});
                db.close();
            });
        });
    }
}

