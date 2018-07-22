package com.PGV2.servlet;

import java.io.IOException;
import java.io.Writer;
import java.sql.Timestamp;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.PGV2.DAO.manageUpload1;
import com.PGV2.javaBean.upload1;

/**
 * Servlet implementation class displayUpload1
 */
@WebServlet("/displayUpload1")
public class displayUpload1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public displayUpload1() {
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
		//获取当前时间
		//Timestamp 
		//查询 upload1里面的内容
		manageUpload1 upload1Dao = new manageUpload1();
		List<upload1> allUploadList = upload1Dao.listUpload1();
		
		//构造json字符串
		String upload1JsonString = "{\"items\":[";
		for(int i =0;i<allUploadList.size();i++){
			String tmpString =allUploadList.get(i).toJsonString();
			upload1JsonString+=tmpString;
			upload1JsonString+=",";
		}
		upload1JsonString = upload1JsonString.substring(0,upload1JsonString.length()-1)+"]}";
		System.out.println(upload1JsonString);
		pw.write(upload1JsonString);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
