// // Add New Location
// var location_num = 0;
// var location_array = [];
// function add_location()
// {
    
//     location_array[location_num] = "location_" + (location_num + 1);
    
//     var main_section = document.getElementById("location_section");
//     var d = document.getElementById("location");
//     var adding = document.createElement("div");

//     adding.id = location_array[location_num];

//     adding.innerHTML += "<hr class='short'> <h5> Location </h5>";

//     adding.innerHTML += d.innerHTML;

//     var remove_btn = "<input style='display: block; margin-left: auto; margin-right: auto;' type='button' id='remove_location_" + (location_num + 1) + "' class='btn btn-danger' onclick='remove_location(location_" + (location_num + 1) +".id)' value='Remove Location'>"

//     main_section.appendChild(adding);
//     main_section.innerHTML += remove_btn;

//     location_num++;
// }

// // Remove Location
// function remove_location(button_ID)
// {
//     //location_num--;
//     var location_remove = document.getElementById(button_ID);
//     var button_remove = document.getElementById("remove_" + button_ID);


//     for (var i = 0; i < location_num; i++)
//     {
//         if (location_array[i] == button_ID)
//         {
//             for (var j = i; j < location_num; j++)
//             {
//                 var location_pos = document.getElementById("location_" + (j + 1));
//                 location_pos.id = "location_" + j;
            
//                 var remove_button_pos = document.getElementById("remove_" + location_array[j]);
//                 remove_button_pos.id = "remove_location_" + j;
//                 remove_button_pos.setAttribute("onclick", "remove_location(" + location_pos.id + ".id)");

//                 location_array[j - 1] = location_array[j];
//             }
//             break;
//         }
//     }

//     location_remove.parentNode.removeChild(location_remove);
//     button_remove.parentNode.removeChild(button_remove);
//     location_num--;
// }

// // Add New Social
// var social_num = 0;
// var social_array = [];
// function add_social()
// {
//     social_array[social_num] = "social_" + (social_num + 1);
    
//     var main_section = document.getElementById("social_section");
//     var d = document.getElementById("social_link");
//     var adding = document.createElement("div");

//     adding.id = social_array[social_num];

//     adding.innerHTML += "<hr class='short'>";

//     adding.innerHTML += d.innerHTML;

//     var remove_btn = "<input style='display: block; margin-left: auto; margin-right: auto;' type='button' id='remove_social_" + (social_num + 1) + "' class='btn btn-danger' onclick='remove_social(social_" + (social_num + 1) +".id)' value='Remove Social Contact'>"

//     main_section.appendChild(adding);
//     main_section.innerHTML += remove_btn;

//     social_num++;
// }

// // Remove Social
// function remove_social(button_ID)
// {
//     var social_remove = document.getElementById(button_ID);
//     var button_remove = document.getElementById("remove_" + button_ID);


//     for (var i = 0; i < social_num; i++)
//     {
//         if (social_array[i] == button_ID)
//         {
//             for (var j = i; j < social_num; j++)
//             {
//                 var social_pos = document.getElementById("social_" + (j + 1));
//                 social_pos.id = "social_" + j;
            
//                 var remove_button_pos = document.getElementById("remove_" + social_array[j]);
//                 remove_button_pos.id = "remove_social_" + j;
//                 remove_button_pos.setAttribute("onclick", "remove_social(" + social_pos.id + ".id)");

//                 social_array[j - 1] = social_array[j];
//             }
//             break;
//         }
//     }

//     social_remove.parentNode.removeChild(social_remove);
//     button_remove.parentNode.removeChild(button_remove);
//     social_num--;
// }

// // Add New Industry
// var industry_num = 0;
// var industry_array = [];
// function add_industry()
// {
//     industry_array[industry_num] = "industry_" + (industry_num + 1);
    
//     var main_section = document.getElementById("job_industry_section");
//     var d = document.getElementById("job_industry_tag");
//     var adding = document.createElement("div");

//     adding.id = industry_array[industry_num];

//     adding.innerHTML += "<hr class='short'>";

//     adding.innerHTML += d.innerHTML;

//     var remove_btn = "<input style='display: block; margin-left: auto; margin-right: auto;' type='button' id='remove_industry_" + (industry_num + 1) + "' class='btn btn-danger' onclick='remove_industry(industry_" + (industry_num + 1) +".id)' value='Remove Job Industry'>"

//     main_section.appendChild(adding);
//     main_section.innerHTML += remove_btn;

//     industry_num++;
// }

// // Remove Industry
// function remove_industry(button_ID)
// {
//     var industry_remove = document.getElementById(button_ID);
//     var button_remove = document.getElementById("remove_" + button_ID);


