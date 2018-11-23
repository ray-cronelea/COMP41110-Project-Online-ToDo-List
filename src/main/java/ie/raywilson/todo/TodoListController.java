package ie.raywilson.todo;

import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import ie.raywilson.todo.model.Account;
import ie.raywilson.todo.model.TodoList;
import ie.raywilson.todo.model.TodoListItem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.common.collect.Lists;

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

		return Lists.newArrayList(todoLists);
	}

	@GetMapping(value = "/todolists/{id}", produces = "application/json")
	public TodoList todoListsGet(@PathVariable String id){

		return ofy().load().type(TodoList.class).id(Long.parseLong(id)).now();
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

	// LIST ITEM CRUD TASKS BELOW

	@GetMapping(value = "/todolists/{id}/todolistitems", produces = "application/json")
	public List<TodoListItem> todoListsGetItems(@PathVariable Long id){

		Iterable<TodoListItem> todoListItems = ofy().load().type(TodoListItem.class).filter("listKey", id);
		return Lists.newArrayList(todoListItems);
	}

	@GetMapping(value = "/todolists/{id}/todolistitems/{itemid}", produces = "application/json")
	public TodoListItem todoListsGetItem(@PathVariable Long id, @PathVariable Long itemid){

		return ofy().load().type(TodoListItem.class).id(itemid).now();
	}

	@PostMapping(path = "/todolists/{id}/todolistitems")
	public ResponseEntity todoListsPostItem(@ModelAttribute("todolistitem") TodoListItem todoListItem, @PathVariable Long id){

		System.out.println("Item Post Mapping, " + todoListItem.getName() + ", " + todoListItem.getDescription());
		Key<TodoList> listKey = Key.create(TodoList.class, id);
		todoListItem.setListKey(listKey);
		ofy().save().entity(todoListItem).now();

		return new ResponseEntity(todoListItem, HttpStatus.OK);
	}

	@PostMapping(path = "/todolists/{id}/todolistitems/{itemid}")
	public ResponseEntity todoListsPostItemUpdate(@ModelAttribute("todolistitem") TodoListItem todoListItem, @PathVariable Long id, @PathVariable Long itemid){

		TodoListItem updateTodoListItem = ofy().load().type(TodoListItem.class).id(todoListItem.getId()).now();

		updateTodoListItem.setDescription(todoListItem.getDescription());
		updateTodoListItem.setName(todoListItem.getName());
		updateTodoListItem.setDate(todoListItem.getDate());

		ofy().save().entity(updateTodoListItem).now();

		return new ResponseEntity(updateTodoListItem, HttpStatus.OK);
	}

	@DeleteMapping(path = "/todolists/{id}")
	public ResponseEntity todoListsDeleteItem(@PathVariable Long id){

		System.out.println("TodolistItem Delete, id:" + id);
		TodoListItem deleteTodoListItem = ofy().load().type(TodoListItem.class).id(id).now();
		ofy().delete().entity(deleteTodoListItem).now();

		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

}
