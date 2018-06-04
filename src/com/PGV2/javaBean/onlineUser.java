package com.PGV2.javaBean;

public class onlineUser {
	
	private int id;
	private int userId;
	private String userName;
	private String loginTime;
	private double loginx;
	private double loginy;
	public onlineUser() {
		super();
		// TODO Auto-generated constructor stub
	}
	public onlineUser( int userid, String userName, String userLoginTime, double logx, double logy) {
		super();
		this.userId = userid;
		this.userName = userName;
		this.loginTime = userLoginTime;
		this.loginx = logx;
		this.loginy = logy;
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
	
}
