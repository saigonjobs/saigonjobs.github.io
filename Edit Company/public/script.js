$(document).ready(function() {
    // Location
    var location_wrapper = $(".location_section");
    var location_add_button = $(".add_location");
    var d_location = '<div id="location" class="box"> <div class="entry input-group"> <div class="form-group form-row"> <div class="col-md-6 mb-3"> <label for="location_address_1">Address</label> <input type="text" class="form-control" name="location_address_1" id="location_address_1" placeholder="1234 Main St" required> </div> <div class="col-md-6 mb-3"> <label for="location_address_2">Address 2</label> <input type="text" class="form-control" name="location_address_2" id="location_address_2" placeholder="Apartment, studio, or floor"></div> <div class="form-row"> <div class="form-group col-md-4"> <label for="location_nation">Nation</label> <input type="text" id="location_nation" name="location_nation" class="form-control" placeholder="Nation" required> </div> <div class="form-group col-md-4"> <label for="location_city">City / Province</label> <input type="text" id="location_city" name="location_city" class="form-control" placeholder="City / Province" required> </div> <div class="form-group col-md-4"> <label for="location_state">State / District</label> <input type="text" id="location_state" name="location_state" class="form-control" placeholder="State / District" required> </div> </div> </div> </div> <button class="location_remove btn btn-danger">Remove Location </button> <hr class="short"> </div>';
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
    var d_social = '<div class="social_link"><div class="form-row"><div class="col-md-3 mb-3"><select id="social_select" name="social_select" class="form-control"><option value="">...</option><option value="social_facebook">Facebook</option><option value="social_twitter">Twitter</option> <option value="social_google">Google</option><option value="social_linkedin">LinkedIn</option><option value="social_youtube">Youtube</option> <option value="social_insta">Instagram</option><option value="social_pinterest">Pinterest</option><option value="social_snapchat">Snapchat</option><option value="social_skype">Skype</option><option value="social_dribble">Dribble</option><option value="social_vimeo">Vimeo</option> <option value="social_tumblr">Tumblr</option><option value="social_vine">Vine</option><option value="social_foursquare">Foursquare</option><option value="social_flickr">Flickr</option><option value="social_soundcloud">Soundcloud</option><option value="social_reddit">Reddit</option> <option value="social_rss">RSS</option></select></div><div class="col-md-8 mb-3"> <input type="url" id="social_url" name="social_url" class="form-control" placeholder="https://example.com/"></div></div> <button class="social_remove btn btn-danger">Remove Social Link</button> <hr class="short"> </div>';
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
    var d_industry = '<div id="job_industry_tag" class="form-inline"><select class="form-control" id="job_industry" name="job_industry" required><option value="">Industry...</option><option>Accommodations</option><option>Accounting</option><option>Advertising</option><option>Aerospace</option><option>Agriculture & Agribusiness</option><option>Air Transportation</option><option>Apparel & Accessories</option><option>Auto</option><option>Banking</option><option>Beauty & Cosmetics</option><option>Biotechnology </option><option>Chemical </option><option>Communications</option><option>Computer</option><option>Construction</option><option>Consulting</option><option>Consumer Products</option><option>Distribution</option><option>Education</option><option>Electronics</option><option>Employment</option><option>Energy</option><option>Entertainment & Recreation</option><option>Fashion</option><option>Financial Services</option><option>Fine Arts</option><option>Food & Beverage</option><option>Green Technology</option><option>Health </option><option>Industrial Products</option><option>Information</option><option>Information Technology</option><option>Insurance</option><option>Journalism & News</option><option>Legal Services</option><option>Manufacturing</option><option>Media & Broadcasting</option><option>Medical Devices & Supplies</option><option>Mining</option><option>Motion Pictures & Video</option><option>Music</option><option>Pharmaceutical </option><option>Public Administration</option><option>Public Relations</option><option>Publishing </option><option>Rail</option><option>Real Estate</option><option>Retail</option><option>Service</option><option>Shipping</option><option>Sports</option><option>Steel</option><option>Technology </option><option>Telecommunications</option><option>Tourism</option><option>Transportation</option><option>Travel</option><option>Utilities</option><option>Video Game </option><option>Web Services </option></select> <button class="industry_remove btn btn-danger">-</button> <hr class="short"> </div>';
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