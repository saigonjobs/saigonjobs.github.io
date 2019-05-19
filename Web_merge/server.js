// Package requires
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var crypto = require('crypto');
const session = require('express-session');

// Module requires
var schemas = require("./backends/schemas");
const searchRouter = require('./backends/searchRoute');

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

app.set('view engine', 'ejs');
app.set('views', './views')

searchRouter(app);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true });


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


// Creating models from schemas
var company_info = mongoose.model("company_info", schemas.company_info_schema);
var user_info = mongoose.model("user_info", schemas.user_info_schema);
var job_recruitment = mongoose.model("job_recruitment", schemas.job_recruitment_schema);

    ////////////////////////
   //                    //
  //  Function section  //
 //                    //
////////////////////////


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
       if (docs.length != 0)
       { 
           req.session.role = docs[0].role;
           req.session.reg_num = docs[0]._id;
           req.session.logged = 'true';
           res.redirect('/profile/role/user/userID/' + docs[0]._id);
       }
       else
       {
           res.render('login_user.ejs', {message: "Wrong username or password!"});
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
       if (docs.length != 0)
       {            
           req.session.role = docs[0].role;
           req.session.reg_num = docs[0]._id;
           req.session.name = 'true';           
           res.redirect("/profile/role/company/userID/" + docs[0]._id);
       }
       else
       {
           res.render('login_comp.ejs', {message: "Wrong username or password!"});
       }                          
   });
})

// Add comment POST method.
app.post('/add-comment/companyID/:id', function(req, res)
{
    company_info.update({ _id: req.params["id"]}, { $push: { rate: req.body } }, function(err)
    {
        if (err) throw err;        
    });    
    var avg_rate = 0;
    company_info.find({_id: req.params["id"]}).lean().exec(function(err, docs){
        if (err) throw err;
         
        if (docs[0].rate !== undefined)
        {            
            if (docs[0].rate.length == 1)
            {
                avg_rate = docs[0].rate[0].rate;
            }
            else
            {
                avg_rate = (docs[0].average_rate * (docs[0].rate.length - 1) + docs[0].rate[docs[0].rate.length - 1].rate) / docs[0].rate.length;
            }
            avg_rate = +(Math.round(avg_rate + "e+2")  + "e-2");
            company_info.findOneAndUpdate({_id: req.params["id"]}, {average_rate: avg_rate}, {upsert: true}, function(err)
            {                
                if (err) throw err;
            });
        }                
    });
    
    res.redirect('/profile/role/company/userID/' + req.params["id"]);    
});


app.post('/register_user',function(req,res){
    var username_error = false;
    var email_error = false;
    if (req.body.password === req.body.confirm_password)
    {
        var user_inf = new user_info(req.body);
        
        company_info.find({}).lean().exec(function(err, infos)
        {
            if (err) throw err;
            if (infos !== undefined)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (user_inf.username === infos[i].username)
                    {
                        username_error = true;
                    }
                    if (user_inf.email === infos[i].company_email)
                    {
                        email_error = true;    
                    }
                }
            }
        })
        user_info.find({}).lean().exec(function(err, infos)
        {
            if (err) throw err;
            if (infos !== undefined)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (user_inf.username === infos[i].username)
                    {
                        username_error = true;
                    }
                    if (user_inf.email === infos[i].email)
                    {
                        email_error = true;    
                    }
                }
            }
        })
        if(username_error)
        {
            res.redirect('/attempt/fail/iden_username');
        }
        else if (email_error)
        {
            res.redirect('/attempt/fail/iden_email');
        }
        else
        {
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
                res.send("Registered Successfully! ;). Use localhost:3000/login to go to the login page.");            
            })
        }
    }
    else
    {
        res.redirect('/attempt/fail/password');
    }
});


