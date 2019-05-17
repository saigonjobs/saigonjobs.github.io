


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var ejs = require('ejs');
var crypto = require('crypto');
const session = require('express-session');
// const { check, validationResult } = require('express-validator/check');
// validator = require('validator');
var app = express();

    ////////////////////////
   //                    //
  // Setting up section //
 //                    //
////////////////////////

app.use('/static', express.static('public'));

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret: "de-6623rf",
    resave: false,
    saveUninitialized: false
}));

app.set("views",  path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true });
autoIncrement.initialize(mongoose.connection);


    ////////////////////////
   //                    //
  //  Database section  //
 //                    //
////////////////////////

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});

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
    company_website:  {   
        type: String,
        unique: true
    },
    rate: [{
        star:  Number,
        name:  String,
        body:  String,
     
    }]
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
    graduate: String
});

// Job Recruitment Schema
var job_recruitment_schema = new mongoose.Schema ({
    company_id: Number,
    employment_type: String,
    job_title: String,
    num_applicants: Number,
    job_location_pick: String,
    job_cv_date: Date,
    job_tags: [String],
    overview: String,
    job_responsibilities: String,
    job_qualifications: String
});


company_info_schema.plugin(autoIncrement.plugin, 'company_info');
job_recruitment_schema.plugin(autoIncrement.plugin, 'job_recruitment');
user_info_schema.plugin(autoIncrement.plugin, 'user_info')

// Creating models from schemas
var company_info = mongoose.model("company_info", company_info_schema);
var user_info = mongoose.model("user_info", user_info_schema);
var job_recruitment = mongoose.model("job_recruitment", job_recruitment_schema);

    ////////////////////////
   //                    //
  //  Function section  //
 //                    //
////////////////////////



// Index page.
app.get('/', function(req, res)
{
     res.render('log_in_ask.ejs');
})

// Display the sites

//  Company Edit Site
app.get('/edit-info', function(req, res)
{
    company_info.find({_id: req.session.reg_num}).lean().exec(function(err, docs)
    {    
        if (err) throw err;
        job_recruitment.find({company_id: req.session.reg_num}).lean().exec(function(error, jobs)
        {
            if (error) throw error;            
            res.render('edit_company_info.ejs', {result: docs, jobs: jobs});
        });                         
    });

})

// Accesses to sites, INCOMPLETE, NEED USER-SITE LINKS
app.get('/profile/role/:role/userID/:id', function(req, res, next)
{
    // Go to company sites
     if (req.params["role"] ===  "company")
     {
         if (req.params["id"] == req.session.reg_num && req.session.role === "company")
         {
             // If this session is the company's, go to the site that they can modify the info
            company_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
            {    
                if (err) throw err;
                job_recruitment.find({company_id: req.params["id"]}).lean().exec(function(error, jobs)
                {
                    if (error) throw error;            
                    res.render('site.ejs', {result: docs, jobs: jobs});
                });                         
            });
        } 
        else
        {
            // If not, go to the site that everybody can add comment
            company_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
            {    
                if (err) throw err;
                job_recruitment.find({company_id: req.params["id"]}).lean().exec(function(error, jobs)
                {
                    if (error) throw error;            
                    res.render('site_2.ejs', {result: docs, jobs: jobs});
                });                         
            });           
        }  
    }
    // Go to user sites. COMPLETE THE CODE
    else if (req.params["role"] === "user" )
     {
         if (req.params["id"] == req.session.reg_num && req.session.role === "user")
         {
             // Do something here
            // company_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
            // {    
            //     if (err) throw err;
                
            //     job_recruitment.find({company_id: req.params["id"]}).lean().exec(function(error, jobs)
            //     {
            //         if (error) throw error;            
            //         res.render('site.ejs', {result: docs, jobs: jobs});
            //     });                         
            // });
        } 
        else
        {
           // Do something here
            // company_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
            // {    
            //     if (err) throw err;
            //     job_recruitment.find({company_id: req.params["id"]}).lean().exec(function(error, jobs)
            //     {
            //         if (error) throw error;            
            //         res.render('site_2.ejs', {result: docs, jobs: jobs});
            //     });                         
            // });
              
        }  
    }
})

