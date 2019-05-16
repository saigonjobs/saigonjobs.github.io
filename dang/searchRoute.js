const search = require('./searchFunction.js');

module.exports = function(app) {
    app.route('/').get(function(req, res) {
        // var text = req.query.text;
        // var data = search(text, res);
        // //res.send(data)
        console.log("Route");
        var searchText = req.query.searchText;
        search(searchText, res);
    })
}