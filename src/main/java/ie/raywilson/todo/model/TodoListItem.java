package ie.raywilson.todo.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class TodoListItem {
	@Id Long id;
	String name;
	String description;

	private TodoListItem() {
		this.name = null;
		this.description = null;
	}

	public TodoListItem(String name, String description){
		this.name = name;
		this.description = description;
	}
}