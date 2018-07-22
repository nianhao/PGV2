package com.PGV2.DAO;

import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.PGV2.javaBean.onlineUser;
import com.PGV2.javaBean.upload1;

public class manageUpload1 {

	private static SessionFactory factory;

	public  manageUpload1(){
		// TODO Auto-generated constructor stub
		try {
			factory = new Configuration().configure().buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println("Failed to create sessionFactory object." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}
	public List listUpload1() {
		Session session = factory.openSession();
		Transaction tx = null;
		List upload1 = null;
		try {
			tx = session.beginTransaction();
			upload1 = session.createQuery("FROM upload1").list();
			for (Iterator iterator = upload1.iterator(); iterator.hasNext();) {
				upload1 tmpUpload1 = (upload1) iterator.next();
				//System.out.println(tmpUpload1.getUpload1_data());
			}
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return upload1;
	}
	public static void main(String [] args) {
		
		manageUpload1 upload1Dao = new manageUpload1();
		
		List <upload1> upload1List = null;
		
		upload1List = upload1Dao.listUpload1();
		
		for(int i=0;i<upload1List.size();i++){
			System.out.println(upload1List.get(i).getUpdate_date());
		}
	}
}
