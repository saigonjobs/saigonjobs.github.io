const mongoose = require('mongoose');
var schemas = require('./schemas');
var session = require('express-session')
var express = require('express');

var app = express();

app.use(session({
    secret: "de-6623rf",
    resave: false,
    saveUninitialized: false
}));

job_recruitment = mongoose.model("job_recruitment", schemas.job_recruitment_schema);
var user_info = mongoose.model("user_info", schemas.user_info_schema);

module.exports = function search(text, req, res) {
    var personal = [req.session.reg_num, req.session.role];
    if ((text === '') || (text == undefined)) {
        res.render('index', { result: [], personal: personal });
    } else {
        var tagList = text.split(" ");
        for (var i = tagList.length; i >= 0; i--) {
            if (tagList[i] == '')
                tagList.splice(tagList.indexOf(tagList[i]), 1);
        }

        if (personal[0] !== undefined) {
            user_info.find({ _id: req.session.reg_num }).lean().exec(function (err, user) {
                if (user[0].cart.length != 0) {
                    for (var i = 0; i < user[0].cart.length; i++) {
                        personal.push(user[0].cart[i].job_id);
                    }
                }
            });
        }

        var url = "mongodb://localhost:27017/database";
        mongoose.connect(url, function (err, db) {
            if (err) throw err;
            job_recruitment.find({ job_tags: { $in: tagList } }).lean().exec(function (err, result) {
                if (err) throw err;
                res.render('index', { result: result, company: [], personal: personal, detail: false });
                //mongoose.connection.close();
            });
        });
    }
}

