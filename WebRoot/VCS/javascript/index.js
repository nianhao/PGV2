
var getDevies = function() {
	console.log("获取可用设备");
	AgoraRTC.getDevices(function(devices) {
		var devCount = devices.length;
		console.log("总计有：", devices.length);
		for (var i = 0; i < devCount; i++) {
			console.log(devices[i].kind, "label是：", devices[i].label);
			if (devices[i].kind === "audioinput") {
				if (devices[i].label == "") {
					console.log("label是空的，我来加个名字");
					devices[i].label = "音频输出设备" + i;
				}
				$("#audioDevices").append('<option devId="' + devices[i].deviceId + '">' + devices[i].label + '</option>')
			} else if (devices[i].kind === "videoinput") {
				if (devices[i].label == "") {
					devices[i].label = "视频频输出设备" + i;
				}
				$("#videoDevices").append('<option devId="' + devices[i].deviceId + '">' + devices[i].label + '</option>')
			}
		}
	}, function(error) {
		console.log("获取设备出现错误", error);
	});
}

var config = {
	mode : "live",
	codec : "vp8",
	poxyServer : "",
	turnServer : ""
}
var appId,
	channelKey,
	channel,
	localStream;
var client = null;
var clientNumber = 0;

var enterConference = function() {
	console.log("加入会议");
	appId = $("#appId").val();
	channel = $("#channel").val();
	channelKey = "";
	client = AgoraRTC.createClient(config);
	client.init(appId, function() {
		//初始化客户端之后加入会议房间
		console.log("client initialized");
		//join channel
		client.join(channelKey, channel, null, function(uid) {
			console.log("client" + uid + "joined channel");
			//create local stream
			micId = $("#audioDevices option").attr("devId");
			cameraId = $("#videoDevices option").attr("devId");
			var spec = {
				"streamID" : 1,
				"audio" : true,
				"video" : true,
				"screen" : false,
				"mirror" : true,
				"cameraId" : cameraId,
				"microphoneId" : micId
			}
			localStream = AgoraRTC.createStream(spec);
			localStream.setVideoProfile('480P');
			// The user has granted access to the camera and mic.
			localStream.on("accessAllowed", function() {
				console.log("accessAllowed");
			});

			// The user has denied access to the camera and mic.
			localStream.on("accessDenied", function() {
				console.log("accessDenied");
			});
			localStream.init(function() {
				console.log("open local Stream");
				localStream.play("u4_div");
				localStream.play("u8_div");
				clientNumber=2;
				client.publish(localStream, function(err) {
					console.log("Publish local stream error: " + err);
				});

				client.on('stream-published', function(evt) {
					console.log("Publish local stream successfully");
				});
			}, function(err) {
				console.log("getUserMedia failed", err);
			});
		}, function(err) {
			console.error("client join failed ", err);
		//error handling
		});
	}, function(err) {
		console.log("client init failed ", err);
	//error handling
	});
	client.on('error', function(err) {
		console.log("Got error msg:", err.reason);
		if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
			client.renewChannelKey(channelKey, function() {
				console.log("Renew channel key successfully");
			}, function(err) {
				console.log("Renew channel key failed: ", err);
			});
		}
	});


	client.on('stream-added', function(evt) {
		var stream = evt.stream;
		console.log("New stream added: " + stream.getId());
		console.log("Subscribe ", stream);
		client.subscribe(stream, function(err) {
			console.log("Subscribe stream failed", err);
		});
	});

	client.on('stream-subscribed', function(evt) {
		var stream = evt.stream;
		console.log("Subscribe remote stream successfully: " + stream.getId());
		/*if ($('div#video #agora_remote' + stream.getId()).length === 0) {
			$('div#video').append('<div id="agora_remote' + stream.getId() + '" style="float:left; width:810px;height:607px;display:inline-block;"></div>');
		}
		
		stream.play('agora_remote' + stream.getId());*/
		clientNumber +=1;
		var videoPlay = "u"+clientNumber*4+"_div";
		console.log("新加入的视频放置在"+videoPlay);
		stream.play(videoPlay);
	});

	client.on('stream-removed', function(evt) {
		var stream = evt.stream;
		stream.stop();
		$('#agora_remote' + stream.getId()).remove();
		console.log("Remote stream is removed " + stream.getId());
	});

	client.on('peer-leave', function(evt) {
		var stream = evt.stream;
		if (stream) {
			stream.stop();
			$('#agora_remote' + stream.getId()).remove();
			console.log(evt.uid + " leaved from this channel");
		}
	});
}
var exitConference = function(){
	
	client.leave(function() {
		console.log("Leavel channel successfully");
	}, function(err) {
		console.log("Leave channel failed");
	});	
}
$(document).ready(function() {
	console.log("页面加载完成");
	if (AgoraRTC.checkSystemRequirements()) {

		console.log("浏览器支持");
		getDevies();
		$("#enter").click(enterConference);
		$("#exit").click(exitConference);
	} else {
		alert("您的浏览器不支持，部分功能可能无法使用。为了方便请您使用chrome浏览器")
	}

});