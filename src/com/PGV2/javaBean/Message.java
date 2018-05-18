package com.PGV2.javaBean;

public class Message {
	
	String toUid;
	String toUName;
	String fromUid;
	String fromUName;
	String sendTime;
	String type;
	
	public Message(String toUid, String fromUid, String sendTime, String type) {
		//super();
		this.toUid = toUid;
		this.fromUid = fromUid;
		this.sendTime = sendTime;
		this.type = type;
	}
	public String getToUid() {
		return toUid;
	}
	public void setToUid(String toUid) {
		this.toUid = toUid;
	}
	public String getToUName() {
		return toUName;
	}
	public void setToUName(String toUName) {
		this.toUName = toUName;
	}
	public String getFromUid() {
		return fromUid;
	}
	public void setFromUid(String fromUid) {
		this.fromUid = fromUid;
	}
	public String getFromUName() {
		return fromUName;
	}
	public void setFromUName(String fromUName) {
		this.fromUName = fromUName;
	}
	public String getSendTime() {
		return sendTime;
	}
	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}
	public String getContens() {
		return type;
	}
	public void setContens(String type) {
		this.type = type;
	}
	
	public String toString(){
		
		String jsonStr="";
		jsonStr+="{"
				+"\"fromUid\":\""+this.fromUid+"\","
				+"\"fromUName\":\""+this.fromUName+"\","
				+"\"toUid\":\""+this.toUid+"\","
				+"\"toUName\":\""+this.toUName+"\","
				+"\"sendTime\":\""+this.sendTime+"\","
				+"\"type\":\""+this.type+"\""
				+ "}";
		return jsonStr;
		
	}
}
