package com.PGV2.servlet;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.PGV2.DAO.manageOnlineUser;
import com.PGV2.javaBean.onlineUser;

/**
 * Servlet implementation class updateOnlineUser
 */
@WebServlet("/updateOnlineUser")
public class updateOnlineUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public updateOnlineUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		response.setCharacterEncoding("utf-8");
		Writer pWriter = response.getWriter();
		
		manageOnlineUser onlineUserDao = new manageOnlineUser();
		
		List onlineUsers =null;
		
		onlineUsers = onlineUserDao.listUsers();
		
		String users = "{\"users\":[";
		for(int i=0;i<onlineUsers.size();i++){
			onlineUser tmpOnlineUser = (onlineUser)onlineUsers.get(i);
			users+=tmpOnlineUser.toJsonStr()+",";
			System.out.println("读取在线用户： " +tmpOnlineUser.toJsonStr());
		}
		users = users.substring(0,users.length()-1);
		users+="]}";
		pWriter.write(users);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
