


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');
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

    ////////////////////////
   //                    //
  //  Function section  //
 //                    //
////////////////////////


// Display the site
app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname, 'company-edit-info.html'));

})

// Form handler
app.post('/company-index.html',function(req,res){
    console.log(req.body);

    // Validation & Hanlder
    if (req.body.save === 'Save Company Information')
    {
        var err = 0;
        // Location Validating
        if(req.body.location_address_1)
        {
            if (req.body.location_address_1.length != 0)
            {
                for (var i = 0; i < req.body.location_address_1.length - 1; i++)                {

                    for (var j = i; j < req.body.location_address_1.length; j++)
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
        }
        
        // Social Validating
        if (req.body.social_url)
        {
            if (req.body.social_url.length != 0)
            {
                for (var i = 0; i < req.body.social_url.length - 1; i++)
                {
                    for (var j = i; j < req.body.social_url.length; j++)
                    {
                        if (req.body.social_url[i] === req.body.social_url[j]){
                                err += 2;
                                break;
                            }
                    }
                    if (err == 2 || err == 3) break;
                }
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
    
    }
    else if (req.body.save === 'Save Recruitment Form')
    {
        var err = 0;

        // Job Industry Validating
        if (req.body.job_industry)
        {
            if (req.body.job_industry.length != 0)
            {
                for (var i = 0; i < req.body.job_industry.length - 1; i++)
                {
                    for (var j = i; j < req.body.job_industry.length; j++)
                    {
                        if (req.body.job_industry[i] === req.body.job_industry[j]) 
                            err += 1;
                            break;
                    }
                    if (err == 1) break;
                }
            }
        }        

        // Job Function Validating
        if (req.body.job_function)
        {
            if (req.body.job_function.length != 0)
            {
                for (var i = 0; i < req.body.job_function.length - 1; i++)
                {
                    for (var j = i; j < req.body.job_function.length; j++)
                    {
                        if (req.body.job_function[i] === req.body.job_function[j]) 
                            err += 2;
                            break;
                    }
                    if (err == 2 || err == 3) break;
                }
            }
        }

        switch (err)
        {
            case 1:
                throw "Error: Identical Industry Tag!";
            case 2:
                throw "Error: Identical Function Tag!";
            case 3:
                throw "Error: Identical Industry & Function Tag!";
        }
    }
    
    
});

    ////////////////////////
   //                    //
  //   Listen section   //
 //                    //
////////////////////////

app.listen(3000);
console.log("Server is running at port 3000");
