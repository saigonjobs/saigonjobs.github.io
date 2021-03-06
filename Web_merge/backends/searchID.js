const mongoose = require('mongoose');
var schemas = require('./schemas');
var session = require('express-session');
var express = require('express');

var app = express();

app.use(session({
    secret: "de-6623rf",
    resave: false,
    saveUninitialized: false
}));

job_recruitment = mongoose.model("job_recruitment", schemas.job_recruitment_schema);
company_info = mongoose.model("company_info", schemas.company_info_schema);
var user_info = mongoose.model("user_info", schemas.user_info_schema);

module.exports = function searchID(id, req, res) {
    var personal = [req.session.reg_num, req.session.role];
    if ((id === '') || (id == undefined)) {
        res.render('index', { result: [], personal: personal });
    } else {
        var url = "mongodb://localhost:27017/database";
        mongoose.connect(url, function (err, db) {
            if (err) throw err;
            if (personal[1] === "user") {
                user_info.find({ _id: req.session.reg_num }).lean().exec(function (err, user) {
                    if (user[0].cart.length != 0) {
                        for (var i = 0; i < user[0].cart.length; i++) {
                            personal.push(user[0].cart[i].job_id);
                        }
                    }
                });
            }
            job_recruitment.find({ _id: id }).lean().exec(function (err, result) {
                if (err) throw err;
                company_info.find({ _id: result[0].company_id }).lean().exec(function (err, docs) {
                    res.render('index', { result: result, company: docs, personal: personal, detail: true });
                    //mongoose.connection.close();
                });
            });
        });
    }
}
