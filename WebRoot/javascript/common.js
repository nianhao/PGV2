var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var stunServer = {
	"iceServers" : [ {
		"urls" : "stun:stun.l.google.com:19302"
	} ]
};
var videoContains = {
	"audio" : true,
	"video" : {
		width : 360,
		height : 270
	}
}
var map = null;
var socket = null;
var uid_pc_Map = new Map();
var onlineUsers = [];
var getPC = function(uid, remoteuid) {
	var pc = null;
	if (remoteuid)
		pc = uid_pc_Map.get(remoteuid);
	else
		pc = uid_pc_Map.get(uid);
	if (!pc) {
		pc = new Pc(uid, remoteuid);
		pc.init();
		uid_pc_Map.set(remoteuid, pc);
	}
	return pc;

}
var sendMsg = function(){
	console.log("发送信息");
	var onlineUser = window.onlineUser;
	var uid = $("#uid").attr("value");
	var remoteuid = onlineUser.userId;
	var pc = getPC(uid,remoteuid);
	pc.openTextWin();
}
var closeTextWin = function(remoteId){
	delEle(remoteId);
}
var sendTextBtnClick = function (remoteId){
	var pc = getPC(remoteId);
	pc.sendText();
}
var audioCall = function(){
	console.log("语音通话");
}
var videoCall = function(){
	console.log("视频通话");
	var onlineUser = window.onlineUser;
	var uid = $("#uid").attr("value");
	var remoteuid = onlineUser.userId;
    var pc=getPC(uid,remoteuid);
    //Pc(uid,remoteid);
    //uid_pc_Map.set(uid,pc);
    if(window.stream==null){
    	openLocalStream(pc);
    }else{
    	pc.setLocalStream(window.stream);
    }
}
var mapAddUser = function(onlineUser) {
	var point = new BMap.Point(onlineUser.loginx, onlineUser.loginy)
	var mk = new BMap.Marker(point);
	map.addOverlay(mk);
	//单击后显示信息
	var opts = {
		width : 200, // 信息窗口宽度
		height : 100, // 信息窗口高度
		title : onlineUser.showName,  // 信息窗口标题
		enableMessage : true, //设置允许信息窗发送短息
		message : "一个用户"
	}
	var infoWindow = new BMap.InfoWindow("编号：" + onlineUser.userName + "\n" + "登录时间:" + onlineUser.loginTime, opts); // 创建信息窗口对象
	mk.addEventListener("click", function() {
		
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	});
	mk.onlineUser=onlineUser;
	//增加右键菜单
	//创建右键菜单
	var markerMenu = new BMap.ContextMenu();
	//发送信息
	markerMenu.addItem(new BMap.MenuItem('发送信息', sendMsg.bind(mk)));
	//语音通话
	markerMenu.addItem(new BMap.MenuItem('语音通话', audioCall.bind(mk)));
	//视频通话
	markerMenu.addItem(new BMap.MenuItem('视频通话', videoCall.bind(mk)));
	mk.addContextMenu(markerMenu);
	//添加右击事件
	mk.addEventListener("rightclick",function(){
		window.onlineUser=this.onlineUser;
	});
	//支持拖拽
	mk.enableDragging()
}
var updateOnlineUser = function() {
	$.post("updateOnlineUser", "", function(res) {
		console.log("在线用户： " + res);

		onlineUsers = JSON.parse(res).users;
		if ($("#loading").css("display") != "none") {
			//第一次登录
			typeMsg("正在拉取在线用户列表....");
		}
		map.clearOverlays();
		for (var i = 0; i < onlineUsers.length; i++) {
			mapAddUser(onlineUsers[i]);
		}
		if ($("#corver").attr("corver") == "true") {
			//第一次登录
			var showName = $("#showName").attr("value");
			var nowWork = $("p.nowWork")
			nowWork[nowWork.length - 1].setAttribute('class', 'oldWork');
			var newP = document.createElement('p');
			newP.setAttribute('class', 'nowWork');
			$("#message")[0].insertBefore(newP, nowWork[nowWork.length - 1].nextSibling);

			var callBack = function() {
				$("#corver")[0].setAttribute("corver", "false");
				$("#map").css({
					"Filter" : "none"
				});
				console.log("欢迎您");
			}
			new Typed('.nowWork', {
				strings : [ "刷新成功，欢迎您 " + showName ],
				typeSpeed : 100,
				startDelay : 0,
				loop : false,
				loopCount : Infinity,
				cursorChar : '|',
				showCursor : false,
				onComplete : function(e) {
					$("#corver").hide("fold", {
						percent : 0
					}, 2000, callBack);
				}
			});
		} else {
			console.log("新的用户上线了");
		}
	});
}
var receiveSdp = function(jsonObj) {
	var sdp = jsonObj.sdp;
	var pc = uid_pc_Map.get(jsonObj.fromUid);
	pc.receiveSdp(sdp);
}
var receiveCandidate = function(jsonObj) {
	var candidate = jsonObj.candidate;
	var pc = uid_pc_Map.get(jsonObj.fromUid);
	pc.receiveCandidate(candidate);
}
var acceptRing = function(jsonObj) {
	var uid = jsonObj.toUid;
	var remoteid = jsonObj.fromUid;
	$("#" + remoteid).remove();
	pc = getPC(uid, remoteid);
	if (window.stream) {
		pc.setLocalStream(window.stream);
	} else {
		openAcceptLocalStream(pc);
	}
}
var receiveRing = function(jsonObj) {
	//认为同意请求
	var uid = jsonObj.toUid;
	var remoteid = jsonObj.fromUid;
	pc = getPC(uid, remoteid);
	var uiF = new uiFactory();
	uiF.createVideoCall(jsonObj);
	/*if (window.stream) {
		pc.setLocalStream(window.stream);
	} else {
		openAcceptLocalStream(pc, "localvideo");
	}*/

}
var receiveReady = function(jsonObj) {
	var pc = uid_pc_Map.get(jsonObj.fromUid);
	pc.sendOffer();
}
var receiveText = function(jsonObj) {
	var pc = getPC(jsonObj.toUid, jsonObj.fromUid);
	pc.receiveText(jsonObj.text);
}
var receiveSignal = function(jsonObj) {
	var pc = getPC(jsonObj.toUid, jsonObj.fromUid);
	switch (jsonObj.signal) {
	case "hangUp":
		pc.receiveHangUp();
		break;
	}
}
var hangUp = function(remoteid) {
	var pc = getPC(remoteid);
	pc.hangUp();
}
var analysisMessage = function(message) {
	console.log(message);
	var jsonObj = JSON.parse(message);
	switch (jsonObj.type) {
	case "candidate":
		receiveCandidate(jsonObj);
		break;
	case "offer":
	case "answer":
		receiveSdp(jsonObj);
		break;
	case "ring":
		receiveRing(jsonObj);
		break;
	case "ready":
		receiveReady(jsonObj);
		break;
	case "text":
		receiveText(jsonObj);
		break;
	case "signal":
		receiveSignal(jsonObj);
		break;
	case "loginSuccess":
		updateOnlineUser();
		break;
	}

}
var sendToServer = function(data) {
	$.post("messageHandler", data, function() {
		console.log("发送成功");
	});
}
var getCurrentTime = function() {
	var myDate = new Date();
	return myDate.toString();
}

