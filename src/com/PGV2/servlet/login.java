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
		//��֤��֤���Ƿ���ȷ
		if(!code.equals(checkCode)){
			System.out.println("��֤�����ϵͳ���ɵ���֤���� "+checkCode+"  �û�������ǣ�"+code);
			//pw.write("{\"state\":\"error\",\"message\":\"��֤�����\"}");
			//return;
		}
		System.out.println(userName+" "+userPwd);
		manageUser userDao = new manageUser();
		System.out.println("****************���յ��������ǣ�************\n"+userName+"  "+userPwd);
		User tmpUser = userDao.getUserByValid(userName, userPwd);
		if(tmpUser==null||tmpUser.equals(null)){
			System.out.println("�û������������");
			//���ش�����Ϣ
			pw.write("{\"state\":\"error\",\"message\":\"�û������������\"}");
		}else{
			System.out.println("��¼�ɹ�");
			//�����û�����״̬
			tmpUser.setLogin(1);
			userDao.updateUser(tmpUser);
			//д��session��
			
			session.setAttribute("user", tmpUser);
			//��ת����ҳ
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
