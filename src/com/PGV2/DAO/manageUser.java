package com.PGV2.DAO;

import java.util.List;

import javax.management.Query;

import java.util.Date;
import java.util.Iterator;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;

import com.PGV2.javaBean.User;
import com.PGV2.test.Employee;

public class manageUser {
	private static SessionFactory factory;

	public manageUser() {
		// TODO Auto-generated constructor stub
		try {
			factory = new Configuration().configure().buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println("Failed to create sessionFactory object." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	/*
	 * 增加一个用户
	 */
	public Integer addUser(User tmpUser) {
		Session session = factory.openSession();
		Transaction tx = null;
		Integer userID = null;
		try {
			tx = session.beginTransaction();
			User newUser = tmpUser;
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
	 * 列出所有的用户
	 */
	public List listUsers() {
		Session session = factory.openSession();
		Transaction tx = null;
		List users = null;
		try {
			tx = session.beginTransaction();
			users = session.createQuery("FROM User").list();
			for (Iterator iterator = users.iterator(); iterator.hasNext();) {
				User tmpUser = (User) iterator.next();
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
		return users;
	}

	/*
	 * 更新密码
	 */
	public void updateUserPwd(Integer userID, String pwd) {
		Session session = factory.openSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			User tmpUsere = (User) session.get(User.class, userID);
			tmpUsere.setUserPwd(pwd);
			;
			session.update(tmpUsere);
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
	 * 更新用户在线状态
	 */
	public void updateUser(User tmpUser){
		Session session = factory.openSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			//User tmpUsere = (User) session.get(User.class, tmpUser.getId());
			session.update(tmpUser);
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
	 * 删除一个用户
	 */
	public void deleteEmployee(Integer userID) {
		Session session = factory.openSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			User tmpUser = (User) session.get(User.class, userID);
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

	public User getUserById(Integer userID) {
		Session session = factory.openSession();
		Transaction tx = null;
		User tmpUser = null;
		try {
			tx = session.beginTransaction();
			tmpUser = (User) session.get(User.class, userID);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return tmpUser;
	}

	public User getUserByValid(String userName, String userPwd) {
		Session session = factory.openSession();
		Transaction tx = null;
		User tmpUser = null;
		try {
			tx = session.beginTransaction();
			org.hibernate.query.Query query = 
					session.createQuery("from User u where u.userName = :name  and u.userPwd = :pwd")
						.setParameter("name", userName).setParameter("pwd", userPwd);
			List res = query.list();
			if(res!=null||res.size()!=0){
				Iterator it = res.iterator();
				tmpUser = (User) it.next();
			}
			tx.commit();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			session.close();
		}
		return tmpUser;
	}

}
