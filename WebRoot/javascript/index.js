
var uid = null;
var typeSuccess=function (){
	var nowWork = $("p.nowWork")
	nowWork[nowWork.length-1].setAttribute('class', 'oldWork');
	var newP = document.createElement('p');
	newP.setAttribute('class', 'nowWork');
	$("#message")[0].insertBefore(newP, nowWork[nowWork.length-1].nextSibling);
	new Typed('.nowWork', {
		strings : ["登录成功" ],
		typeSpeed : 100,
		startDelay : 3000,
		loop : false,
		loopCount : Infinity,
		cursorChar : '|',
		showCursor :false,
		onComplete:function(e){sendLogin(uid);}
	});
	
}
var typeMsg=function(msg){
	//打印提示信息
	if(msg==="登录成功"){
		typeMsg("正在定位。。。。。")
		typeMsg("定位成功。。。。。")
		typeMsg("交换信息。。。。。")
		typeMsg("webSS连接成功。。。。")
		typeSuccess();

	}else{
		var nowWork = $("p.nowWork")
		nowWork[nowWork.length-1].setAttribute('class', 'oldWork');
		var newP = document.createElement('p');
		newP.setAttribute('class', 'nowWork');
		$("#message")[0].insertBefore(newP, nowWork[nowWork.length-1].nextSibling);
		new Typed('.nowWork', {
			strings : [ msg ],
			typeSpeed : 100,
			startDelay : 0,
			loop : false,
			loopCount : Infinity,
			cursorChar : '|',
			showCursor : false
		});
	}

}
var ConnectWSS = function() {
	//打印提示信息
	typeMsg("正在连接webSS。。。。")
	//连接webSocket服务器
	socket=new webSS(uid)
	
};

$(document).ready(function() {
	uid = $("#uid").attr("value");
	//$("#background").css({"display":"none"});
	$("#loading").load("loading.html");
	/*new Typed('#waitting', {
		strings : [ '。。。。。。。。。。。' ],
		typeSpeed : 200,
		startDelay : 100,
		loop : true,
		loopCount : Infinity,
		bindInputFocusEvents : true,
		cursorChar : '。',
		showCursor : false
	// 其他的事件，就不写了，在手册里面已经标注了
	});*/

	var loadingType = new Typed('.nowWork', {
		strings : [ "正在配置资源请稍候。。。。。。" ],
		typeSpeed : 100,
		startDelay : 0,
		loop : false,
		loopCount : Infinity,
		cursorChar : '|',
		showCursor : true,
		onComplete : function(e) {
			ConnectWSS();
		}
	});


});