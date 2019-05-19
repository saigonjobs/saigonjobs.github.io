const search = require('./searchFunction.js');
const searchID = require('./searchID.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        var searchText = req.query.searchText;
        search(searchText, req, res);
    })

    app.get('/detail/:id', function(req, res) {
        searchID(req.params.id, req, res);
    })
}