 package com.PGV2.websocket;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.PGV2.javaBean.Message;
import com.PGV2.javaBean.Text;
import com.PGV2.javaBean.candidate;
import com.PGV2.javaBean.sdp;

@ServerEndpoint("/webSocketServer/{uid}")
public class WebSocketServer {
	public static Map<String,Session> uid_session=Collections.synchronizedMap(new HashMap<String,Session>());
	
	@OnOpen
	public void onOpen(Session session,@PathParam("uid")String uid){
		
		System.out.println("�µ��û�ע��"+uid);
		uid_session.put(uid,session);
		//transmitMessage(uid,"ע��ɹ�");
	}
	@OnClose
	public void onClose(Session session, @PathParam("uid")String uid){
		
		System.out.println(uid+" ע����websocket������");
		Session closeSession=uid_session.get(uid);
		try {
			closeSession.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		uid_session.remove(uid);
		System.out.println(uid+"�Ѿ���ɾ��");
	}
	
	public static void transmitMessage(String toUid,String message){
		
		Session toSession=uid_session.get(toUid);
		if(toSession.equals(null)){
			System.out.println("û������û���"+toUid);
			return;
		}
		if(toSession.isOpen()){
			toSession.getAsyncRemote().sendText(message);
		}else{
			System.out.println(toUid+" �Ѿ��ر��˺ͷ�����������");
		}
		
	}
	public static void transmitMessage(sdp tmpsdp) {
		// TODO Auto-generated method stub
		String toUid = tmpsdp.getToUid();
		Session toSession=uid_session.get(toUid);
		if(toSession.equals(null)){
			System.out.println("û������û���"+toUid);
			return;
		}
		if(toSession.isOpen()){
			toSession.getAsyncRemote().sendText(tmpsdp.toString());
		}else{
			System.out.println(toUid+" �Ѿ��ر��˺ͷ�����������");
		}
		
	}
	public static void transmitMessage(candidate tmpcandidate) {
		// TODO Auto-generated method stub
		String toUid = tmpcandidate.getToUid();
		Session toSession=uid_session.get(toUid);
		if(toSession.equals(null)){
			System.out.println("û������û���"+toUid);
			return;
		}
		if(toSession.isOpen()){
			toSession.getAsyncRemote().sendText(tmpcandidate.toString());
		}else{
			System.out.println(toUid+" �Ѿ��ر��˺ͷ�����������");
		}
		
	}
	public static void transmitMessage(Text text) {
		// TODO Auto-generated method stub
		String toUid = text.getToUid();
		Session toSession=uid_session.get(toUid);
		if(toSession.equals(null)){
			System.out.println("û������û���"+toUid);
			return;
		}
		if(toSession.isOpen()){
			toSession.getAsyncRemote().sendText(text.toString());
		}else{
			System.out.println(toUid+" �Ѿ��ر��˺ͷ�����������");
		}
	}
	public static void transmitMessage(Message Mes) {
		// TODO Auto-generated method stub
		String toUid = Mes.getToUid();
		Session toSession=uid_session.get(toUid);
		if(toSession.equals(null)){
			System.out.println("û������û���"+toUid);
			return;
		}
		if(toSession.isOpen()){
			toSession.getAsyncRemote().sendText(Mes.toString());
		}else{
			System.out.println(toUid+" �Ѿ��ر��˺ͷ�����������");
		}
	}
}