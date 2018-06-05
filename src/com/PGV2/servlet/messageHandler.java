package com.PGV2.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.PGV2.javaBean.Message;
import com.PGV2.javaBean.Signal;
import com.PGV2.javaBean.Text;
import com.PGV2.javaBean.candidate;
import com.PGV2.javaBean.sdp;
import com.PGV2.websocket.WebSocketServer;

/**
 * Servlet implementation class requestHandler
 */
@WebServlet("/messageHandler")
public class messageHandler extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public messageHandler() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request,response);
		return;
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		String type=request.getParameter("type").trim();
		String toUser=request.getParameter("toUser");
		String fromUser=request.getParameter("fromUser");
		String createTime=request.getParameter("createTime");
		System.out.println(fromUser+" ·¢ËÍ¸ø "+toUser+" µÄ "+type);
		if(type.equals("offer")||type.equals("answer")){
			//String sdp_type=request.getParameter("sdp_type");
			//String sdp_sdp=request.getParameter("sdp_sdp");
			String sdp=request.getParameter("sdp");
			//System.out.print(type);
			sdp tmpsdp=new sdp(toUser, fromUser, createTime, type, sdp);
			WebSocketServer.transmitMessage(tmpsdp);
			
		}else if(type.equals("candidate")){
			//String candidate_candidate=request.getParameter("candidate[candidate]");
			//String candidate_sdpMid=request.getParameter("candidate[sdpMid]");
			//String candidate_sdpMLineIndex = request.getParameter("candidate[sdpMLineIndex]");
			String candidate=request.getParameter("candidate");
			//System.out.println("candidate");
			candidate tmpcandidate=new candidate(toUser, fromUser, createTime,type, candidate);
			WebSocketServer.transmitMessage(tmpcandidate);
		}else if(type.equals("ring")){
			Message ringMes=new Message(toUser, fromUser, createTime, type);
			//System.out.println(type);
			WebSocketServer.transmitMessage(ringMes);
		}else if(type.equals("ready")){
			Message ringMes=new Message(toUser, fromUser, createTime, type);
			//System.out.println(type);
			WebSocketServer.transmitMessage(ringMes);
		}else if(type.equals("text")){
			String text = request.getParameter("text");
			Text tmpText = new Text(toUser, fromUser, createTime,type, text);
			WebSocketServer.transmitMessage(tmpText);
		}else if(type.equals("signal")){
			String signal=request.getParameter("signal");
			Signal tmpSignal = new Signal(toUser, fromUser, createTime,type, signal);
		}else if(type.equals("loginSuccess")){
			String commandString="";
			commandString+="{"
					+"\"type\":\""+"loginSuccess"+"\""
					+ "}";
			WebSocketServer.sendToAll(commandString);
		}
	}

}
