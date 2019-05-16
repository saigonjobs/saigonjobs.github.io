const express = require('express');
const bodyParser = require('body-parser');
const searchRouter = require('./searchRoute');


const app = express();
const port = 3000;

const urlencodeParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodeParser);
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.static(__dirname + '/public'));

searchRouter(app);

app.listen(port);

result = [{  "id": "122", 
                        "title": "AAAAAA Senior", 
                        "benefit": ["a","b","c"],
                        "address": "HO Chi Minh",
                        "tag": ["Python","Javascript","C#"]},
                        {  "id": "122", 
                        "title": "AAAAAA Senior", 
                        "benefit": ["a","b","c"],
                        "address": "HO Chi Minh",
                        "tag": ["Python","Javascript","C#"]}
                    ]