app.post('/register_company',function(req,res){
    var username_error = false;
    var email_error = false;
    var error = false;
    if (req.body.password === req.body.confirm_password)
    {
        var company_inf = new company_info(req.body);
        
        company_info.find({}).lean().exect(function(err, infos)
        {
            if (err) throw err;
            if (infos !== undefined)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (company_inf.username === infos[i].username)
                    {
                        username_error = true;
                    }
                    if (company_inf.email === infos[i].company_email)
                    {
                        email_error = true;    
                    }
                }
            }
        })
        user_info.find({}).lean().exec(function(err, infos)
        {
            if (err) throw err;
            if (infos !== undefined)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (company_inf.username === infos[i].username)
                    {
                        username_error = true;
                    }
                    if (company_inf.email === infos[i].email)
                    {
                        email_error = true;    
                    }
                }
            }
        })
        
        if (req.body.location_address_1 !== undefined)
            if (typeof req.body.location_address_1 !== 'string')
        {
            for (var i = 0; i < req.body.location_address_1.length - 1; i++)
            {
                for (var j = i + 1; j < req.body.location_address_1.length; j++)
                {
                    if (req.body.location_address_1[i] === req.body.location_address_1[j]
                        && req.body.location_address_2[i] ===req.body.location_address_2[j]
                        && req.body.location_city[i] === req.body.location_city[j]
                        && req.body.location_state[i] === req.body.location_state[j]
                        && req.body.location_nation[i] === req.body.location_nation[j])
                        error = true;
                }
            }
            }

        if (req.body.social_url !== undefined)
            if (typeof req.body.social_url !== 'string')
        {
            for (var i = 0; i < req.body.social_url.length - 1; i++)
            {
                for (var j = i + 1; j < req.body.social_url.length; j++)
                {
                    if (req.body.social_url[i] === req.body.social_url[j])
                        error = true;
                }
            }
            }

        
        if(username_error)
        {
            res.redirect('/attempt/fail/iden_username');
        }
        else if (error)
        {
            res.redirect('/attempt/fail/iden_fields');
        }
        else if (email_error)
        {
            res.redirect('/attempt/fail/iden_email');
        }
        else
        {
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
                res.send("Registered Successfully! ;). Use localhost:3000/login to go to the login page.");
            })
        }        
    }
    else
    {
        res.redirect('/attempt/fail/password');
    }
});


app.post('/edit_user_profile_submit/id/:id', function(req, res){  
    var user_profile = new user_info(req.body);
    var email_error = false;

    company_info.find({}).lean().exect(function(err, infos)
        {
            if (err) throw err;
            if (infos !== undefined)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (user_profile.email === infos[i].company_email)
                    {
                        email_error = true;    
                    }
                }
            }
    });
    user_info.find({}).lean().exec(function(err, infos)
        {
            if (err) throw err;
            if (infos !== undefined)
            {
                for (var i = 0; i < infos.length; i++)
                {
                    if (req.params["id"] == infos[i]._id) continue;
                    if (user_profile.email === infos[i].email)
                    {
                        email_error = true;    
                    }
                }
            }
    });

    if (email_error)
    {
        res.redirect('/attempt/fail/iden_email');
    }
    else
    {
        user_info.findOneAndUpdate({_id: req.params["id"]}, 
        {
            familyname: user_profile.familyname,
            givename: user_profile.givename,
            gender: user_profile.gender,
            dob: user_profile.dob,
            address: user_profile.address,
            phonenumber: user_profile.phonenumber,
            email: user_profile.email,
            academiclv: user_profile.academiclv,
            graduate: user_profile.graduate
        }, function(err){
            if (err) throw err;
        });
        res.redirect("/profile/role/user/userID/" + req.params["id"]);
    }
});


