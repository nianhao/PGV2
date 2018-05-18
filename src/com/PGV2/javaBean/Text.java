package com.PGV2.javaBean;

public class Text extends Message{
	String text="";
	public Text(String toUid, String fromUid, String sendTime, String type,String text) {
		super(toUid, fromUid, sendTime, type);
		// TODO Auto-generated constructor stub
		this.text=text;
		
	}
	public String toString(){
		String jsonStr=super.toString();
		jsonStr=jsonStr.substring(0,jsonStr.length()-1);
		jsonStr+=","
				+ "\"text\":"+this.text
				+"}";
		return jsonStr;
	}

	
	
}
