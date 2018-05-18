package com.PGV2.javaBean;

public class candidate extends Message  {
	String candidate_candidate;
	String candidate_sdpMid;
	String candidate_sdpMLineIndex;
	String candidate;
	
	public candidate(String toUid, String fromUid, String sendTime, String type, String candidate) {
		super(toUid, fromUid, sendTime, type);
		this.candidate=candidate;
		//this.candidate_candidate = candidate_candidate;
		//this.candidate_sdpMid = candidate_sdpMid;
		//this.candidate_sdpMLineIndex = candidate_sdpMLineIndex;
	}
	
	public String getCandidate() {
		return candidate;
	}

	public void setCandidate(String candidate) {
		this.candidate = candidate;
	}

	public String toString(){
		String jsonStr=super.toString();
		jsonStr=jsonStr.substring(0,jsonStr.length()-1);
		jsonStr+=","
				+ "\"candidate\":"+this.candidate
				+"}";
		return jsonStr;
	}
	
}
