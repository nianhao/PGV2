LOGIN_STATE_NOT_LOGIN=0,LOGIN_STATE_LOGINING=1,LOGIN_STATE_LOGINED=2,LOGIN_STATE_RECONNECTING=3,SIGNALING_SDK_VERSION="1.3.2",SIGNALING_SDK_VERSION_INT=1010302e3,Signal_=function(e){function t(e){var t,n,i;for(i=e.length;i;i--)t=Math.floor(Math.random()*i),n=e[i-1],e[i-1]=e[t],e[t]=n}this.getSDKVersion=function(){return SIGNALING_SDK_VERSION},this.getSDKVersion_int=function(){return SIGNALING_SDK_VERSION_INT},this.lbs_url1=["https://lbs-1-sig.agora.io","https://lbs-2-sig.agora.io"],this.lbs_url2=["https://lbs-3-sig.agora.io","https://lbs-4-sig.agora.io"],this.rp_url="https://wsrp-sig.agora.io/",this.vid=e,this.appid=e;var n=this,i=new TextDecoder("utf-8");function s(e,t,n){var i=e.split(t,n),s=0;for(var r in i)s+=t.length+i[r].length;return i.push(e.substr(s)),i}n.server_urls=[],n.setup_debugging=function(e,t){if("ap"===e)n.server_urls.push([t,8001]),n.debugging=!0;else{if("env"!==e)return;"lbs100"===t&&(n.lbs_url1=["https://lbs100-1-sig.agora.io","https://lbs100-2-sig.agora.io"],n.lbs_url2=["https://lbs100-3-sig.agora.io","https://lbs100-4-sig.agora.io"])}},n.setUpDebugging=n.setup_debugging;var r=function(r,o){this.onLoginSuccess="",this.onLoginFailed="",this.onLogout="",this.onInviteReceived="",this.onMessageInstantReceive="";try{"string"!=typeof r&&(r=JSON.stringify(r))}catch(e){return console.error("Invalid account type, should be a string."),void console.error(e)}this.account=r,this.config_msg_set=0,this.config_inst_msg_with_msgid=0,this.debugging=n.debugging,this.m_msgid=0,this.state=LOGIN_STATE_LOGINING,this.line="",this.uid=0,this.dbg=!1,this.alive_conn=2;var a=this;a.lbs_state="requesting",a.lbs_state1="requesting",a.lbs_state1="requesting";var l=n.server_urls.slice();t(l),a.idx=0,this.login_start_time=null,this.login_end_time=null,this.lbs_start_time=null,this.lbs_end_time=null,this.ap_start_time=null,this.ap_end_time=null,a.browser=null;try{a.browser=navigator.userAgent}catch(e){console.log("This browser does not support navigator.userAgent")}a.login_data={event:"login",now:"",time:"",duration:"",key:"",seq:"",result:"",account:"",browser:a.browser,sdk_version:n.getSDKVersion_int(),rmc:"",rmt:"",h1i1:"",h1t1:"",i2:"",i3:"",i3_0:"",i3_0_ip:"",i3_0_port:"",i3_1_ip:"",step:"",t2:"",t4:""},a.v3_msg_set=new Map,setTimeout(function(){var e=Date.now();for(var t of a.v3_msg_set.keys())if(a.v3_msg_set[t]){if(!(e-a.v3_msg_set[t]>3e5))break;a.v3_msg_set.delete(t)}},2e3),a.socket=null;var c=function(){if(a.dbg){var e=[];for(var t in arguments)e.push(arguments[t]);console.log.apply(null,["Agora sig dbg :"].concat(e))}},h=function(e){c("Updating the session state to "+e),a.state=e};a.logout=function(){a.state===LOGIN_STATE_LOGINED&&a.onLogout?a.call2("user_logout",{line:a.line},function(e,t){a.fire_logout(101),a.socket.close()}):a.state===LOGIN_STATE_LOGINING&&(h(LOGIN_STATE_NOT_LOGIN),a.fire_logout(101))},a.fire_login_failed=function(e){try{a.state===LOGIN_STATE_LOGINING&&a.onLoginFailed&&a.onLoginFailed(e)}catch(e){console.error(e)}finally{h(LOGIN_STATE_NOT_LOGIN)}},a.fire_logout=function(e){e||(e=0);try{a.state===LOGIN_STATE_LOGINED&&a.onLogout&&a.onLogout(e)}catch(e){console.error(e)}finally{h(LOGIN_STATE_NOT_LOGIN)}},a.getStatus=function(){return a.state};var f=function(t,i,s){"requesting"==a.lbs_state&&function(e,t,n){var i=new XMLHttpRequest,s=!1,r=setTimeout(function(){s=!0,i.abort(),n("timeout","")},t);i.open("GET",e),i.onerror=function(e){n("GET request error",e)},i.onreadystatechange=function(){4===i.readyState&&(s||(clearTimeout(r),200===i.status&&n("",i.responseText)))},i.send(null)}(i[s]+"/getaddr?vid="+e,5e3,function(e,r){if(e)t-1>0?f(t-1,i,(s+1)%i.length):(n.lbs_url1===i?a.lbs_state1="completed":n.lbs_url2===i&&(a.lbs_state2="completed"),"completed"===a.lbs_state1&&"completed"===a.lbs_state2&&a.fire_login_failed(201));else{if("requesting"!=a.lbs_state)return;a.lbs_state="completed",n.lbs_url1===i?a.lbs_state1="completed":n.lbs_url2===i&&(a.lbs_state2="completed"),l=JSON.parse(r).web,u(),u()}})},u=function(){if(a.state===LOGIN_STATE_LOGINING)var t=new function(){var e,n="wss://"+(e=l[a.idx])[0].replace(/\./g,"-")+"-sig-web.agora.io:"+(e[1]+1)+"/";console.log(n),a.idx=(a.idx+1)%l.length;var s=new WebSocket(n);s.binaryType="arraybuffer",s.state="CONNECTING",setTimeout(function(){s.readyState!==s.CONNECTING||s.close()},6e3),s.onopen=function(e){if(a.state===LOGIN_STATE_NOT_LOGIN)s.close();else if(a.state===LOGIN_STATE_LOGINING&&null===a.socket)for(var n in a.socket=t,s.state="OPEN",c("on conn open"),a.go_login(),h)s.send(JSON.stringify(h[n]));else s.close()},s.onclose=function(e){"OPEN"===s.state&&a.state===LOGIN_STATE_LOGINED?(o("_close",""),c("on conn close")):a.state===LOGIN_STATE_LOGINING?2===a.alive_conn?a.alive_conn-=1:1===a.alive_conn&&a.onLoginFailed&&a.fire_login_failed(201):"CONNECTING"===s.state&&u()},s.onmessage=function(e){var t;if(e.data instanceof ArrayBuffer)try{t=function(e){var t=new Zlib.Inflate(e).decompress();return i.decode(t)}(new Uint8Array(e.data))}catch(e){console.error(e)}else t=e.data;c("Received message ",t);var n=JSON.parse(t),s=n[0];if("close"===s&&a.state===LOGIN_STATE_LOGINING)a.onLoginFailed&&a.fire_login_failed(201);else if("multi"==s)for(var r=0;r<n[1].length;r++){var l=n[1][r];o(l[0],l[1])}else o(n[0],n[1])},s.onerror=function(e){s.state="CLOSED",a.idx<l.length&&e.target.readyState===e.target.CLOSED?u():(c("on conn error"),a.state===LOGIN_STATE_LOGINED&&a.socket===t?a.fire_logout(102):a.state===LOGIN_STATE_LOGINING&&a.socket==t&&a.fire_login_failed(201))};var r={},o=function(e,t){e in r&&r[e](t)},h=[];this.on=function(e,t){r[e]=t},this.emit=function(e,t){0!==s.readyState?(c("Sending ",[e,t]),s.send(JSON.stringify([e,t]))):h.push([e,t])},this.close=function(){s.close()}};var f=0,g=function(){setTimeout(function(){a.state==LOGIN_STATE_LOGINED&&(c("send ping",++f),a.socket.emit("ping",f),g())},1e4)};a.go_login=function(){""===a.line?(a.socket.emit("login",{vid:e,account:r,uid:0,token:o,device:"websdk",ip:""}),a.login_data.account=r,a.login_data.vid=e,a.login_data.key=o,a.socket.on("login_ret",function(e){var t=e[0],i=JSON.parse(e[1]);if(a.login_data.duration=Date.now()-a.login_data.time,c("login ret",t,i),t||"ok"!==i.result){""===t&&(t=i.reason),a.login_data.now=Date.now(),a.login_data.result="failed";try{if(a.onLoginFailed){var s="kick"===t?207:"TokenErrorExpired"===t?204:t.startsWith("TokenError")?206:"wrong account"===t?209:201;a.fire_login_failed(s)}}catch(e){console.error(e)}finally{n.rp_url,a.login_data}}else{a.config_msg_set=i.config_msg_set||0,a.config_inst_msg_with_msgid=i.config_inst_msg_with_msgid||0,a.uid=i.uid,a.line=i.line,h(LOGIN_STATE_LOGINED),a.socket.emit("set_flag",{binary:1}),c("send ping",++f),a.socket.emit("ping",f),g(),S();try{a.login_data.now=Date.now(),a.login_data.result="success",a.onLoginSuccess&&a.onLoginSuccess(a.uid)}catch(s){console.error(s)}finally{n.rp_url,a.login_data,T()}}})):a.socket.emit("line_login",{line:a.line});var t=0,i={},l={};a.call2=function(e,n,s){i[++t]=[e,n,s],c("call ",[e,t,n]),a.socket.emit("call2",[e,t,n])},a.socket.on("call2-ret",function(e){var t=e[0],n=e[1],s=e[2];if(t in i){var r=i[t][2];if(""===n)try{"ok"!=(s=JSON.parse(s)).result&&(n=s.data.result)}catch(e){n="wrong resp:"+s}r&&r(n,s)}});var u,_=function(e,t){return""===e},d=function(e){if(e.startsWith("msg-v2 ")){if(7===(t=s(e," ",6)).length)return[t[1],t[4],t[6]]}else if(e.startsWith("msg-v3 ")){var t;if(8===(t=s(e," ",7)).length)return a.v3_msg_set.get(t[1])?null:(a.v3_msg_set.set(t[1],Date.now()),[t[2],t[5],t[7]])}return null};a.socket.on("pong",function(e){c("recv pong")}),a.socket.on("close",function(e){a.fire_logout(102),a.socket.close()}),a.socket.on("_close",function(e){a.fire_logout(102)});var v=function(e){if(e){var t=e,n=t[0],i=t[1],s=t[2];if("instant"===i)try{a.onMessageInstantReceive&&a.onMessageInstantReceive(n,0,s)}catch(e){console.error(e)}if(i.startsWith("voip_")){var r,o=JSON.parse(s),c=o.channel,h=o.peer,f=o.extra;if("voip_invite"===i)r=new A(c,h,f),a.call2("voip_invite_ack",{line:a.line,channelName:c,peer:h,extra:""});else if(!(r=l[c+h]))return;if("voip_invite"===i)try{a.onInviteReceived&&a.onInviteReceived(r)}catch(e){console.error(e)}if("voip_invite_ack"===i)try{r.onInviteReceivedByPeer&&r.onInviteReceivedByPeer(f)}catch(e){console.error(e)}if("voip_invite_accept"===i)try{r.onInviteAcceptedByPeer&&r.onInviteAcceptedByPeer(f)}catch(e){console.error(e)}if("voip_invite_refuse"===i)try{r.onInviteRefusedByPeer&&r.onInviteRefusedByPeer(f)}catch(e){console.error(e)}if("voip_invite_failed"===i)try{r.onInviteFailed&&r.onInviteFailed(f)}catch(e){console.error(e)}if("voip_invite_bye"===i)try{r.onInviteEndByPeer&&r.onInviteEndByPeer(f)}catch(e){console.error(e)}if("voip_invite_msg"===i)try{r.onInviteMsg&&r.onInviteMsg(f)}catch(e){console.error(e)}}}},p=function(){return Date.now()},m=0,y=0,b=0,I=0,N=!1,w=[],O=0,T=function(){N||(N=!0,O=0,0===a.config_msg_set?a.call2("user_getmsg",{line:a.line,ver_clear:m,max:30},function(e,t){if(""===e){var n=t,i=m;for(var s in b=parseInt(n.ver_clear),m=Math.max(b,i),n.msgs){var r=n.msgs[s][0],o=n.msgs[s][1];r>=m+1&&(v(d(o)),m=r)}(30===n.msgs.length||m<y)&&T(),p()}N=!1,I=p()}):1===a.config_msg_set&&a.call2("user_getmsg2",{line:a.line,clear_msgs:w,max:30},function(e,t){if(""===e){for(var n in w=[],t.msgs){t.msgs[n][0];var i=t.msgs[n][1];v(d(i))}t.msgs.length>=30&&T(),p()}N=!1,I=p()}))},L=function(){0===a.config_msg_set?I=p():1===a.config_msg_set&&0===O&&(O=p()+500)},S=function(){setTimeout(function(){if(a.state!==LOGIN_STATE_NOT_LOGIN){if(a.state===LOGIN_STATE_LOGINED){var e=p();0===a.config_msg_set?b<m&&e-I>1e3?T():e-I>=6e4&&T():1===a.config_msg_set&&w.length>0&&e>O&&O>0&&T()}S()}},100)};a.socket.on("notify",function(e){c("recv notify ",e),"string"==typeof e&&(e=(e=s(e," ",2)).slice(1));var t=e[0];if("channel2"===t){var n=e[1],i=e[2];if(0===a.config_msg_set&&0!==u.m_channel_msgid&&u.m_channel_msgid+1>i)return void c("ignore channel msg",n,i,u.m_channel_msgid);u.m_channel_msgid=i;var r=d(e[3]);if(r){r[0];var o=r[1],l=r[2],h=JSON.parse(l);if("channel_msg"===o)try{u.onMessageChannelReceive&&u.onMessageChannelReceive(h.account,h.uid,h.msg)}catch(e){console.error(e)}if("channel_user_join"===o)try{u.onChannelUserJoined&&u.onChannelUserJoined(h.account,h.uid)}catch(e){console.error(e)}if("channel_user_leave"===o)try{u.onChannelUserLeaved&&u.onChannelUserLeaved(h.account,h.uid)}catch(e){console.error(e)}if("channel_attr_update"===o)try{u.onChannelAttrUpdated&&u.onChannelAttrUpdated(h.name,h.value,h.type)}catch(e){console.error(e)}}}if("msg"===t&&(y=e[1],T()),"recvmsg"===t){var f=JSON.parse(e[1]),g=f[0],_=f[1];g===m+1?(v(d(_)),m=g,L()):(y=g,T())}if("recvmsg_by_msgid"===t){i=s(e[1]," ",7)[1];w.push(i),v(d(e[1])),L()}}),a.messageInstantSend=function(e,t,n){var i={line:a.line,peer:e,flag:"v1:E:3600",t:"instant",content:t};if(1===a.config_inst_msg_with_msgid){var s=null;if("string"==typeof t)try{s=JSON.parse(t).msgid}catch(e){c("passed in message is not a JSON string")}i.messageID=s||p()%1e6+a.m_msgid++%1e6}a.call2("user_sendmsg",i,function(e,t){n&&n(!_(e))})},a.invoke=function(e,t,n){if(e.startsWith("io.agora.signal.")){var i=e.split(".")[3];t.line=a.line,a.call2(i,t,function(e,t){n&&n(e,t)})}};var A=function(e,t,n){this.onInviteReceivedByPeer="",this.onInviteAcceptedByPeer="",this.onInviteRefusedByPeer="",this.onInviteFailed="",this.onInviteEndByPeer="",this.onInviteEndByMyself="",this.onInviteMsg="";var i=this;this.channelName=e,this.peer=t,this.extra=n,l[e+t]=i,this.channelInviteUser2=function(){n=n||"",a.call2("voip_invite",{line:a.line,channelName:e,peer:t,extra:n},function(e,t){if(_(e));else try{i.onInviteFailed(e)}catch(e){console.error(e)}})},this.channelInviteAccept=function(n){n=n||"",a.call2("voip_invite_accept",{line:a.line,channelName:e,peer:t,extra:n})},this.channelInviteRefuse=function(n){n=n||"",a.call2("voip_invite_refuse",{line:a.line,channelName:e,peer:t,extra:n})},this.channelInviteDTMF=function(n){a.call2("voip_invite_msg",{line:a.line,channelName:e,peer:t,extra:JSON.stringify({msgtype:"dtmf",msgdata:n})})},this.channelInviteEnd=function(n){n=n||"",a.call2("voip_invite_bye",{line:a.line,channelName:e,peer:t,extra:n});try{i.onInviteEndByMyself&&i.onInviteEndByMyself("")}catch(e){console.error(e)}}};a.channelInviteUser2=function(e,t,n){var i=new A(e,t,n);return i.channelInviteUser2(),i},a.channelJoin=function(e){try{"string"!=typeof e&&(e=JSON.stringify(e))}catch(e){return console.error("Invalid channel name type, should be a string."),void console.error(e)}if(a.state==LOGIN_STATE_LOGINED)return u=new function(){this.onChannelJoined="",this.onChannelJoinFailed="",this.onChannelLeaved="",this.onChannelUserList="",this.onChannelUserJoined="",this.onChannelUserLeaved="",this.onChannelUserList="",this.onChannelAttrUpdated="",this.onMessageChannelReceive="",this.name=e,this.state="joining",this.m_channel_msgid=0,this.messageChannelSend=function(t,n){var i={line:a.line,name:e,msg:t};if(1===a.config_inst_msg_with_msgid){var s=null;if("string"==typeof t)try{s=JSON.parse(t).msgid}catch(e){c("passed in message is not a JSON string.")}i.msgID=s||p()%1e6+a.m_msgid++%1e6}a.call2("channel_sendmsg",i,function(e,t){n&&n()})},this.channelLeave=function(t){a.call2("channel_leave",{line:a.line,name:e},function(e,n){if(u.state="leaved",t)t();else try{u.onChannelLeaved&&u.onChannelLeaved(0)}catch(e){console.error(e)}})},this.channelSetAttr=function(t,n,i){a.call2("channel_set_attr",{line:a.line,channel:e,name:t,value:n},function(e,t){i&&i()})},this.channelDelAttr=function(t,n){a.call2("channel_del_attr",{line:a.line,channel:e,name:t},function(e,t){n&&n()})},this.channelClearAttr=function(t){a.call2("channel_clear_attr",{line:a.line,channel:e},function(e,n){t&&t()})}},a.call2("channel_join",{line:a.line,name:e},function(e,t){if(""===e){u.state="joined";try{u.onChannelJoined&&u.onChannelJoined()}catch(e){console.error(e)}var n=t;try{u.onChannelUserList&&u.onChannelUserList(n.list)}catch(e){console.error(e)}try{if(u.onChannelAttrUpdated)for(var i in n.attrs)u.onChannelAttrUpdated(i,n.attrs[i],"update")}catch(e){console.error(e)}}else try{u.onChannelJoinFailed&&u.onChannelJoinFailed(e)}catch(e){console.error(e)}}),u;c("You should log in first.")}}};a.socket=null,a.debugging?(a.lbs_state="completed",a.login_data.time=Date.now(),u()):(t(n.lbs_url1),t(n.lbs_url2),f(2,n.lbs_url1,0),f(2,n.lbs_url2,0))};this.login=function(e,t){return new r(e,t)}},Signal=function(e){return new Signal_(e)},window.ZlibBak=window.ZLib,function(){"use strict";var e=void 0,t=this;function n(n,i){var s,r=n.split("."),o=t;!(r[0]in o)&&o.execScript&&o.execScript("var "+r[0]);for(;r.length&&(s=r.shift());)r.length||i===e?o=o[s]?o[s]:o[s]={}:o[s]=i}var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;function s(e){var t,n,s,r,o,a,l,c,h,f,u=e.length,g=0,_=Number.POSITIVE_INFINITY;for(c=0;c<u;++c)e[c]>g&&(g=e[c]),e[c]<_&&(_=e[c]);for(t=1<<g,n=new(i?Uint32Array:Array)(t),s=1,r=0,o=2;s<=g;){for(c=0;c<u;++c)if(e[c]===s){for(a=0,l=r,h=0;h<s;++h)a=a<<1|1&l,l>>=1;for(f=s<<16|c,h=a;h<t;h+=o)n[h]=f;++r}++s,r<<=1,o<<=1}return[n,g,_]}function r(e,t){switch(this.g=[],this.h=32768,this.d=this.f=this.a=this.l=0,this.input=i?new Uint8Array(e):e,this.m=!1,this.i=a,this.r=!1,!t&&(t={})||(t.index&&(this.a=t.index),t.bufferSize&&(this.h=t.bufferSize),t.bufferType&&(this.i=t.bufferType),t.resize&&(this.r=t.resize)),this.i){case o:this.b=32768,this.c=new(i?Uint8Array:Array)(32768+this.h+258);break;case a:this.b=0,this.c=new(i?Uint8Array:Array)(this.h),this.e=this.z,this.n=this.v,this.j=this.w;break;default:throw Error("invalid inflate mode")}}var o=0,a=1,l={t:o,s:a};r.prototype.k=function(){for(;!this.m;){var t=S(this,3);switch(1&t&&(this.m=!0),t>>>=1){case 0:var n=this.input,r=this.a,l=this.c,c=this.b,h=n.length,f=e,g=l.length,_=e;if(this.d=this.f=0,r+1>=h)throw Error("invalid uncompressed block header: LEN");if(f=n[r++]|n[r++]<<8,r+1>=h)throw Error("invalid uncompressed block header: NLEN");if(f===~(n[r++]|n[r++]<<8))throw Error("invalid uncompressed block header: length verify");if(r+f>n.length)throw Error("input buffer is broken");switch(this.i){case o:for(;c+f>l.length;){if(f-=_=g-c,i)l.set(n.subarray(r,r+_),c),c+=_,r+=_;else for(;_--;)l[c++]=n[r++];this.b=c,l=this.e(),c=this.b}break;case a:for(;c+f>l.length;)l=this.e({p:2});break;default:throw Error("invalid inflate mode")}if(i)l.set(n.subarray(r,r+f),c),c+=f,r+=f;else for(;f--;)l[c++]=n[r++];this.a=r,this.b=c,this.c=l;break;case 1:this.j(O,L);break;case 2:var d,v,p,m,y=S(this,5)+257,b=S(this,5)+1,I=S(this,4)+4,N=new(i?Uint8Array:Array)(u.length),w=e,T=e,E=e,G=e,k=e;for(k=0;k<I;++k)N[u[k]]=S(this,3);if(!i)for(k=I,I=N.length;k<I;++k)N[u[k]]=0;for(d=s(N),w=new(i?Uint8Array:Array)(y+b),k=0,m=y+b;k<m;)switch(T=A(this,d),T){case 16:for(G=3+S(this,2);G--;)w[k++]=E;break;case 17:for(G=3+S(this,3);G--;)w[k++]=0;E=0;break;case 18:for(G=11+S(this,7);G--;)w[k++]=0;E=0;break;default:E=w[k++]=T}v=s(i?w.subarray(0,y):w.slice(0,y)),p=s(i?w.subarray(y):w.slice(y)),this.j(v,p);break;default:throw Error("unknown BTYPE: "+t)}}return this.n()};var c,h,f=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],u=i?new Uint16Array(f):f,g=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],_=i?new Uint16Array(g):g,d=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],v=i?new Uint8Array(d):d,p=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],m=i?new Uint16Array(p):p,y=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],b=i?new Uint8Array(y):y,I=new(i?Uint8Array:Array)(288);for(c=0,h=I.length;c<h;++c)I[c]=143>=c?8:255>=c?9:279>=c?7:8;var N,w,O=s(I),T=new(i?Uint8Array:Array)(30);for(N=0,w=T.length;N<w;++N)T[N]=5;var L=s(T);function S(e,t){for(var n,i=e.f,s=e.d,r=e.input,o=e.a,a=r.length;s<t;){if(o>=a)throw Error("input buffer is broken");i|=r[o++]<<s,s+=8}return n=i&(1<<t)-1,e.f=i>>>t,e.d=s-t,e.a=o,n}function A(e,t){for(var n,i,s=e.f,r=e.d,o=e.input,a=e.a,l=o.length,c=t[0],h=t[1];r<h&&!(a>=l);)s|=o[a++]<<r,r+=8;if((i=(n=c[s&(1<<h)-1])>>>16)>r)throw Error("invalid code length: "+i);return e.f=s>>i,e.d=r-i,e.a=a,65535&n}function E(e,t){var n,i;switch(this.input=e,this.a=0,!t&&(t={})||(t.index&&(this.a=t.index),t.verify&&(this.A=t.verify)),n=e[this.a++],i=e[this.a++],15&n){case G:this.method=G;break;default:throw Error("unsupported compression method")}if(0!=((n<<8)+i)%31)throw Error("invalid fcheck flag:"+((n<<8)+i)%31);if(32&i)throw Error("fdict flag is not supported");this.q=new r(e,{index:this.a,bufferSize:t.bufferSize,bufferType:t.bufferType,resize:t.resize})}r.prototype.j=function(e,t){var n=this.c,i=this.b;this.o=e;for(var s,r,o,a,l=n.length-258;256!==(s=A(this,e));)if(256>s)i>=l&&(this.b=i,n=this.e(),i=this.b),n[i++]=s;else for(a=_[r=s-257],0<v[r]&&(a+=S(this,v[r])),s=A(this,t),o=m[s],0<b[s]&&(o+=S(this,b[s])),i>=l&&(this.b=i,n=this.e(),i=this.b);a--;)n[i]=n[i++-o];for(;8<=this.d;)this.d-=8,this.a--;this.b=i},r.prototype.w=function(e,t){var n=this.c,i=this.b;this.o=e;for(var s,r,o,a,l=n.length;256!==(s=A(this,e));)if(256>s)i>=l&&(l=(n=this.e()).length),n[i++]=s;else for(a=_[r=s-257],0<v[r]&&(a+=S(this,v[r])),s=A(this,t),o=m[s],0<b[s]&&(o+=S(this,b[s])),i+a>l&&(l=(n=this.e()).length);a--;)n[i]=n[i++-o];for(;8<=this.d;)this.d-=8,this.a--;this.b=i},r.prototype.e=function(){var e,t,n=new(i?Uint8Array:Array)(this.b-32768),s=this.b-32768,r=this.c;if(i)n.set(r.subarray(32768,n.length));else for(e=0,t=n.length;e<t;++e)n[e]=r[e+32768];if(this.g.push(n),this.l+=n.length,i)r.set(r.subarray(s,s+32768));else for(e=0;32768>e;++e)r[e]=r[s+e];return this.b=32768,r},r.prototype.z=function(e){var t,n,s,r=this.input.length/this.a+1|0,o=this.input,a=this.c;return e&&("number"==typeof e.p&&(r=e.p),"number"==typeof e.u&&(r+=e.u)),2>r?n=(s=(o.length-this.a)/this.o[2]/2*258|0)<a.length?a.length+s:a.length<<1:n=a.length*r,i?(t=new Uint8Array(n)).set(a):t=a,this.c=t},r.prototype.n=function(){var e,t,n,s,r,o=0,a=this.c,l=this.g,c=new(i?Uint8Array:Array)(this.l+(this.b-32768));if(0===l.length)return i?this.c.subarray(32768,this.b):this.c.slice(32768,this.b);for(t=0,n=l.length;t<n;++t)for(s=0,r=(e=l[t]).length;s<r;++s)c[o++]=e[s];for(t=32768,n=this.b;t<n;++t)c[o++]=a[t];return this.g=[],this.buffer=c},r.prototype.v=function(){var e,t=this.b;return i?this.r?(e=new Uint8Array(t)).set(this.c.subarray(0,t)):e=this.c.subarray(0,t):(this.c.length>t&&(this.c.length=t),e=this.c),this.buffer=e},E.prototype.k=function(){var e,t,n=this.input;if(e=this.q.k(),this.a=this.q.a,this.A){t=(n[this.a++]<<24|n[this.a++]<<16|n[this.a++]<<8|n[this.a++])>>>0;var i=e;if("string"==typeof i){var s,r,o=i.split("");for(s=0,r=o.length;s<r;s++)o[s]=(255&o[s].charCodeAt(0))>>>0;i=o}for(var a,l=1,c=0,h=i.length,f=0;0<h;){h-=a=1024<h?1024:h;do{c+=l+=i[f++]}while(--a);l%=65521,c%=65521}if(t!==(c<<16|l)>>>0)throw Error("invalid adler-32 checksum")}return e};var G=8;n("Zlib.Inflate",E),n("Zlib.Inflate.prototype.decompress",E.prototype.k);var k,C,U,D,x={ADAPTIVE:l.s,BLOCK:l.t};if(Object.keys)k=Object.keys(x);else for(C in k=[],U=0,x)k[U++]=C;for(U=0,D=k.length;U<D;++U)n("Zlib.Inflate.BufferType."+(C=k[U]),x[C])}.call(this),Signal.Zlib=window.Zlib,delete window.Zlib,window.ZlibBak&&(window.Zlib=window.ZlibBak),delete window.ZlibBak;