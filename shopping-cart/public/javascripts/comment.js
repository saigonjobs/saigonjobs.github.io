$(document).ready(function() {

    /* Set rates + misc */
    var taxRate = 0.05;
    var shippingRate = 15.00; 
    var fadeTime = 300;
    
    
    $('.news-removal button').click( function() {
    removeItem(this);
    });
    
    
    function removeItem(removeButton)
    {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideLeft(fadeTime, function() {
      productRow.remove();
      recalculateCart();
    });
    }
});
    