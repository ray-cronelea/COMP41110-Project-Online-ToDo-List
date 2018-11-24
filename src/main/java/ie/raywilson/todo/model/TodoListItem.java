package ie.raywilson.todo.model;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.ArrayList;
import java.util.List;

@Entity
public class TodoListItem {
	@Id Long id;
	String name;
	String description;
	String date;
	Boolean completed;
	@Index List<Key<TodoList>> listKeys = new ArrayList<Key<TodoList>>();

	private TodoListItem() {
	}

	public TodoListItem(String name, String description, String date, Boolean completed){
		this.name = name;
		this.description = description;
		this.date = date;
		this.completed = completed;
	}

	public String getName(){ return name; }

	public String getDescription(){ return description; }

	public String getDate(){ return date; }

	public Long getId(){ return id; }

	public Boolean getCompleted(){ return completed; }

	public void setName(String name){ this.name = name; }

	public void setDescription(String description){ this.description = description; }

	public void setDate(String date){ this.date = date; }

	public void setCompleted(Boolean completed){ this.completed = completed; }

	public void addList(Key<TodoList> listKey){ listKeys.add(listKey); }
}