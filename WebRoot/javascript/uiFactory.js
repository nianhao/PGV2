var uiFactory = function() {

	var addProgressBar = function(id) {
		var str = '<div name="' + id + '" id="' + id + '"></div>'
		$("body").append(str);
		$("#" + id).progressbar({
			value : 20
		});
	}

	var createVideoWin2 = function(id) {
		var str = '<div class="videoContent" id="' + id + '" >'
			+ '<div class="top"><span>与<b>' + id + '</b>视频通话中</span></div>'
			+ '<div class="video left"> <video autoplay id="localvideo"></video></div>'
			+ '<div class="video right"><video autoplay id="remotevideo"></video></div>'
			+ '<div class="bottom left">'
			+ '<ul class="left">'
			+ '<li class="sendText"><a href="#" title="发送文字"></a></li>'
			+ '<li class="mic"><a href="#" title="关闭麦克风"></a></li>'
			+ '<li class="camera"><a href="#" title="关闭摄像头"></a></li>'
			+ '<li class="audio"><a href="#" title="关闭音量"></a></li>'
			+ '<li class="changeCam"><a href="#" title="切换摄像头"></a></li>'
			+ '<li class="hang-up"><a href="#" title="挂断"></a></li>'
			+ '</ul>'
			+ '</div>'
			+ '</div>';
		$("body").append(str);
		$(".videoContent").draggable();
		$('div#' + id + ' div.bottom ul .hang-up').click(function() {
			console.log("点击了挂断按钮");
			hangUp(id);
		});

	}
	var createVideoCall = function(jsonObj) {
		var str = '<div class="videoCallContent" id="' + jsonObj.fromUid + '">'
			+ '<div class="userContent">'
			+ '<div class="deadPortrait"><img class="headImg"/></div>'
			+ '<div class="text">'
			+ '<div class="userName"><span>' + jsonObj.fromUid + '</span></div>'
			+ '<div class="connType"><span>视频通话</span></div>'
			+ '</div>'
			+ '</div>'
			+ '<div class="controlContent">'
			+ '<ul>'
			+ '<li class="textBtn rej"><a href="#" title="拒绝"></a></li>'
			+ '<li class="textBtn textRej"><a href="#" title="回复消息"></a></li>'
			+ '<li class="textBtn audioAcc"><a href="#" title="语音接听"></a></li>'
			+ '<li class="accept">'
			+ '<div class="acceptSlider">'
			+ '<div class="slider" >'
			+ '<a href="#" title="滑动接听"></a>'
			+ '</div>'
			+ '</div>'
			+ '</li>'
			+ '</ul>'
			+ '</div>'
			+ '</div>'
		$("body").append(str);
		$("#acceptSlider").progressbar();
		$(".videoContent").draggable();
		$(".slider").draggable({
			containment : "#acceptSlider",
			axis : "x",
			drag : function() {
				var left = $(this).css("left");
				var leftNum = parseFloat(left.substring(0, left.length - 2));
				//console.log(leftNum+"  "+totleNum);
				var now = $(this).parent().css("background-position-x");
				var nowNum = -260; //parseFloat(now.substring(0,now.length-2));
				var shouldBe = nowNum + leftNum;
				$(this).parent().css({
					"background-position-x" : shouldBe
				});
			},
			stop : function() {
				var now = $(this).parent().css("background-position-x");
				var nowNum = parseFloat(now.substring(0, now.length - 2));
				if (nowNum < -130) {
					$(this).css({
						"left" : 0
					});
					$(this).parent().css({
						"background-position-x" : -260
					});
				} else {
					$(this).css({
						"left" : 241
					});
					$(this).parent().css({
						"background-position-x" : -260 + 241
					});
					acceptRing(jsonObj);

				}
			}
		});
	}

	var createTextWin = function(remoteId) {
		var str = 
			'<div class="textContent" id="'+remoteId+'">'
				+ '<div class="top">'
					+ '<div class="remote">'+remoteId+'</div>'
					+ '<div class="close"><input type="button" id="closeBtn"/></div>'
				+ '</div>'
				+ '<div class="main">'
					+ '<div class="messageContent" id="textMsgC">'
					+ '</div>'
				+ '</div>'
				+ '<div class="bottom">'
					+ '<div class="optContent">'
						+ '<ul>'
							+ '<li class="file"><a href="#" title="文件"></a></li>'
							+ '<li class="audio"><a href="#" title="语言消息"></a></li>'
							+ '<li class="img"><a href="#" title="图片"></a></li>'
							+ '<li class="audioCall"><a href="#" title="语音电话"></a></li>'
							+ '<li class="videoCall"><a href="#" title="视频电话"></a></li>'
						+ '</ul>'
					+ '</div>'
					+ '<div class="currMessage">'
						+ '<textarea id="nowText"></textarea>'
						+ '<div class="sendBtn" >'
							+ '<input type="button" value="发送" class="btn" id="sendBtn"/>'
						+ '</div>'
					+ '</div>'

				+ '</div>'
			+ '</div>';
			$("body").append(str);
			$(".textContent").draggable();
			$("div#"+remoteId+" .top div.close #closeBtn").click(function(){
				console.log("点击了关闭按钮");
				closeTextWin(remoteId);
			});
			$("div#"+remoteId+" .bottom .sendBtn .btn").click(function(){
				//var str=$("div#"+remoteId+" .bottom .currMessage textarea#idText")
				sendTextBtnClick(remoteId);
			});

	}
	this.addProgressBar = addProgressBar;
	this.createVideoWin2 = createVideoWin2;
	this.createVideoCall = createVideoCall;
	this.createTextWin = createTextWin;
}