var openLocalStream = function(openedPc) {
	var openLocalStreamSuccess = function(stream, openedPc) {
		window.stream = stream;
		try {
			openedPc.setLocalStream(stream);
			openedPc.sendRing();
		} catch (Error) {
			console.log(Error);
		} finally {
			console.log("打开视频流成功");
		}

	}
	var openLocalStreamError = function(error) {
		console.log("打开本地视频流失败");
	}

	navigator.mediaDevices.getUserMedia(videoContains)
		.then(function(stream) {
			openLocalStreamSuccess(stream, openedPc)
		})
		.catch(openLocalStreamError);
}
var openAcceptLocalStream = function(openedPc) {
	var openAcceptLocalStreamSuccess = function(stream, openedPc) {
		window.stream = stream;
		try {
			openedPc.setLocalStream(stream);
			//$("#" + localVideoId)[0].srcObject = stream;
			openedPc.sendStreamReady();
		} catch (Error) {
			console.log(Error);
		} finally {
			console.log("打开视频流成功");
		}

	}
	var openAcceptLocalStreamError = function(error) {
		console.log("打开本地视频流失败\n" + error.message);
	}

	navigator.mediaDevices.getUserMedia(videoContains)
		.then(function(stream) {
			openAcceptLocalStreamSuccess(stream, openedPc)
		})
		.catch(openAcceptLocalStreamError);
}

var sendLogin = function(uid) {
	sendToServer({
		"toUser" : "all",
		"fromUser" : uid,
		"type" : "loginSuccess",
		"time" : getCurrentTime()
	})
}