// User site after signed in. REPLACE 'sign_up_ask.ejs' WITH THE PROPER SITE
app.post('/log_user', function(req, res, next)
{
    // Password Hashing
    const cipher = crypto.createCipher('aes192', 'password'); 
    // Encrypt Here
    var encrypted = cipher.update(req.body.password, 'sha256', 'hex');  
    // Final Encrypted String
    encrypted += cipher.final('hex');  
    user_info.find({username: req.body.username, password: encrypted}).lean().exec(function(err, docs)
    {    
       if (err) throw err;
       if (docs)
       { 
           req.session.role = docs[0].role;
           req.session.id = docs[0]._id;
           req.session.name = docs[0].familyname + " " + docs[0].givename;
           res.render('sign_up_ask.ejs', {result: docs});
       }
       else
       {
           throw "Wrong username or password!";
       }                          
   });
})

// Company site after signed in.
app.post('/log_comp', function(req, res, next)
{
    // Password Hashing
    const cipher = crypto.createCipher('aes192', 'password'); 
    // Encrypt Here
    var encrypted = cipher.update(req.body.password, 'sha256', 'hex');  
    // Final Encrypted String
    encrypted += cipher.final('hex');  
    company_info.find({username: req.body.username, password: encrypted}).lean().exec(function(err, docs)
    {    
       if (err) throw err;
       if (docs)
       {            
           req.session.role = docs[0].role;
           req.session.reg_num = docs[0]._id;
           req.session.name = docs[0].company_name;
           job_recruitment.find({company_id: docs[0]._id}).lean().exec(function(error, jobs)
            {
                if (error) throw error;
                res.render('site_2.ejs', {result: docs, jobs: jobs});
            });
       }
       else
       {
           throw "Wrong username or password!";
       }                          
   });
})

// Add comment POST method.
app.post('/add-comment/companyID/:id', function(req, res)
{
    company_info.update({ _id: req.params["id"]}, { $push: { rate: req.body } });
    res.redirect('/profile/role/company/userID/' + req.params["id"]);
})

app.post('/register_user',function(req,res){
    if (req.body.password === req.body.confirm_password)
    {
        var user_inf = new user_info(req.body);

        company_info.find({}).lean().exec(function(err, infos){
            if (err) throw err;
            if (infos)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (user_inf.username === infos[i].username)
                    {
                        throw "Error: Identical username, please choose another one.";
                    }
                    if (user_inf.email === infos[i].email)
                    {
                        throw "Error: Identical email, please choose another one.";
                    }
                }
            }
        })
        
        // Password Hashing
        const cipher = crypto.createCipher('aes192', 'password'); 
        // Encrypt Here
        var encrypted = cipher.update(user_inf.password, 'sha256', 'hex');  
        // Final Encrypted String
        encrypted += cipher.final('hex');

        user_inf.password = encrypted;

        user_inf.save(function(err)
        {
            if (err) throw err;
            console.log("New User Saved.")
            res.send("Registered Successfully! ;)");
        })
    }
    else
    {
        throw "Error: Passwords do not match.";
    }
})

app.post('/register_company',function(req,res){
    if (req.body.password === req.body.confirm_password)
    {
        var company_inf = new company_info(req.body);
        
        user_info.find({}).lean().exec(function(err, infos)
        {
            if (err) throw err;
            if (infos)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (company_inf.username === infos[i].username)
                    {
                        throw "Error: Identical username, please choose another one.";
                    }
                    if (company_inf.email === infos[i].email)
                    {
                        throw  "Error: Identical email, please choose another one.";
    
                    }
                }
            }
        })
  
        // Password Hashing
        const cipher = crypto.createCipher('aes192', 'password'); 
        // Encrypt Here
        var encrypted = cipher.update(company_inf.password, 'sha256', 'hex');  
        // Final Encrypted String
        encrypted += cipher.final('hex');

        company_inf.password = encrypted;


        company_inf.save(function(err)
        {
            if (err) throw err;
            console.log("New User Saved.")
            res.send("Registered Successfully! ;)");
        })
    }
    else
    {
        throw "Error: Passwords do not match."
    }
})

// Move to register ask site (Choosing company or user)
app.get('/register', function(req, res, next){
    res.render('sign_up_ask.ejs');
})

// Register as user site
app.get('/user_reg', function(req, res, next){
    res.render('register_user.ejs');
})

