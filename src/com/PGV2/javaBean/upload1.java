package com.PGV2.javaBean;

import java.sql.Date;
import java.sql.Timestamp;

import javax.xml.crypto.Data;

public class upload1 {

		String upload1_id;
		String name;
		String type;
		Timestamp update_date;
		String upload1_data;
		String area;
		String level;
		String sd_name;
		String sd_level;
		String factors;
		int tnum;
		int dnum;
		int bnum;
		int lnum;
		String des;
		String dem;
		String oth;
		String app_id;
		
		private String hostUrl="http://106.14.141.55:9090/file/yj";
		
		public upload1(String upload1_id, String name, String type, Timestamp update_date, String upload1_data, String area,
				String level, String sd_name, String sd_level, String factors, int tnum, int dnum, int bnum, int lnum,
				String des, String dem, String oth, String app_id) {
			super();
			this.upload1_id = upload1_id;
			this.name = name;
			this.type = type;
			this.update_date = update_date;
			this.upload1_data = upload1_data;
			this.area = area;
			this.level = level;
			this.sd_name = sd_name;
			this.sd_level = sd_level;
			this.factors = factors;
			this.tnum = tnum;
			this.dnum = dnum;
			this.bnum = bnum;
			this.lnum = lnum;
			this.des = des;
			this.dem = dem;
			this.oth = oth;
			this.app_id = app_id;
		}
		public upload1() {
			super();
		}
		public String getUpload1_id() {
			return upload1_id;
		}
		public void setUpload1_id(String upload1_id) {
			this.upload1_id = upload1_id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public Timestamp getUpdate_date() {
			return update_date;
		}
		public void setUpdate_date(Timestamp update_date) {
			this.update_date = update_date;
		}
		public String getUpload1_data() {
			return upload1_data;
		}
		public void setUpload1_data(String upload1_data) {
			this.upload1_data = upload1_data;
		}
		public String getArea() {
			return area;
		}
		public void setArea(String area) {
			this.area = area;
		}
		public String getLevel() {
			return level;
		}
		public void setLevel(String level) {
			this.level = level;
		}
		public String getSd_name() {
			return sd_name;
		}
		public void setSd_name(String sd_name) {
			this.sd_name = sd_name;
		}
		public String getSd_level() {
			return sd_level;
		}
		public void setSd_level(String sd_level) {
			this.sd_level = sd_level;
		}
		public String getFactors() {
			return factors;
		}
		public void setFactors(String factors) {
			this.factors = factors;
		}
		public int getTnum() {
			return tnum;
		}
		public void setTnum(int tnum) {
			this.tnum = tnum;
		}
		public int getDnum() {
			return dnum;
		}
		public void setDnum(int dnum) {
			this.dnum = dnum;
		}
		public int getBnum() {
			return bnum;
		}
		public void setBnum(int bnum) {
			this.bnum = bnum;
		}
		public int getLnum() {
			return lnum;
		}
		public void setLnum(int lnum) {
			this.lnum = lnum;
		}
		public String getDes() {
			return des;
		}
		public void setDes(String des) {
			this.des = des;
		}
		public String getDem() {
			return dem;
		}
		public void setDem(String dem) {
			this.dem = dem;
		}
		public String getOth() {
			return oth;
		}
		public void setOth(String oth) {
			this.oth = oth;
		}
		public String getApp_id() {
			return app_id;
		}
		public void setApp_id(String app_id) {
			this.app_id = app_id;
		}
		
		public  String toJsonString() {
			
			String jsonString="";
			jsonString+="{\"upload1_id\":\""+this.upload1_id+"\","
					  +"\"name\":\""+this.name+"\","
					  +"\"type\":\""+this.type+"\","
					  +"\"update_date\":\""+this.update_date+"\","
					  +"\"upload1_data\":\""+this.hostUrl+"?"+this.upload1_data+"\","
					  +"\"area\":\""+this.area+"\","
					  +"\"level\":\""+this.level+"\","
					  +"\"sd_name\":\""+this.sd_name+"\","
					  +"\"sd_level\":\""+this.sd_level+"\","
					  +"\"factors\":\""+this.factors+"\","
					  +"\"tnum\":\""+this.tnum+"\","
					  +"\"dnum\":\""+this.dnum+"\","
					  +"\"bnum\":\""+this.bnum+"\","
					  +"\"lnum\":\""+this.lnum+"\","
					  +"\"des\":\""+this.des+"\","
					  +"\"dem\":\""+this.dem+"\","
					  +"\"oth\":\""+this.oth+"\","
					  +"\"app_id\":\""+this.app_id+"\"}";

			return jsonString;
		}
		
		
}
