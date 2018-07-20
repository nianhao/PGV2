
var uid = null;
var changeSize = function() {
	var showMap = document.getElementById("map");
	showMap.style.width = document.documentElement.clientWidth + "px";
	showMap.style.height = document.documentElement.clientHeight + "px";
}
window.onresize = changeSize;
var showPostion = function(postion) {
	console.log(postion.coords);
}
var initMap = function() {
	changeSize();
	var data = null;
	var geolocation = new BMap.Geolocation();
	map = new BMap.Map("map");
	map.addControl(new BMap.MapTypeControl());
	geolocation.getCurrentPosition(function(r) {
		if (this.getStatus() == BMAP_STATUS_SUCCESS) {
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.centerAndZoom(r.point, 15);
			map.enableScrollWheelZoom(true);
			data = {
				"user" : $("#uid").attr("value"),
				"logx" : r.point.lng,
				"logy" : r.point.lat,
				"loginTime" : getCurrentTime(),
				"state" : "success"
			}
			//alert('您的位置：'+r.point.lng+','+r.point.lat);
			//var myDis = new BMapLib.DistanceTool(map);
			map.addEventListener("click", function(e) {});
		} else {
			console.log('failed to geoloacation,caused by: ' + this.getStatus());
			data = {
				"user" : $("#uid").attr("value"),
				"loginTime" : getCurrentTime(),
				"state" : "error"
			}
		}
		console.log("定位完成，准备设置登录信息");
		$.post("setLoginMsg", data, function(res) {
			console.log("登录信息设置完成");
			resJson = JSON.parse(res);
			typeMsg(resJson.message);
		});
	}, {
		enableHighAccuracy : true
	});

}
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
//webSS连接之后的回调函数
var typeWebSSConnected= function (){
	
	var nowWork = $("p.nowWork")
	nowWork[nowWork.length-1].setAttribute('class', 'oldWork');
	var newP = document.createElement('p');
	newP.setAttribute('class', 'nowWork');
	$("#message")[0].insertBefore(newP, nowWork[nowWork.length-1].nextSibling);
	new Typed('.nowWork', {
		strings : [ "webSS 连接成功。" ],
		typeSpeed : 100,
		startDelay : 0,
		loop : false,
		loopCount : Infinity,
		cursorChar : '|',
		showCursor : false,
		onComplete:function(e){initMap();}
	});
	
}
var typeMsg=function(msg){
	//打印提示信息
	if(msg==="登录成功"){
		typeMsg("正在定位。。。。。")
		typeMsg("定位成功。。。。。")
		typeMsg("交换信息。。。。。")
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
	socket=new webSS(uid,typeWebSSConnected)
	
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
	
	$("#exit").click(function(){
		window.location.href="login.jsp"
	});

});