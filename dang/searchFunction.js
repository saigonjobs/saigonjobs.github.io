const dataSend = [{
    "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    "title": "NULLLLLLLLLL",
    "description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
    "director": "Hayao Miyazaki",
    "producer": "Isao Takahata",
    "release_date": "1986",
    "rt_score": "95",
    "people": [
        "https://ghibliapi.herokuapp.com/people/"
    ],
    "species": [
        "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
    ],
    "locations": [
        "https://ghibliapi.herokuapp.com/locations/"
    ],
    "vehicles": [
        "https://ghibliapi.herokuapp.com/vehicles/"
    ],
    "url": "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
}]

const dataSend2 = [{
    "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    "title": "AAAAAAAAAAAAAAAAAAAAAS",
    "description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
    "director": "Hayao Miyazaki",
    "producer": "Isao Takahata",
    "release_date": "1986",
    "rt_score": "95",
    "people": [
        "https://ghibliapi.herokuapp.com/people/"
    ],
    "species": [
        "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
    ],
    "locations": [
        "https://ghibliapi.herokuapp.com/locations/"
    ],
    "vehicles": [
        "https://ghibliapi.herokuapp.com/vehicles/"
    ],
    "url": "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
}]

const MongoClient = require('mongodb').MongoClient;


module.exports = function search(text, res) {
    if (text === '') {
        res.send([]);
    } else {
    	var query = {release_date: text};
    	var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("jobInfo");
            dbo.collection("jobInfo").find(query).toArray(function(err, result) {
                if (err) throw err;
                res.send(result)
                db.close();
            });
        });
    }
}