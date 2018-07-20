$(document).ready(function(){
	$("#loginBtn").click(function(){
		var userName = $("#userName").val();
		var userPwd = $("#userPwd").val();
		var code = $("#code").val();
		data={
				"userName":userName,
				"userPwd":userPwd,
				"code":code
		}
		$.post(
				"login",data,function(res){
					console.log(res);
					var resJson = JSON.parse(res)
					if(resJson.state=="error"){
						
					}else{
						window.location.href=resJson.redirect
					}
				}
		)
	});
	$("#codeImg").click(function(){
		this.src="./CheckCode?"+Math.random();
	});
});
