<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.PGV2.javaBean.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>多网络融合应急调度平台首页</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" href="jqueryUI/jquery-ui.css" />
<link rel="stylesheet" href="css/ui.css" />
<script src="javascript/jquery-3.3.1.js"></script>
<script src="jqueryUI/jquery-ui.js"></script>
<script src="javascript/uiFactory.js"></script>
<script src="javascript/ui.js"></script>
<link rel="stylesheet" href="css/index.css" />
<script src="javascript/index.js"></script>
</head>
<script type="text/javascript">
	$(function() {
		$("#tabs").tabs();
	});
	function loadJScript() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://api.map.baidu.com/api?v=2.0&ak=PDSop9ICA0VFkXSR2BKdixLslvu2EY2q&callback=init";
		document.body.appendChild(script);
	}
	window.onload = loadJScript;
</script>
<body>
	<%
		//判断用户是否登录
		User user = (User) session.getAttribute("user");
		if (user == null || user.equals(null)) {
			response.sendRedirect("login.jsp");
		}
	%>
	<div class="left" id="message">
	</div>
	<div id="loading"></div>
	<div id="map"></div>
</body>
<script type="text/javascript">
	var showPostion = function(postion) {
		console.log(postion.coords);
	}
	var x = document.getElementById('background');
	var init = function() {
		changeSize();
		var geolocation = new BMap.Geolocation();
		var map = new BMap.Map("map");
		map.addControl(new BMap.MapTypeControl());
		geolocation.getCurrentPosition(function(r) {
			if (this.getStatus() == BMAP_STATUS_SUCCESS) {
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.centerAndZoom(r.point, 15);
				map.enableScrollWheelZoom(true);
				//alert('您的位置：'+r.point.lng+','+r.point.lat);
				//var myDis = new BMapLib.DistanceTool(map);
				map.addEventListener("click", function(e) {});
			} else {
				alert('failed' + this.getStatus());
			}
		}, {
			enableHighAccuracy : true
		});
	}
	var changeSize = function() {
		var showMap = document.getElementById("map");
		showMap.style.width = document.documentElement.clientWidth + "px";
		showMap.style.height = document.documentElement.clientHeight + "px";
	}
	window.onresize = changeSize;
</script>
</html>
