package ie.raywilson.todo.data;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Entity
public class TodoList<K> {
	@Id
	String name; // Can be Long, long, or String
	String description;
	List<Key<Item>> itemKeys = new ArrayList<Key<Item>>();
	List<Key<User>> userKeys = new ArrayList<Key<User>>();

	public TodoList(String name, String description){
		this.name = name;
		this.description = description;
	}

	public void addItem(Key<Item> itemKey){
		itemKeys.add(itemKey);
	}

	public void removeItem(Key<Item> itemKey){
		Predicate<Key<Item>> itemKeyPredicate = p-> p.getId() == itemKey.getId();
		itemKeys.removeIf(itemKeyPredicate);
	}

	public void addUser(Key<User> userKey){
		userKeys.add(userKey);
	}

	public void removeUser(Key<Item> userKey){
		Predicate<Key<Item>> userKeyPredicate = p-> p.getId() == userKey.getId();
		itemKeys.removeIf(userKeyPredicate);
	}

	// TODO: Add put and get functions

}