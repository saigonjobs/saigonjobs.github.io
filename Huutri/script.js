function render(data){
	var html="<div class='comentBox'><div class='leftPanelImg'><img src='logo.png'/></div><div class='rightPanel'><span>"+data.name+"</span><div class='date'>"+data.date+"</div><p>"+data.body+"<br/></p></div><div class='clear'></div></div>";
	$('#container').append(html);
}



$(document).ready(function(){
	var coment=[{"name":"tri","date":"2/3/2019","body":"boyd"}];
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
    	var addObj = {
           "name": $('#name').val(),
           "date": $('#date').val(),
           "body": $('#bodyText').val()
        };
       console.log(addObj);
       coment.push(addObj);
       render(addObj);
       $('#name').val('');
       $('#date').val('dd/mm/yyyy');
       $('#bodyText').val('');
    });
});