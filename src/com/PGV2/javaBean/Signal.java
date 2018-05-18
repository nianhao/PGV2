package com.PGV2.javaBean;

public class Signal extends Message{
	String signal=null;
	public Signal(String toUid, String fromUid, String sendTime, String type, String signal) {
		super(toUid, fromUid, sendTime, type);
		// TODO Auto-generated constructor stub
		this.signal=signal;
	}
	public String toString(){
		String jsonStr=super.toString();
		jsonStr=jsonStr.substring(0,jsonStr.length()-1);
		jsonStr+=","
				+ "\"signal\":"+this.signal+""
				+"}";
		return jsonStr;
	}

	
}
