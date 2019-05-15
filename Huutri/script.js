function render(data){
	var html="<div class='comentBox'><div class='leftPanelImg'><img src='logo.png'/></div><div class='rightPanel'><span><b>"+data.name+"</b></span><div class='like'>"+data.like+"</div><div class='date'>"+data.date+"</div><div class='rate'>"+data.rate+"</div><p>"+data.body+"<br/></p></div><input type='button' id='like' value='Like'/><div class='clear'></div></div>";
	$('#container').append(html);
}


$(document).ready(function(){
	var coment=[];
    if(!localStorage.comentData){
    	localStorage.comentData=[];
    }
    else{
    	coment= JSON.parse(localStorage.comentData);
    }
    for(var i=0;i<coment.length;i++){ 
        render(coment[i]);
    }
    $('#addComent').click(function(){
    	var today=new Date();
    	var d = today.getUTCDate()+1;
    	var m = today.getUTCMonth()+1;
    	var y = today.getUTCFullYear();
    	var r = $('#rate').val();
    	var rate='';
    	for(var i=0;i<r;i++){
    		rate=rate+"&#9733";
    	}
        
    	var time=d+"/"+m+"/"+y;
    	var addObj = {
           "name": $('#name').val(),
           "date": time,
           "like": 0,
           "rate": rate,
           "body": $('#bodyText').val()
        };
       console.log(addObj);
       coment.push(addObj);
       render(addObj);
       $('#name').val('');
       $('#date').val('dd/mm/yyyy');
       $('#rate').val('1');
       $('#bodyText').val('');
    });
});



