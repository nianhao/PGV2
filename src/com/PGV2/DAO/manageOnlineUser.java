package com.PGV2.DAO;
import java.util.List;

import javax.management.Query;

import java.util.Date;
import java.util.Iterator;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.PGV2.javaBean.onlineUser;
public class manageOnlineUser {
	private static SessionFactory factory;
	public  manageOnlineUser() {
		// TODO Auto-generated constructor stub
				try {
					factory = new Configuration().configure().buildSessionFactory();
				} catch (Throwable ex) {
					System.err.println("Failed to create sessionFactory object." + ex);
					throw new ExceptionInInitializerError(ex);
				}
	}
	/*
	 * 增加一个在线用户
	 */
	public Integer addOnlineUser(onlineUser tmpUser) {
		Session session = factory.openSession();
		Transaction tx = null;
		Integer userID = null;
		try {
			tx = session.beginTransaction();
			onlineUser newUser = tmpUser;
			userID = (Integer) session.save(newUser);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return userID;

	}

	/*
	 * 列出所有的在线用户
	 */
	public List listUsers() {
		Session session = factory.openSession();
		Transaction tx = null;
		List onlineUsers = null;
		try {
			tx = session.beginTransaction();
			onlineUsers = session.createQuery("FROM onlineUser").list();
			for (Iterator iterator = onlineUsers.iterator(); iterator.hasNext();) {
				onlineUser tmpUser = (onlineUser) iterator.next();
				System.out.println(tmpUser.getUserName());
			}
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return onlineUsers;
	}
	/*
	 * 删除一个在线用户
	 */
	public void deleteEmployee(Integer onlineUserID) {
		Session session = factory.openSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			onlineUser tmpUser = (onlineUser) session.get(onlineUser.class, onlineUserID);
			session.delete(tmpUser);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	/*
	 * 通过id获得一条记录
	 */
	public onlineUser getOneById(Integer onlineUserId ) {
		onlineUser tmpOnlineUser = null;
		Session session = factory.openSession();
		Transaction tx = null;
		try {
			tx=session.beginTransaction();
			tmpOnlineUser = (onlineUser) session.get(onlineUser.class, onlineUserId);
			tx.commit();
		} catch (HibernateException e) {
			// TODO: handle exception
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}finally {
			session.close();
		}
		return tmpOnlineUser;
	}
	public onlineUser getOneByUserId(Integer UserId ) {
		onlineUser tmpOnlineUser = null;
		Session session = factory.openSession();
		Transaction tx = null;
		try {
			tx=session.beginTransaction();
			org.hibernate.query.Query query =  session.createQuery("from onlineUser ou where ou.userId =:userId").setParameter("userId", UserId);
			List resList = query.list();
			if(resList.size()>0){
				Iterator iterator = resList.iterator();
				tmpOnlineUser = (onlineUser)iterator.next();
			}

			tx.commit();
		} catch (HibernateException e) {
			// TODO: handle exception
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}finally {
			session.close();
		}
		return tmpOnlineUser;
	}
}
