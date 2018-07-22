var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var stunServer = {"iceServers" : [{"urls" : "stun:stun.l.google.com:19302"}]};
var videoContains={
		"audio":true,
		"video":true
}
var socket=null;
var uid_pc_Map=new Map();

var getPC=function(uid,remoteuid){
	var pc=null;
	pc=uid_pc_Map.get(remoteuid);
	if(!pc){
		pc=new Pc(uid,remoteuid);
		uid_pc_Map.set(remoteuid,pc);
	}
	return pc;
	 
}
var receiveSdp=function(jsonObj){
	var sdp=jsonObj.sdp;
	var pc = uid_pc_Map.get(jsonObj.fromUid);
	pc.receiveSdp(sdp);
}
var receiveCandidate=function(jsonObj){
	var candidate=jsonObj.candidate;
	var pc = uid_pc_Map.get(jsonObj.fromUid);
	pc.receiveCandidate(candidate);
}
	var receiveRing=function(jsonObj){
		//认为同意请求
		var uid=jsonObj.toUid;
		var remoteid=jsonObj.fromUid;
		pc=getPC(uid,remoteid);
		if(window.stream){
			pc.setLocalStream(window.stream);
		}else{
			openAcceptLocalStream(pc,"localvideo");
		}
		
	}
			var receiveReady=function(jsonObj){
			var pc=uid_pc_Map.get(jsonObj.fromUid);
			pc.sendOffer();
		}
var receiveText = function (jsonObj){
	var uid=jsonObj.toUid;
	var remoteid=jsonObj.fromUid;
	//alert(jsonObj.message);
	document.getElementById("showplan").innerHTML = jsonObj.message;
	//pc=getPC(uid,remoteid);
	//pc.receiveText(jsonObj.text);
}
var analysisMessage=function(message){
	console.log(message);
	var jsonObj=JSON.parse(message);
	switch(jsonObj.type){
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
	}
}
var sendToServer=function(data){
	$.post("messageHandler",data,function(){
		console.log("发送成功");
	});
}
var getCurrentTime=function(){
	var myDate=new Date();
	return myDate.toString();
}

var openLocalStream=function(openedPc,localVideoId){
	var openLocalStreamSuccess=function(stream,openedPc){
		window.stream=stream;
		try{
			openedPc.setLocalStream(stream);
			$("#"+localVideoId)[0].srcObject=stream;
			openedPc.sendRing();
		}catch(Error){
			console.log(Error);
		}finally{
			console.log("打开视频流成功");
		}
		
	}
	var openLocalStreamError=function(error){
		console.log("打开本地视频流失败");
	}

	navigator.mediaDevices.getUserMedia(videoContains)
		.then(function(stream){openLocalStreamSuccess(stream,openedPc)})
		.catch(openLocalStreamError);
}
var openAcceptLocalStream=function(openedPc,localVideoId){
	var openAcceptLocalStreamSuccess=function(stream,openedPc){
		window.stream=stream;
		try{
			openedPc.setLocalStream(stream);
			$("#"+localVideoId)[0].srcObject=stream;
			openedPc.sendStreamReady();
		}catch(Error){
			console.log(Error);
		}finally{
			console.log("打开视频流成功");
		}
		
	}
	var openAcceptLocalStreamError=function(error){
		console.log("打开本地视频流失败\n"+error.message);
	}

	navigator.mediaDevices.getUserMedia(videoContains)
		.then(function(stream){openAcceptLocalStreamSuccess(stream,openedPc)})
		.catch(openAcceptLocalStreamError);
}