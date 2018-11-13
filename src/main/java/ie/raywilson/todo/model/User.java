package ie.raywilson.todo.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class User {
	@Id Long id;
	String email; // Can be Long, long, or String

	public User(String email){
		this.email = email;
	}

	// TODO: Add put and get functions

}