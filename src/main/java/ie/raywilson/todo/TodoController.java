package ie.raywilson.todo;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.Key;
import ie.raywilson.todo.data.Item;
import ie.raywilson.todo.data.TodoList;
import ie.raywilson.todo.data.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.googlecode.objectify.ObjectifyService.ofy;

@RestController
public class TodoController {
	//@GetMapping("/")
	//public String hello() {
	//	return "Hello world - springboot-appengine-standard!";
	//}

	@GetMapping("/logout")
	public @ResponseBody void logout(HttpServletRequest req, HttpServletResponse resp){

		UserService userService = UserServiceFactory.getUserService();
		String thisUrl = req.getRequestURI();

		resp.setContentType("text/html");
		try {

			resp.getWriter().println(
					"<p>Hello, "
					+ req.getUserPrincipal().getName()
					+ "!  You can <a href=\""
					+ userService.createLogoutURL("/index.html")
					+ "\">sign out</a>.</p>");

		} catch (Exception ex){
			System.out.println("Failed to create print writer response");
			ex.printStackTrace();
		}
	}

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
