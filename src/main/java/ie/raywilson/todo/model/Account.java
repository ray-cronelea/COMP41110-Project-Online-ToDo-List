package ie.raywilson.todo.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Account {

	@Id Long id;
	@Index String userId;
	String email; // Can be Long, long, or String

	public Account(){
		this.userId = null;
		this.email = null;
	}

	public Account(String email, String userId){
		this.userId = userId;
		this.email = email;
	}

	public Long getId(){ return id; }

	public String getEmail(){ return email; }

	public String getUserId(){ return userId; }

}