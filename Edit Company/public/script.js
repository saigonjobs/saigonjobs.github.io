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

    // Job Tags
    var industry_wrapper =$(".job_tags_section");
    var industry_add_button =$(".add_job_tag");
    var d_industry = '<div><div id="job_tag" class="form-inline"><input type="text" class="form-control" id="job_tags" name="job_tags" pattern="[/^\\S+$/]+" required placeholder="Tag"> <button class="tags_remove btn btn-danger">-</button> </div>';
    $(industry_add_button).click(function(e) {
        e.preventDefault();        
        $(industry_wrapper).append(d_industry); //add input boxes        
    });
    
    $(industry_wrapper).on("click", ".tags_remove", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
    });
 
});

