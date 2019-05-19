
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
 
var connection = mongoose.createConnection("mongodb://localhost:27017/database", { useNewUrlParser: true });
 
autoIncrement.initialize(connection);
// Company Info Schema
var company_info_schema = new mongoose.Schema({
    username: 
    {   
        type: String,
        unique: true
    },
    password: String,
    role: 
    {
        type: String,
        default: "company"
    },
    company_name: String,
    company_type: String,
    company_industry: String,
    founded_year: Number,
    set_founded_year_private: {type: String, default: 'off'},
    company_size: String,
    set_company_size_private: {type: String, default: 'off'},
    overview: String,
    headquarters_nation: String,
    headquarters_city: String,
    headquarters_state: String,
    company_email:  {   
        type: String,
        unique: true
    },
    location_address_1: [String],
    location_address_2: [String],
    location_nation: [String],
    location_city: [String],
    location_state: [String],
    social_select: [String],
    social_url: [String],
    company_website:  String,
    rate: [{
        rate:  Number,
        name:  String,
        body:  String,     
    }],
    average_rate: Number,
});

// User Info Schema
var user_info_schema = new mongoose.Schema({
    username: 
    {
        type: String,
        unique: true
    },
    password: String,
    role: 
    {
        type: String,
        default: "user"
    },
    familyname: String,
    givename: String,
    gender: String,
    dob: String,
    address: String,
    phonenumber: String,
    email: 
    {
        type: String,
        unique: true
    },
    academiclv: String,
    graduate: String,
    cart: 
    [{
        job_id: Number,
        date: String,
    }]
});

// Job Recruitment Schema
var job_recruitment_schema = new mongoose.Schema ({
    company_id: Number,
    employment_type: String,
    job_title: String,
    num_applicants: Number,
    job_location_pick: String,
    job_cv_date: String,
    job_tags: [String],
    overview: String,
    job_responsibilities: String,
    job_qualifications: String,
    applicants: [{
        id: Number,
        date: String
    }]
});

company_info_schema.plugin(autoIncrement.plugin, 'company_info');
user_info_schema.plugin(autoIncrement.plugin, 'user_info');
job_recruitment_schema.plugin(autoIncrement.plugin, 'job_recruitment');

module.exports.company_info_schema = company_info_schema;
module.exports.user_info_schema = user_info_schema;
module.exports.job_recruitment_schema = job_recruitment_schema;