app.post('/edit_company_profile/userID/:id',function(req,res){
    console.log(req.body);
    var error = false;
    var email_error = false;

    // Validation & Hanlder
    if (req.body.save === 'Save Company Information')
    {
        var comp_info = new company_info(req.body);
        if (req.body.location_address_1 !== undefined)
        if (typeof req.body.location_address_1 !== 'string')
        {
            for (var i = 0; i < req.body.location_address_1.length - 1; i++)
            {
                for (var j = i + 1; j < req.body.location_address_1.length; j++)
                {
                    if (req.body.location_address_1[i] === req.body.location_address_1[j]
                        && req.body.location_address_2[i] ===req.body.location_address_2[j]
                        && req.body.location_city[i] === req.body.location_city[j]
                        && req.body.location_state[i] === req.body.location_state[j]
                        && req.body.location_nation[i] === req.body.location_nation[j])
                        error = true;
                }
            }
        }

        if (req.body.social_url !== undefined)
        if (typeof req.body.social_url !== 'string')
        {
            for (var i = 0; i < req.body.social_url.length - 1; i++)
            {
                for (var j = i + 1; j < req.body.social_url.length; j++)
                {
                    if (req.body.social_url[i] === req.body.social_url[j])
                        error = true;
                }
            }
        }

        company_info.find({}).lean().exec(function(err, docs)
        {
            if (err) throw err;
            for (var i = 0; i < docs.length; i++)
            {
                if (docs[i]._id == req.session.reg_num) continue;
                if (req.body.company_email === docs[i].company_email)
                {
                    email_error = true;
                    break;
                }
            }
        })
        user_info.find({}).lean().exec(function(err, docs)
        {
            if (err) throw err;
            for (var i = 0; i < docs.length; i++)
            {                
                if (req.body.company_email === docs[i].email)
                {
                    email_error = true;
                    break;
                }
            }
        })

        if (!error)
        {
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
        else if (error)
        {
            res.redirect('/attempt/fail/iden_fields');
        }
        else if (email_error)
        {
            res.redirect('/attempt/fail/iden_email');
        }
    
    }
    else if (req.body.save === 'Save Recruitment Form')
    {
        // Job Function Validating
        if (req.body.job_tags.length > 1)
        {           
            for (var i = 0; i < req.body.job_tags.length - 1; i++)
            {
                for (var j = i + 1; j < req.body.job_tags.length; j++)
                {
                    if (req.body.job_tags[i] === req.body.job_tags[j]) 
                    {
                        res.redirect('/attempt/fail/iden_tags');
                        error = true;
                    }                        
                }
            }
        }

        if (!error)
        {
            var recruitment = new job_recruitment(req.body);
            recruitment.company_id = req.params["id"];
    
            recruitment.save(function(err){
                if (err) throw (err);
                console.log("Your recruitment has been saved.");            
            });
        }       
    }    
    if (!error && !email_error)
    {
        res.redirect("/profile/role/company/userID/" + req.params["id"]);
    }   
});

app.post('/add_job=:job_id', function(req, res){
    var date = new Date();
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    user_info.update({_id: req.session.reg_num}, { $push: { cart: {job_id: req.params["job_id"], date: date } }}, (err, result) => {
        if (err) {
            return console.log(err);
        }
    });
    job_recruitment.update({_id: req.params["job_id"]}, { $push: { applicants: {id: req.session.reg_num, date: date } }}, (err, result) => {
        if (err) {
          return console.log(err);
        }
    });

    res.sendStatus(201);
  });


// Index page.
// app.get('/' at searchRoute).

app.get('/login', function(req, res, next){
    if (req.session.reg_num !== undefined){
        var link = "/profile/role/" + req.session.role + "/userID/" + req.session.reg_num;
        res.redirect(link);
    }
    else
    {
        res.render('log_in_ask.ejs');
    }
});

// Display the sites
// Accesses to sites
app.get('/profile/role/:role/userID/:id', function(req, res, next)
{
    // Go to company sites
     if (req.params["role"] ===  "company")
     {
        // If this session is the company's, go to the site that they can modify the info
        company_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
        {    
            if (err) throw err;
            if (docs.length != 0)
            {
                job_recruitment.find({company_id: req.params["id"]}).lean().exec(function(error, jobs)
                {
                    if (error) throw error; 
                    if (req.session.role !== undefined)
                    {
                        if (req.session.role === "user")
                        {
                            user_info.find({_id: req.session.reg_num}).lean().exec(function(err, user)
                            {
                                if (user[0].cart.length != 0)
                                {
                                    var arr = [req.session.reg_num, req.session.role];
                                    for (var i = 0; i < user[0].cart.length; i++)
                                    {
                                        arr.push(user[0].cart[i].job_id);
                                    }
                                    res.render('company', {result: docs, jobs: jobs, personal: arr});
                                }
                            });
                        }                       
                        else 
                            res.render('company', {result: docs, jobs: jobs, personal: [req.session.reg_num, req.session.role]});
                    }
                    else      
                        res.render('company', {result: docs, jobs: jobs, personal: [req.session.reg_num, req.session.role]});
                });
            }
            else
            {
                res.redirect('/attempt/fail/no_site');
            }                       
        });
    }
    // Go to user sites. 
    else if (req.params["role"] === "user" )
     {        
        user_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
        {    
            if (err) throw err;
            if (docs.length != 0)
            {
                res.render('user_profile', {result: docs, personal: [req.session.reg_num, req.session.role]});
            }
            else 
            {
                res.redirect('/attempt/fail/no_site');
            }            
        });       
    }
})

