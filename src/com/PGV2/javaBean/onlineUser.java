package com.PGV2.javaBean;

public class onlineUser {
	
	private int id;
	private int userId;
	private String userName;
	private String loginTime;
	private String showName;
	private double loginx;
	private double loginy;
	public onlineUser() {
		super();
		// TODO Auto-generated constructor stub
	}
	public onlineUser( int userid, String userName, String showName,String userLoginTime, double logx, double logy) {
		super();
		this.userId = userid;
		this.userName = userName;
		this.loginTime = userLoginTime;
		this.loginx = logx;
		this.loginy = logy;
		this.showName=showName;
	}
	public onlineUser(User tmpUser,String loginTime,double loginx,double longy){
		this.userId = tmpUser.getId();
		this.userName = tmpUser.getUserName();
		this.showName = tmpUser.getShowName();
		this.loginTime = loginTime;
		this.loginx = loginx;
		this.loginy = longy;
	}
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userid) {
		this.userId = userid;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getloginTime() {
		return loginTime;
	}
	public void setloginTime(String userLoginTime) {
		this.loginTime = userLoginTime;
	}
	public double getLoginx() {
		return loginx;
	}
	public void setLoginx(double logx) {
		this.loginx = logx;
	}
	public double getLoginy() {
		return loginy;
	}
	public void setLoginy(double logy) {
		this.loginy = logy;
	}
	public String getShowName() {
		return showName;
	}
	public void setShowName(String showName) {
		this.showName = showName;
	}
	
	public String toJsonStr(){
		String str = "";
		
		str+="{"
				+"\"id\":\""+this.id+"\","
				+"\"userId\":\""+this.userId+"\","
				+"\"userName\":\""+this.userName+"\","
				+"\"showName\":\""+this.showName+"\","
				+"\"loginTime\":\""+this.loginTime+"\","
				+"\"loginx\":\""+this.loginx+"\","
				+"\"loginy\":\""+this.loginy+"\""
				+ "}";
		return str;
	}
	
}
