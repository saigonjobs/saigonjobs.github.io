const search = require('./searchFunction.js');

module.exports = function(app) {
    app.route('/data').get(function(req, res) {
        var text = req.query.text;
        var data = search(text, res);
        //res.send(data)
    })
}