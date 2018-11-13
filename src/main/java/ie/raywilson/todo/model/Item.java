package ie.raywilson.todo.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class Item {
	@Id String name;
	String description;

	private Item() {}

	public Item(String name, String description){
		this.name = name;
		this.description = description;
	}

	// TODO: Add put and get functions

}