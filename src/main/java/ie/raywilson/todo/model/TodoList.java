package ie.raywilson.todo.model;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Entity
public class TodoList {
	@Id Long id;
	String name; // Can be Long, long, or String
	String description;
	@Index List<Key<Account>> accountKeys = new ArrayList<Key<Account>>();

	public TodoList(){
	}

	public TodoList(String name, String description){
		this.name = name;
		this.description = description;
	}

	public Long getId() { return id; }

	public void setId(Long id){ this.id = id; }

	public String getName(){ return name; }

	public void setName(String name){ this.name = name; }

	public String getDescription(){ return description; }

	public void setDescription(String description){ this.description = description; }

	public void addAccount(Key<Account> userKey){
		accountKeys.add(userKey);
	}

	public void removeAccount(Key<TodoListItem> accountKey){
		Predicate<Key<Account>> userKeyPredicate = p-> p.getId() == accountKey.getId();
		accountKeys.removeIf(userKeyPredicate);
	}

}