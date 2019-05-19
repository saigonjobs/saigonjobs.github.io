$(document).ready(function() {
    $('.add_').on("click", ".add_to_list", function(e) {
        e.preventDefault();
        var id = $(this).attr("id");
        fetch('/add_job=' + id, {method: 'POST'})
        .then(function(response) {
          if(response.ok) {
            console.log('Click was recorded');
            return;
          }
          throw new Error('Request failed.');
        })
        .catch(function(error) {
          console.log(error);
        });
        $(this).parent('div').append('<i class="fa fa-check-circle" style="color: green; float: right;"></i>');
        $(this).remove();        
    });
})