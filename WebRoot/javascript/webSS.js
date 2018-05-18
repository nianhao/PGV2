var webSS=function(uId){
	var webSocketHost='127.0.0.1/PGV2/'
	var serverEndPoint='webSocketServer/'
	var uid=null;
	var socket=null;
	var onOpen=function(){
		console.log(uid+" 成功注册websocket服务器");
	}
	var onClose=function(){
		if(socket!=null&&uid!=null){
			socket=new WebSocket("wss://"+webSocketHost+serverEndPoint+uid);
			
		}
	}
	var onMessage=function(event){
		if(event.data){
			analysisMessage(event.data);
		}
	}
	var onError=function(error){
		console.log(error);
	}
	uid=uId;
	socket=new WebSocket("wss://"+webSocketHost+serverEndPoint+uid);
	socket.onopen=onOpen;
	socket.onclose=onClose;
	socket.onmessage=onMessage;
	socket.onerror=onError;
	
	
}