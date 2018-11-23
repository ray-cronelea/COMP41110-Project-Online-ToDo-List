package ie.raywilson.todo.model;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class TodoListItem {
	@Id Long id;
	@Index Key<TodoList> listKey;
	String name;
	String description;
	String date;
	Boolean completed;

	private TodoListItem() {
	}

	public TodoListItem(String name, Key<TodoList> listKey, String description, String date, Boolean completed){
		this.listKey = listKey;
		this.name = name;
		this.description = description;
		this.date = date;
		this.completed = completed;
	}

	public String getName(){ return name; }

	public String getDescription(){ return description; }

	public String getDate(){ return date; }

	public Long getId(){ return id; }

	public void setName(String name){ this.name = name; }

	public void setDescription(String description){ this.description = description; }

	public void setDate(String date){ this.date = date; }

	public void setListKey(Key<TodoList> listKey){ this.listKey = listKey; }
}