var Pc=function(myId,remoteId){
	//声明会变量
	var rtcPC=null;
	var myid=myId;
	var remoteid=remoteId;
	var localStream=null;
	var remoteStream=null;
	var ui=null;
	onIceCandidate=function(event){
		if(event.candidate){
			
			sendToServer({
				"toUser":remoteid,
				"fromUser":myid,
				"createTime":getCurrentTime(),
				"type":"candidate",
				"candidate":JSON.stringify(event.candidate)
			});
		}else{
			console.log("end of candidate");
		}
	};
	onOpen=function(){
		console.log(myid+" 新建一个与 "+remoteid+" 连接的rtcPeerConnection");
	}
	onConnecting=function(){
		console.log("正在连接");
	}
	onRemoteStreamAdded=function(event){
		console.log("接收到远端的视频");
		remoteStream=event.streams[0];
		$("#remotevideo")[0].srcObject=remoteStream;
	}
	onRemoteStreamRemoved=function(){
		console.log("远程视频流删除");
		stream=null;
	}
	
	rtcPC=new PeerConnection(stunServer);
	//绑定rtcPeerConnection的函数
	rtcPC.onicecandidate = onIceCandidate;
	rtcPC.onconnecting = onConnecting;
	rtcPC.onopen = onOpen;
	//pc.onaddstream = onRemoteStreamAdded;,修改为新的加载方式
	rtcPC.ontrack=onRemoteStreamAdded;
	rtcPC.onremovestream = onRemoteStreamRemoved;
	var init=function(){
		ui = new uiFactory();
	}
	var createOfferSuccess=function(sdp){
		rtcPC.setLocalDescription(sdp);
		console.log("发送offer信息");
		sendToServer({
			"toUser":remoteid,
			"fromUser":myid,
			"createTime":getCurrentTime(),
			"type":"offer",
			"sdp":JSON.stringify(sdp)
		});
	};
	var createOfferError=function(error){
		console.log("创建offer失败");
	}
	var createAnswerSuccess=function(sdp){
		rtcPC.setLocalDescription(sdp);
		console.log("发送answer信息");
		sendToServer({
			"toUser":remoteid,
			"fromUser":myid,
			"createTime":getCurrentTime(),
			"type":"answer",
			"sdp":JSON.stringify(sdp)
		});
	}
	var createAnswerError=function(error){
		console.log(error);
	}
	var sendOffer=function(){

		try{
			rtcPC.createOffer(createOfferSuccess,createOfferError);
		}catch(OperationError){
			console.log(OperationError);
		}
		
	}
	var sendAnswer=function(){

		try{
			rtcPC.createAnswer(createAnswerSuccess,createAnswerError);
			
		}catch(OperationError){
			console.log(OperationError);
		}
	}
	var reciveOffer=function(sdp){
		rtcPC.setRemoteDescription(sdp);
	}
	var reciveAnswer=function(sdp){
		setRemoteDescription(sdp);
	}
	var receiveSdp=function(sdp){
		var tmpSdp=new RTCSessionDescription(sdp);
		var setRemoteDescriptionSuccess=function(){
			console.log("设置"+tmpSdp.type+"成功");
			if(tmpSdp.type==="offer"){
				sendAnswer();
			}
		};
		var setRemoteDescriptionError=function(error){
			console.log("设置"+tmpSdp.type+"失败\n"+error);
		};
		rtcPC.setRemoteDescription(tmpSdp,setRemoteDescriptionSuccess,setRemoteDescriptionError);
	}
	var receiveCandidate=function(candidate){
		var tmpSdp = new RTCIceCandidate(candidate);
		addIceCandidateSuccess=function(){
			console.log("添加canidate成功");
		};
		addIceCandidateError=function(){
			console.log("添加candidate失败");
		};
		rtcPC.addIceCandidate(tmpSdp,addIceCandidateSuccess,addIceCandidateError);
	}
	var setLocalStream=function(stream){
		localStream=stream;
		ui.createVideoWin2(remoteid);
		//$("#"+remoteid+" .video #localvideo")[0].srcObject=localStream;
		localStream.getTracks().forEach(function(track){
			rtcPC.addTrack(track,localStream);
		});
		$("#"+remoteid+" .video #localvideo")[0].srcObject=localStream;
	}
	var getLocalStream=function(){
		return localStream;
	}
	var getRemoteStream=function(){
		return remoteStream;
	}
	var sendRing=function(){
		console.log("发送通话请求");
		sendToServer({
			"toUser":remoteid,
			"fromUser":myid,
			"createTime":getCurrentTime(),
			"type":"ring",
		})
	}
	var sendStreamReady=function(){
		console.log("发送视频准备就绪");
		sendToServer({
			"toUser":remoteid,
			"fromUser":myid,
			"createTime":getCurrentTime(),
			"type":"ready",
		})
	}
	var sendText=function (){
		console.log("发送文字信息");
		var message=sendBtnClick(myid,remoteid);
		sendToServer({
			"toUser":remoteid,
			"fromUser":myid,
			"createTime":getCurrentTime(),
			"type":"text",
			"text":JSON.stringify(message)
		});
	}
	var receiveText=function (text){
		console.log("收到text信息 "+text);
		var textWin = $(".textContent#"+remoteid);
		if(textWin.length==0){
			ui.createTextWin(remoteid);
		}
		uiReceive(remoteid,text);
		
		
	}
	var hangUp=function(){
		if(rtcPC){
			sendToServer({
			"toUser":remoteid,
			"fromUser":myid,
			"createTime":getCurrentTime(),
			"type":"signal",
			"signal":"hangUp"
			});

		}
		rtcPC.close();
		delEle(remoteid);
	}
	var receiveHangUp=function(){
		rtcPC.close();
		//delEle(remoteid);
	}
	
	var openTextWin = function(){
		ui.createTextWin(remoteid);
	}
	this.sendOffer=sendOffer;
	this.init=init;
	//this.sendAnswer=sendAnswer;
	//this.reciveOffer=reciveOffer;
	//this.reciveAnswer=reciveAnswer;
	this.receiveSdp=receiveSdp;
	this.receiveCandidate=receiveCandidate;
	this.setLocalStream=setLocalStream
	this.getLocalStream=getLocalStream;
	this.getRemoteStream=getRemoteStream;
	this.sendRing=sendRing;
	this.sendStreamReady=sendStreamReady;
	this.rtcPC=rtcPC
	this.sendText=sendText;
	this.receiveText=receiveText;
	this.hangUp=hangUp;
	this.receiveHangUp=receiveHangUp;
	this.openTextWin = openTextWin;

}