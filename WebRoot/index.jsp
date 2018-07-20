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
<script src="javascript/common.js"></script>
<script src="javascript/webSS.js"></script>
<script src="javascript/Pc.js"></script>
<link rel="stylesheet" href="css/index.css" />
<script src="javascript/typed.js"></script>
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
			if(user==null||user.equals(null)){
				response.sendRedirect("login.jsp");
				return;
			}

		int id = user.getId();
		String userName = user.getUserName();
		String showName = user.getShowName();
	%>
	<div id="corver" corver="true">
		<div class="left" id="message">
			<P class="nowWork"></P>
			<p id="waitting"></p>
		</div>
		<div class="left" id="user">
			<ul>
				<li id="showName" value=<%=showName%>>姓名：<%=showName%></li>
				<li id="uid" value=<%=id%>>编号：<%=userName%></li>
			</ul>
		</div>
		<div id="loading"></div>
	</div>
	<div id="map"></div>
	<input type="button" value="退出" id="exit"><a href="login.jsp"></a></input>
</body>
<script>
	  	$( document ).tooltip({
  			show:{effect:"drop",delay:200},
  			hide:{effect:"drop",delay:200}
  		});
</script>
</html>
