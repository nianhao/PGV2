var delEle=function(id){
	$("#"+id).remove();
}
var sendBtnClick=function(uid,remoteId){
	var str=$("div#"+remoteId+" .bottom .currMessage textarea#nowText").val();
	
	var strHeader = uid+" "+getCurrentTime();
	strHeader = strHeader.substring(0,strHeader.indexOf("GMT"));
	/*<P><span class="timeContent">小明 2018/05/18 16:08</span>
	你好
	</P>*/
	var newP=document.createElement("p");
	newP.setAttribute("class","newMsg");
	var newSpan=document.createElement("span")
	newSpan.setAttribute("class", "timeContent")
	newSpan.innerHTML=strHeader;
	newP.append(newSpan);
	newP.append(str);
	var mesContainer = $("div#"+remoteId+" .main div#textMsgC");
	mesContainer.append(newP);
	$("div#"+remoteId+" .bottom .currMessage textarea#nowText").val("");
	$("div#"+remoteId+" .bottom .currMessage textarea#nowText").focus();
	return '<p>'+newP.innerHTML+'</p>';
}
var uiReceive = function(remoteId,text){
	var mesContainer = $("div#"+remoteId+" .main div#textMsgC");
	mesContainer.append(text);
}