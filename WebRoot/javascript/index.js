
var uid = null;
var changeSize = function() {
	var showMap = document.getElementById("map");
	showMap.style.width = document.documentElement.clientWidth + "px";
	showMap.style.height = document.documentElement.clientHeight + "px";
}
var tt =function(){
	$.get("http://106.14.141.55:9090/file/yj?F0000000091457588175",function(res){
		console.log(res);
	});
}
window.onresize = changeSize;
var showPostion = function(postion) {
	console.log(postion.coords);
}
var displayUpload1 =function(){
	window.displayUpload1Id = window.setInterval(function() {
		$.post("displayUpload1","",function(res){
			console.log(res);
			var resJson =JSON.parse(res);
			var items = resJson["items"];
			for(var i =0;i<items.length;i++){
				//读取JSON中携带的内容
				var tmpItem = items[i];
				var point = tmpItem["area"];
				var x = point.split("&")[1];
				var y = point.split("&")[0];
				var src = "";//tmpItem["upload1_data"];
				var upload_date = tmpItem["update_date"];
				var upload_id = tmpItem["upload_id"];
				var name = tmpItem["name"];
				var type = tmpItem["type"];
				//新建一个icon
				var newIcon = new BMap.Icon("./image/1.gif", new BMap.Size(30,30),{
	                anchor:new BMap.Size(13,15),
	                imageOffset:new BMap.Size(0,0)
					});
				//新建一个marker
				var newPoint = new BMap.Point(x, y);
				var newMarker = new BMap.Marker(newPoint,{icon:newIcon});
				newMarker.wholesrc = src;
				
				//新建一个信息窗口
				var opts = {    //创建信息窗口  
	                	width: 500,     // 信息窗口宽度      
	                	height: 300,     // 信息窗口高度      
	                	title: "<h2>现场图像/音像资源展示</h2>"  // 信息窗口标题     
	            	}
	    		var infopoint = new BMap.Point(x, y);
	    		var resource = newMarker.wholesrc;
	    		var info = new BMap.InfoWindow("", opts);
    			info.resource = resource;
    			newMarker.info = info;
    			newMarker.infopoint = infopoint;
    			newMarker.info.addEventListener("open", function(){
    				this.setContent(this.resource);
    			});
    			newMarker.info.addEventListener("close", function(){
    				this.setContent("");
    			});
				newMarker.addEventListener("click", function(){
    				map.openInfoWindow(this.info, this.infopoint);
				});
				map.addOverlay(newMarker);
				console.log("增加了一个资源：",x,"  ",y);
			}
		});
	}, 5000)

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
			map.centerAndZoom(r.point, 5);
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
//登录成功，打印登录成功信息
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
		onComplete:function(e){
			//展示upload1内容
			displayUpload1();
			//发送登录信息，更新在线用户信息
			sendLogin(uid);
		}
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