//     for (var i = 0; i <industry_num; i++)
//     {
//         if (industry_array[i] == button_ID)
//         {
//             for (var j = i; j < industry_num; j++)
//             {
//                 var industry_pos = document.getElementById("industry_" + (j + 1));
//                 industry_pos.id = "industry_" + j;
            
//                 var remove_button_pos = document.getElementById("remove_" + industry_array[j]);
//                 remove_button_pos.id = "remove_industry_" + j;
//                 remove_button_pos.setAttribute("onclick", "remove_industry(" + industry_pos.id + ".id)");

//                 industry_array[j - 1] = industry_array[j];
//             }
//             break;
//         }
//     }

//     industry_remove.parentNode.removeChild(industry_remove);
//     button_remove.parentNode.removeChild(button_remove);
//     industry_num--;
// }

// // Add New Function
// var function_num = 0;
// var function_array = [];
// function add_function()
// {
//     function_array[function_num] = "function_" + (function_num + 1);
    
//     var main_section = document.getElementById("job_function_section");
//     var d = document.getElementById("job_function_tag");
//     var adding = document.createElement("div");

//     adding.id = function_array[function_num];

//     adding.innerHTML += "<hr class='short'>";

//     adding.innerHTML += d.innerHTML;

//     var remove_btn = "<input style='display: block; margin-left: auto; margin-right: auto;' type='button' id='remove_function_" + (function_num + 1) + "' class='btn btn-danger' onclick='remove_function(function_" + (function_num + 1) +".id)' value='Remove Job Function'>"

//     main_section.appendChild(adding);
//     main_section.innerHTML += remove_btn;

//     function_num++;
// }

// // Remove function
// function remove_function(button_ID)
// {
//     var function_remove = document.getElementById(button_ID);
//     var button_remove = document.getElementById("remove_" + button_ID);


//     for (var i = 0; i <function_num; i++)
//     {
//         if (function_array[i] == button_ID)
//         {
//             for (var j = i; j < function_num; j++)
//             {
//                 var function_pos = document.getElementById("function_" + (j + 1));
//                 function_pos.id = "function_" + j;
            
//                 var remove_button_pos = document.getElementById("remove_" + function_array[j]);
//                 remove_button_pos.id = "remove_function_" + j;
//                 remove_button_pos.setAttribute("onclick", "remove_function(" + function_pos.id + ".id)");

//                 function_array[j - 1] = function_array[j];
//             }
//             break;
//         }
//     }

//     function_remove.parentNode.removeChild(function_remove);
//     button_remove.parentNode.removeChild(button_remove);
//     function_num--;
// }