// Register as company site
app.get('/company_reg', function(req, res, next){
    res.render('register_company.ejs');
})

// Logout session
app.get('/logout', function(req, res, next)
{
    req.session.destroy();
    res.render('./log_in_ask.ejs');
})

// Login as user
app.get('/user_log', function(req, res, next){
    res.render('login_user.ejs');
})

// Login as company
app.get('/company_log', function(req, res, next){
    res.render('login_comp.ejs');
})


// Form handler
app.post('/add/userID/:id',function(req,res){
    console.log(req.body);

    // Validation & Hanlder
    if (req.body.save === 'Save Company Information')
    {
        var err = 0;
        // Location Validating
        if(req.body.location_address_1.length > 1)
        {
            for (var i = 0; i < req.body.location_address_1.length - 1; i++) {

                    for (var j = i + 1 ; j < req.body.location_address_1.length; j++)
                    {
                        if (req.body.location_address_1[i].toUpperCase() === req.body.location_address_1[j].toUpperCase()
                            && req.body.location_address_2[i].toUpperCase() === req.body.location_address_2[j].toUpperCase()
                            && req.body.location_nation[i].toUpperCase() === req.body.location_nation[j].toUpperCase()
                            && req.body.location_city[i].toUpperCase() === req.body.location_city[j].toUpperCase()
                            && req.body.location_state[i].toUpperCase() === req.body.location_city[j].toUpperCase())
                            {                                                      
                                err += 1;
                                break;
                            } 
                            
                    }
                    if (err == 1) break;
                }
            }

        
        // Social Validating
        if (req.body.social_url.length > 1)
        {           
                for (var i = 0; i < req.body.social_url.length - 1; i++)
                {
                    for (var j = i + 1; j < req.body.social_url.length; j++)
                    {
                        if (req.body.social_url[i] === req.body.social_url[j]){
                                err += 2;
                                break;
                            }
                    }
                    if (err == 2 || err == 3) break;
                }
            }

         
        // Exception Handler
        switch (err)
        {
            case 1:
                throw "Error: Identical Location!";
            case 2:
                throw "Error: Identical Social Link!";
            case 3:
                throw "Error: Identical Location & Social Link!";
        }

        var comp_info = new company_info(req.body);
     

        company_info.findOneAndUpdate({_id: req.params["id"]}, {
            company_name: comp_info.company_name,
            company_type: comp_info.company_type,
            company_industry: comp_info.company_industry,
            founded_year: comp_info.founded_year,
            set_founded_year_private: comp_info.set_founded_year_private,
            company_size: comp_info.company_size,
            set_company_size_private: comp_info.set_company_size_private,
            overview: comp_info.overview,
            headquarters_nation: comp_info.headquarters_nation,
            headquarters_city: comp_info.headquarters_city,
            headquarters_state: comp_info.headquarters_state,
            company_email: comp_info.company_email,
            location_address_1: comp_info.location_address_1,
            location_address_2: comp_info.location_address_2,
            location_nation: comp_info.location_nation,
            location_city: comp_info.location_city,
            location_state: comp_info.location_state,
            social_select: comp_info.social_select,
            social_url: comp_info.social_url,
            company_website: comp_info.company_website
        }, {upsert:true}, function(error) {            
            if (error) throw (error);
            console.log("Your info has been saved!");
        });
    
    }
    else if (req.body.save === 'Save Recruitment Form')
    {
        var err = 0;

        // Job Function Validating
        if (req.body.job_tags.length > 1)
        {           
            for (var i = 0; i < req.body.job_tags.length - 1; i++)
            {
                for (var j = i + 1; j < req.body.job_tags.length; j++)
                {
                    if (req.body.job_tags[i] === req.body.job_tags[j]) 
                        throw "Error: Identical Tags!";
                }
            }
        }


      
        var recruitment = new job_recruitment(req.body);
        recruitment.company_id = req.params["id"];

        recruitment.save(function(err){
            if (err) throw (err);
            console.log("Your recruitment has been saved.");            
        })
    }    

    res.send("Your changes have been saved.")
});

    ////////////////////////
   //                    //
  //   Listen section   //
 //                    //
////////////////////////

app.listen(3000);
console.log("Server is running at port 3000");


