package ie.raywilson.todo;

import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import ie.raywilson.todo.model.Account;
import ie.raywilson.todo.model.TodoList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.common.collect.Lists;
import sun.security.provider.certpath.OCSPResponse;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

@RestController
@RequestMapping("/api")
public class TodoListController {

	@GetMapping(value = "/todolists", produces = "application/json")
	public List<TodoList> todoListsGet(){

		User currentUser = UserServiceFactory.getUserService().getCurrentUser();
		Account currentAccount = ofy().load().type(Account.class).filter("userId", currentUser.getUserId()).first().now();
		Iterable<TodoList> todoLists = ofy().load().type(TodoList.class).filter("accountKeys", currentAccount);

		/*
		String values = "<ul>";
		for(TodoList tdl : todoLists){
			values = values + "<li>" + "Name:" + tdl.getName() + ", Desc:" + tdl.getDescription() + ", ID:" + tdl.getId() + "</li>" + System.lineSeparator();
		}
		values = values + "</ul>";
		*/

		return Lists.newArrayList(todoLists);
	}

	@GetMapping(value = "/todolists/{id}", produces = "application/json")
	public TodoList todoListsGet(@PathVariable String id){

		TodoList tdl = ofy().load().type(TodoList.class).id(Long.parseLong(id)).now();
		return tdl;
	}

	@PostMapping(path = "/todolists")
	public ResponseEntity todoListsPost(@ModelAttribute("todolist") TodoList todoList){

		System.out.println("Post Mapping, " + todoList.getName() + ", " + todoList.getDescription());

		User currentUser = UserServiceFactory.getUserService().getCurrentUser();
		Account currentAccount = ofy().load().type(Account.class).filter("userId", currentUser.getUserId()).first().now();
		Key<Account> accountKey = Key.create(Account.class, currentAccount.getId());
		todoList.addAccount(accountKey);
		ofy().save().entity(todoList).now();

		return new ResponseEntity(todoList, HttpStatus.OK);
	}

	@PostMapping(path = "/todolists/{id}")
	public ResponseEntity todoListsPut(@PathVariable String id, @ModelAttribute("todolist") TodoList todoList){

		TodoList updateTodoList = ofy().load().type(TodoList.class).id(todoList.getId()).now();
		updateTodoList.setDescription(todoList.getDescription());
		updateTodoList.setName(todoList.getName());
		ofy().save().entity(updateTodoList).now();

		return new ResponseEntity(todoList, HttpStatus.OK);
	}

	@DeleteMapping(path = "/todolists/{id}")
	public ResponseEntity todoListsDelete(@PathVariable String id){

		System.out.println("Todolist Delete, id:" + id);
		TodoList deleteTodoList = ofy().load().type(TodoList.class).id(Long.parseLong(id)).now();
		ofy().delete().entity(deleteTodoList).now();

		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

}