$(document).ready(function() {
    // Location
    var location_wrapper = $(".location_section");
    var location_add_button = $(".add_location");
    var d_location = '<div id="location" class="box"> <div class="entry input-group"> <div class="form-group form-row"> <div class="col-md-6 mb-3"> <label for="location_address_1">Address</label> <input type="text" class="form-control" id="location_address_1" placeholder="1234 Main St" required> </div> <div class="col-md-6 mb-3"> <label for="location_address_2">Address 2</label> <input type="text" class="form-control" id="location_address_2" placeholder="Apartment, studio, or floor"></div> <div class="form-row"> <div class="form-group col-md-4"> <label for="location_nation">Nation</label> <input type="text" id="location_nation" name="location_nation" class="form-control" placeholder="Nation" required> </div> <div class="form-group col-md-4"> <label for="location_city">City / Province</label> <input type="text" id="location_city" name="location_city" class="form-control" placeholder="City / Province" required> </div> <div class="form-group col-md-4"> <label for="inputState">State / District</label> <input type="text" id="inputState" name="inputState" class="form-control" placeholder="State / District" required> </div> </div> </div> </div> <button class="location_remove btn btn-danger">Remove Location </button> <hr class="short"> </div>';
    $(location_add_button).click(function(e) {
        e.preventDefault();        
        $(location_wrapper).append(d_location); //add input boxes        
    });

    $(location_wrapper).on("click", ".location_remove", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
    });

    // Social 
    var social_wrapper =$(".social_section");
    var social_add_button =$(".add_social");
    var d_social = '<div class="social_link"><div class="form-row"><div class="col-md-3 mb-3"><select id="social_select" name="social_select" class="form-control"><option value="none">...</option><option value="social_facebook">Facebook</option><option value="social_twitter">Twitter</option> <option value="social_google">Google</option><option value="social_linkedin">LinkedIn</option><option value="social_youtube">Youtube</option> <option value="social_insta">Instagram</option><option value="social_pinterest">Pinterest</option><option value="social_snapchat">Snapchat</option><option value="social_skype">Skype</option><option value="social_dribble">Dribble</option><option value="social_vimeo">Vimeo</option> <option value="social_tumblr">Tumblr</option><option value="social_vine">Vine</option><option value="social_foursquare">Foursquare</option><option value="social_flickr">Flickr</option><option value="social_soundcloud">Soundcloud</option><option value="social_reddit">Reddit</option> <option value="social_rss">RSS</option></select></div><div class="col-md-8 mb-3"> <input type="url" id="social_url" name="social_url" class="form-control" placeholder="https://example.com/"></div></div> <button class="social_remove btn btn-danger">Remove Social Link</button> <hr class="short"> </div>';
   $(social_add_button).click(function(e) {
        e.preventDefault();        
        $(social_wrapper).append(d_social); //add input boxes        
    });

    $(social_wrapper).on("click", ".social_remove", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
    });

    // Job Industry
    var industry_wrapper =$(".job_industry_section");
    var industry_add_button =$(".add_industry");
    var d_industry = '<div id="job_industry_tag" class="form-inline"><select class="form-control" id="job_industry" name="job_industry" required><option value="none">Industry...</option><option value="accomodations">Accommodations</option><option value="accounting">Accounting</option><option value="advertising">Advertising</option><option value="aerospace">Aerospace</option><option value="agriculture">Agriculture & Agribusiness</option><option value="air_transportation">Air Transportation</option><option value="apparel_accessories">Apparel & Accessories</option><option value="_auto">Auto</option><option value="banking">Banking</option><option value="beauty_cosmetics">Beauty & Cosmetics</option><option value="bio_tech">Biotechnology </option><option value="chemical">Chemical </option><option value="communication">Communications</option><option value="computer">Computer</option><option value="construction">Construction</option><option value="consulting">Consulting</option><option value="consumer_prods">Consumer Products</option><option value="distribution">Distribution</option><option value="edu">Education</option><option value="electronics">Electronics</option><option value="employment">Employment</option><option value="energy">Energy</option><option value="entertainment">Entertainment & Recreation</option><option value="fashion">Fashion</option><option value="financial_services">Financial Services</option><option value="fine_arts">Fine Arts</option><option value="food_beverage">Food & Beverage</option><option value="green_tech">Green Technology</option><option value="health">Health </option><option value="industrial_prods">Industrial Products</option><option value="info">Information</option><option value="IT">Information Technology</option><option value="insurance">Insurance</option><option value="jounal">Journalism & News</option><option value="legal_services">Legal Services</option><option value="manufactoring">Manufacturing</option><option value="media_broadcast">Media & Broadcasting</option><option value="medical_devices_supplies">Medical Devices & Supplies</option><option value="mining">Mining</option><option value="motion_pics_video">Motion Pictures & Video</option><option value="music">Music</option><option value="pharmaceutical">Pharmaceutical </option><option value="public_admin">Public Administration</option><option value="public_relations">Public Relations</option><option value="publishing">Publishing </option><option value="rail">Rail</option><option value="real_estate">Real Estate</option><option value="retail">Retail</option><option value="service">Service</option><option value="shipping">Shipping</option><option value="sports">Sports</option><option value="steel">Steel</option><option value="tech">Technology </option><option value="telecommunication">Telecommunications</option><option value="tourism">Tourism</option><option value="transport">Transportation</option><option value="travel">Travel</option><option value="ultilities">Utilities</option><option value="video_game">Video Game </option><option value="web">Web Services </option></select> <button class="industry_remove btn btn-danger">-</button> <hr class="short"> </div>';
    $(industry_add_button).click(function(e) {
        e.preventDefault();        
        $(industry_wrapper).append(d_industry); //add input boxes        
    });
    
    $(industry_wrapper).on("click", ".industry_remove", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
    });
                 
    // Job Function
    var function_wrapper =$(".job_function_section");
    var function_add_button =$(".add_function");
    var d_function = '<div id="job_function_tag" class="form-inline"> <select class="form-control" id="job_function" name="job_function" required> <option>None</option> <option>Accounting</option><option>Administrative</option> <option>Arts and Design</option> <option>Business Development</option> <option>Community & Social Services</option><option>Consulting</option><option>Education</option><option>Engineering</option><option>Entrepreneurship</option><option>Finance</option><option>Healthcare Services</option><option>Human Resources</option><option>Information Technology</option><option>Legal</option><option>Marketing</option><option>Media & Communications</option><option>Military & Protective Services</option><option>Operations</option><option>Product Management</option><option>Program & Product Management</option><option>Purchasing</option><option>Quality Assurance</option><option>Real Estate</option><option>Rersearch</option><option>Sales</option>option>Support</option></select> <button class="function_remove btn btn-danger">-</button> <hr class="short"> </div>';
   $(function_add_button).click(function(e) {
        e.preventDefault();        
        $(function_wrapper).append(d_function); //add input boxes        
    });

    $(function_wrapper).on("click", ".function_remove", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
    });
    
             

});