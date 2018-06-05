package com.PGV2.servlet;

import java.io.IOException;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.PGV2.DAO.manageOnlineUser;
import com.PGV2.DAO.manageUser;
import com.PGV2.javaBean.User;
import com.PGV2.javaBean.onlineUser;
import com.PGV2.websocket.WebSocketServer;

/**
 * Servlet implementation class setLoginMsg
 */
@WebServlet("/setLoginMsg")
public class setLoginMsg extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public setLoginMsg() {
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
		String state = request.getParameter("state").trim();
		String userId = request.getParameter("user").trim();
		String loginTime = request.getParameter("loginTime");
		//System.out.println("���յ���userid�ǣ�"+userId+Integer.getInteger(userId));
		manageUser userDao = new manageUser();
		manageOnlineUser onlineUserDao = new manageOnlineUser();
		boolean contention = false;
		//�������ж�ȡUser
		User tmpUser = userDao.getUserById(Integer.parseInt(userId));
		if(state.equals("success")||state=="success"){
			
			//��ȡ����λ��
			String logxString = request.getParameter("logx");
			String logyString = request.getParameter("logy");
			//ˢ�����ݿ�

			
			if(tmpUser.getLogin()!=1){
				//�û�û�е�¼
				pWriter.write("{\"state\":\"noLog\",\"message\":\"δ��¼\"}");
				return;
			}
			onlineUser tmpOnlineUser = new onlineUser(tmpUser,loginTime,Double.parseDouble(logxString),Double.parseDouble(logyString));
			//�������ݿ�
			onlineUser oldOnlineUser = onlineUserDao.getOneByUserId(tmpUser.getId());
			if(oldOnlineUser!=null){
				onlineUserDao.deleteEmployee(oldOnlineUser.getId());
			}
			onlineUserDao.addOnlineUser(tmpOnlineUser);
			//����webSocket��ֵ��
			WebSocketServer.updateOnlineUsers(tmpUser,contention);
			pWriter.write("{\"state\":\"success\",\"message\":\"��¼�ɹ�\"}");
		}else{
			
			onlineUser tmpOnlineUser = new onlineUser(tmpUser,loginTime,-1,-1);
			//�������ݿ�
			onlineUser oldOnlineUser = onlineUserDao.getOneByUserId(tmpUser.getId());
			if(oldOnlineUser!=null){
				onlineUserDao.deleteEmployee(oldOnlineUser.getId());
			}
			onlineUserDao.addOnlineUser(tmpOnlineUser);
			//����webSocket��ֵ��
			WebSocketServer.updateOnlineUsers(tmpUser, contention);
			pWriter.write("{\"state\":\"noAddr\",\"message\":\"�޷���ȡλ����Ϣ\"}");
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
