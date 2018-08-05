/**
 * 
 */
var ClientController = function(uid){
	
	var uid=uid;
	var channel;
	var signal = Signal("db989784e19242ddb7fd7fff69c76059");
	var session = signal.login(uid,"_no_need_token");
	session.onLoginSuccess = function(){
		console.log("登录成功");
	}
	session.onLoginFailed = function(error){
		console.log("登录失败:",error);
	}
	session.onLogout = function(){
		console.log(uid+"下线了");
	}
	var login = function(){
		if(session){
			session.logout();
		}
		var session = signal.login(uid,"_no_need_token");
		session.onLoginSuccess = function(){
			console.log("登录成功");
		}
		session.onLoginFailed = function(error){
			console.log("登录失败:",error);
		}
		session.onLogout = function(){
			console.log(uid+"下线了");
		}
	}
	var sendMsg = function(uid,msg){
		session.messageInstantSend(uid, msg, function(){
			console.log("已发送");
		});
	}
	
	var queryUserState = function(uid){
		session.invoke('io.agora.signal.user_query_user_status',{uid},function(err,val){
			if(val.status==1){
				return "online";
			}else{
				return "offline";
			}
		});
		
	}
	var setUserAttribute=function(name,value){
		session.invoke('io.agora.signal.user_set_attr',{name,value},function(err,val){
			if(err){
				console.log(err.reason);
			}else{
				console.log("set "+name+"= "+value+"on "+uid);
			}
		});
	}
	var getUserAttribute = function(account,name){
		session.invoke('io.agora.signal.user_get_attr',{account,name},function(err,val){
			if(err){
				consloe.log(err.reason);
			}else{
				console.log(val.value);
				return val.value;
			}
		});
	}
	var getUserAllAttribute = function(account){
		session.invoke('io.agora.signal.user_get_attr_all',{account},function(err,val){
			if(val.reason){
				consloe.log(val.reason);
			}else{
				console.log(val.json);
				return val.json;
			}
		});
	}
	var getChannelUserlist = function(name){
		session.invoke('io.agora.signal.channel_query_userlist',{name},function(err,val){
			if(err){
				console.log(err);
			}else{
				console.log(val.num,val.list);
				return [val.num,val.list];
			}
		});
	}
	var joinChannel = function(channelName){
		console.log("加入",channelName);
		if(session){
			session.channelJoin(channelName);
		}else{
			console.log("没有登录");
		}
	}
	this.queryUserState = queryUserState;
	this.setUserAttribute = setUserAttribute;
	this.getUserAttribute = getUserAttribute;
	this.getUserAllAttribute =getUserAllAttribute;
    this.joinChannel = joinChannel;
	
}