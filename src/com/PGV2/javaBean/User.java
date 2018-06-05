package com.PGV2.javaBean;

public class User {
	private int id;
	private String userName;
	private String userPwd;
	private String role;
	private String showName;
	private int login;
	public User( String userName, String userPwd, String showName,String role, int login) {
		this.userName = userName;
		this.userPwd = userPwd;
		this.role = role;
		this.login = login;
		this.showName=showName;
	}
	public User() {
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPwd() {
		return userPwd;
	}
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public int getLogin() {
		return login;
	}
	public void setLogin(int login) {
		this.login = login;
	}
	public String getShowName() {
		return showName;
	}
	public void setShowName(String showName) {
		this.showName = showName;
	}
	
	
}
