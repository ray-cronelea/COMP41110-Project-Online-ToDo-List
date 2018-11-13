package ie.raywilson.todo;

import com.googlecode.objectify.Key;
import ie.raywilson.todo.model.Item;
import ie.raywilson.todo.model.TodoList;
import ie.raywilson.todo.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.googlecode.objectify.ObjectifyService.ofy;

@RestController
public class TodoController {

	// Should really be post
	@GetMapping("/todo/test/{varName}")
	public String name(@PathVariable String varName){


		User user = new User("varName");
		Item item = new Item("First Item", "This is a item description");

		Key<User> userKey = ofy().save().entity(user).now();
		Key<Item> itemKey = ofy().save().entity(item).now();

		TodoList tl = new TodoList("tempList", "This is a test description");
		tl.addItem(itemKey);
		tl.addUser(userKey);

		Key<TodoList> listKey = ofy().save().entity(tl).now();

		//User c = ofy().load().type(User.class).id("123123").now();

		return "Record of name added to storage (";
	}

}
