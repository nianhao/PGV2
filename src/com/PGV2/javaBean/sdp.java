package com.PGV2.javaBean;

public class sdp extends Message{
	
	String sdp_type;
	String sdp_sdp;
	String sdp;
	public sdp(String toUid, String fromUid, String sendTime, String type, String sdp) {
		super(toUid, fromUid, sendTime, type);
		//this.sdp_type = sdp_type;
		//this.sdp_sdp = sdp_sdp;
		this.sdp=sdp;
	}

	/*public String getSdp_type() {
		return sdp_type;
	}

	public void setSdp_type(String sdp_type) {
		this.sdp_type = sdp_type;
	}

	public String getSdp_sdp() {
		return sdp_sdp;
	}

	public void setSdp_sdp(String sdp_sdp) {
		this.sdp_sdp = sdp_sdp;
	}*/
	public String getSdp() {
		return sdp;
	}

	public void setSdp(String sdp) {
		this.sdp = sdp;
	}


	public String toString(){
		String jsonStr=super.toString();
		jsonStr=jsonStr.substring(0,jsonStr.length()-1);
		jsonStr+=","
				+ "\"sdp\":"+this.sdp+""
				+"}";
		return jsonStr;
	}


}
