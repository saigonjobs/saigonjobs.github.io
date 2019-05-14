const express = require('express');
const bodyParser = require('body-parser');
const searchRouter = require('./searchRoute')

const app = express();
const port = 3000;

const urlencodeParser = bodyParser.urlencoded({ extended: true })
app.use(urlencodeParser);
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("<h1>aaaaaaaaaaaaaaaaa</h1>");
})

searchRouter(app);

app.listen(port);