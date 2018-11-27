package ie.raywilson.todo.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Account {

	@Id Long id;
	@Index String userId;
	String email; // Can be Long, long, or String
	int accessCount;

	public Account(){
		accessCount = 0;
	}

	public Account(String email, String userId){
		this.userId = userId;
		this.email = email;
		accessCount = 0;
	}

	public Long getId(){ return id; }

	public String getEmail(){ return email; }

	public String getUserId(){ return userId; }

	public int getAccessCount(){ return accessCount; }

	public void setAccessCount(int accessCount){ this.accessCount = accessCount; }

	public void incrementAccessCount(){ accessCount += 1; }

}