package ie.raywilson.todo;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.Key;
import ie.raywilson.todo.model.Account;
import ie.raywilson.todo.model.TodoList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.googlecode.objectify.ObjectifyService.ofy;

@RestController
public class TestingController {

	// Should really be post
	@GetMapping("/test/{varName}")
	public String name(@PathVariable String varName){


		User currentUser = UserServiceFactory.getUserService().getCurrentUser();
		Account currentAccount = ofy().load().type(Account.class).filter("userId", currentUser.getUserId()).first().now();
		Key<Account> ka = Key.create(Account.class, currentAccount.getId());

		TodoList newTodoList = new TodoList("Test", "test");
		newTodoList.addAccount(ka);
		ofy().save().entity(newTodoList).now();

		Iterable<TodoList> todoLists = ofy().load().type(TodoList.class).filter("accountKeys", currentAccount);

		int count = 0;
		for(TodoList tdl : todoLists){
			System.out.println(tdl.getDescription() + " " + tdl.getName() + " " + tdl.getId());
			count += 1;
			tdl.setDescription(String.valueOf(count));
			ofy().save().entity(tdl).now();
		}

		ofy().save().entity(newTodoList).now();

		return "Test record added to database";
	}

}
