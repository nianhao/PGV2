package com.PGV2.servlet;

import java.io.IOException;
import java.io.Writer;
import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionContext;

import com.PGV2.DAO.manageUser;
import com.PGV2.javaBean.User;

/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
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
		Writer pw = response.getWriter();
		HttpSession session = request.getSession();
		String userName = request.getParameter("userName").trim();
		String userPwd = request.getParameter("userPwd").trim();
		String code = request.getParameter("code").trim();
		String checkCode = (String) session.getAttribute("check_code");
		//验证验证码是否正确
		if(!code.equals(checkCode)){
			System.out.println("验证码错误，系统生成的验证码是 "+checkCode+"  用户输入的是："+code);
			//pw.write("{\"state\":\"error\",\"message\":\"验证码错误！\"}");
			//return;
		}
		System.out.println(userName+" "+userPwd);
		manageUser userDao = new manageUser();
		System.out.println("****************接收到的数据是：************\n"+userName+"  "+userPwd);
		User tmpUser = userDao.getUserByValid(userName, userPwd);
		if(tmpUser==null||tmpUser.equals(null)){
			System.out.println("用户名或密码错误");
			//返回错误信息
			pw.write("{\"state\":\"error\",\"message\":\"用户名或密码错误！\"}");
		}else{
			System.out.println("登录成功");
			//更新用户在线状态
			tmpUser.setLogin(1);
			userDao.updateUser(tmpUser);
			//写入session中
			
			session.setAttribute("user", tmpUser);
			//跳转到首页
			pw.write("{\"state\":\"success\",\"redirect\":\"index.jsp\"}");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
