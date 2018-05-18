$(document).ready(function(){

	$('.reg').click(function(){
		console.log("one click on enter");
		var uid=$(this).attr("uid");
		socket=new webSS(uid);
	});
	
	$('.call').click(function(){
		console.log("发起呼叫");
		var uid=$(this).attr('uid');
		var remoteuid=$(this).attr('remoteid');
	    var pc=getPC(uid,remoteuid);
	    //Pc(uid,remoteid);
	    //uid_pc_Map.set(uid,pc);
	    if(window.stream==null){
	    	openLocalStream(pc);
	    }else{
	    	pc.setLocalStream(window.stream);
	    }
	});
	$('.start').click(function(){
		var uid=$(this).attr('uid');
		var remoteuid=$(this).attr('remoteid');
		var pc=getPC(uid,remoteuid);
		pc.sendOffer();
	});
	
});
