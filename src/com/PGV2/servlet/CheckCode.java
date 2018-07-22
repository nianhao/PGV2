package com.PGV2.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.imageio.ImageIO;
/**
 * Servlet implementation class CheckCode
 */
@WebServlet("/CheckCode")
public class CheckCode extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static int WIDTH=90;
    private static int HEIGHT=30;
    private  static int fontSize = 30;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CheckCode() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		//PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        response.setContentType("image/jpeg");//���÷�����Ϣ�����ʽ
        ServletOutputStream sos = response.getOutputStream();//��ȡ�����
        //��������������淵�ص�ͼƬ
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        
        //�����ڴ�ͼ�񲢻����ͼ��������
        
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics g = image.getGraphics();
        //���������֤��
        char[] rands=generateCheckCode();
        //����ͼ��
        drawBackground(g);
        drawRands(g,rands);
        g.dispose();
        
        //��ͼ��������ͻ���
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(image, "JPEG", bos);
        byte[] buf = bos.toByteArray();
        response.setContentLength(buf.length);
        sos.write(buf);
        bos.close();
        sos.close();
        session.setAttribute("check_code", new String(rands));
        
    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	//������������ַ�����ͼƬ
    private void drawRands(Graphics g, char[] rands) {
        g.setColor(Color.black);
        g.setFont(new Font(null,Font.ITALIC|Font.BOLD,fontSize));
        //�ڲ�ͬ�ĸ߶�����ʾ����֤��
        
        g.drawString(rands[0]+"", 5, 20);
        g.drawString(rands[1]+"", 23, 25);
        g.drawString(rands[2]+"",46,21);
        g.drawString(rands[3]+"", 66, 22);
        System.out.println(rands);
    }

    //��������
    private void drawBackground(Graphics g) {
        //��������
        g.setColor(new Color(0xDCDCDC));
        g.fillRect(0, 0, WIDTH, HEIGHT);
        
        //�������ŵ� num��
        int num=120;
        for(int i=0;i<num;i++){
            int x = (int )(Math.random()*WIDTH);
            int y = (int )(Math.random()*HEIGHT);
            
            int red = (int )(Math.random()*255);
            int green=(int )(Math.random()*255);
            int blue=(int)(Math.random()*255);
            g.setColor(new Color(red,green,blue));
            g.drawOval(x, y, 1, 0);
        }
        
    }
    //���������֤��
    private char[] generateCheckCode() {
        String chars="0123456789abcdefghijklmnopqrstuvwxyz";
        char rands[]=new char[4];
        for(int i=0;i<4;i++){
            int rand=(int)(Math.random()*36);
            rands[i]=chars.charAt(rand);
        }
        return rands;
    }

}
