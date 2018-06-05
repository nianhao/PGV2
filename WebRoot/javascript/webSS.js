var webSS=function(uId){
	var webSocketHost='192.168.0.107/PGV2/'
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
	/*
	 * 心跳重连
	 */
	var heartCheck = {
		    timeout: 60000,//60ms
		    timeoutObj: null,
		    serverTimeoutObj: null,
		    reset: function(){
		        clearTimeout(this.timeoutObj);
		        clearTimeout(this.serverTimeoutObj);
		　　　　 this.start();
		    },
		    start: function(){
		        var self = this;
		        this.timeoutObj = setTimeout(function(){
		            window.socket.send("HeartBeat");
		            //self.serverTimeoutObj = setTimeout(function(){
		              //  ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
		            //}, self.timeout)
		        }, this.timeout)
		    },
		}
	uid=uId;
	socket=new WebSocket("wss://"+webSocketHost+serverEndPoint+uid);
	socket.onopen=onOpen;
	socket.onclose=onClose;
	socket.onmessage=onMessage;
	socket.onerror=onError;
	
	
}