// Move to register ask site (Choosing company or user)
app.get('/register', function(req, res, next){
    if (req.session.reg_num !== undefined)
    {
        var link = "/profile/role/" + req.session.role + "/userID/" + req.session.reg_num;
        res.redirect(link);
    }
    else
    {
        res.render('sign_up_ask.ejs');
    }
    
})

// Register as user site
app.get('/user_reg', function(req, res, next){
    if (req.session.reg_num !== undefined)
    {
        var link = "/profile/role/" + req.session.role + "/userID/" + req.session.reg_num;
        res.redirect(link);
    }
    else
    {
        res.render('register_user.ejs');
    }
})

// Register as company site
app.get('/company_reg', function(req, res, next){
    if (req.session.reg_num !== undefined)
    {
        var link = "/profile/role/" + req.session.role + "/userID/" + req.session.reg_num;
        res.redirect(link);
    }
    else
    {
    res.render('register_company.ejs');
    }
})

// Logout session
app.get('/logout', function(req, res, next)
{
    req.session.destroy();
    res.redirect('/login');
})

// Login as user
app.get('/user_log', function(req, res, next){
    if (req.session.reg_num !== undefined)
    {
        var link = "/profile/role/" + req.session.role + "/userID/" + req.session.reg_num;
        res.redirect(link);
    }
    else
    {
        res.render('login_user.ejs', {message: undefined});
    }
})

// Login as company
app.get('/company_log', function(req, res, next){
    if (req.session.reg_num !== undefined)
    {
        var link = "/profile/role/" + req.session.role + "/userID/" + req.session.reg_num;
        res.redirect(link);
    }
    else
    {
        res.render('login_comp.ejs', {message: undefined});
    }
})

// Edit user profile request
app.get('/edit_user_profile/id/:id', function(req, res){ 
    if (req.session.reg_num !== req.params["id"] || req.session.role !== "user")
    {
        res.redirect('/attempt/fail/access_denied');
    }
    else
    {
        user_info.find({_id: req.params["id"]}).lean().exec(function(err, docs)
        {
            if (err) throw err;
            res.render('user_edit', {result: docs});
        });
    } 
});

// Edit company profile request
app.get('/edit-info/id=:id', function(req, res)
{
    if (req.session.reg_num != req.params["id"] || req.session.role !== "company")
    {
        res.redirect('/attempt/fail/access_denied');
    }
    else
    {
        company_info.find({_id: req.session.reg_num}).lean().exec(function(err, docs)
        {    
            if (err) throw err;
            job_recruitment.find({company_id: req.session.reg_num}).lean().exec(function(error, jobs)
            {
                if (error) throw error;
                console.log(docs[0]._id);
                res.render('edit_company_info.ejs', {result: docs, jobs: jobs});
            });                         
        });
    }
});
// Submit New User Profile Form

app.get('/attempt/fail/:message', function(req, res){
    var personal = [req.session.reg_num, req.session.role];
    res.render('error_handle', {personal: personal, message: req.params["message"]});
}); 

/// ATTEMPT TO ACCESS WRONG PAGES HANDLER ///
app.get('/*', function(req,res)
{
    res.redirect('/attempt/fail/no_site');
})

// Form handler


    ////////////////////////
   //                    //
  //   Listen section   //
 //                    //
////////////////////////

app.listen(3000);
console.log("Server is running at port 3000");


