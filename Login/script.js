var login=[
{"user":"huutri","password":"1234567"},
{"user":"huutri1","password":"1234567"},
{"user":"hello","password":"12345678"}
];

$('#login').click(function(){
     var usr=$('#uname').val();
     var pw=$('#psw').val();
     var x=false;
     console.log(usr);
     for(var i=0;i<login.length;i++){
     	if(usr==login[i].user){
     		if(pw==login[i].password){
     			console.log("success");
     			x=true;
     		}
     	}
     }
     if(x==false){
     	console.log("Fail");
     }
     else{
     	window.location="http://bongdaplus.vn/";
     }
     x=false;
});