package ie.raywilson.todo;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.collect.Lists;
import ie.raywilson.todo.model.Account;
import ie.raywilson.todo.model.HelperFunctions;
import ie.raywilson.todo.model.TodoList;
import ie.raywilson.todo.model.TodoListItem;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Controller
public class ScreenController {


	@GetMapping("/")
	public String loginPage(Model model) {

		UserService userService = UserServiceFactory.getUserService();
		String loginURL = userService.createLoginURL("/app");

		model.addAttribute("loginURL", loginURL);
		return "login";
	}

	@GetMapping("/app")
	public String appPage(Model model) {

		UserService userService = UserServiceFactory.getUserService();
		String logoutURL = userService.createLogoutURL("/");
		User currentUser = userService.getCurrentUser();
		Account currentAccount = ofy().load().type(Account.class).filter("userId", currentUser.getUserId()).first().now();

		if (currentAccount == null){

			// No user exists, add account to storage
			System.out.println("Creating new user account for " + currentUser.getEmail());
			currentAccount = new Account(currentUser.getEmail(),currentUser.getUserId());
			ofy().save().entity(currentAccount).now();

			HelperFunctions.createDemoDataForNewUser(currentAccount);

			sendMail(currentAccount.getEmail());

		} else {
			System.out.println("Account already exists for " + currentUser.getEmail());
			currentAccount.incrementAccessCount();
			ofy().save().entity(currentAccount);
		}

		model.addAttribute("userEmail", currentUser.getEmail());
		model.addAttribute("logoutURL", logoutURL);
		return "app";
	}

	@GetMapping("/share/{shareid}")
	public String sharePage(Model model, @PathVariable("shareid") String shareid) {

		TodoList tdl = ofy().load().type(TodoList.class).filter("shareId", shareid).first().now();

		if (tdl != null) {
			if (tdl.getIsShared()) {
				List<TodoListItem> tdli = Lists.newArrayList(ofy().load().type(TodoListItem.class).filter("listKeys", tdl));

				model.addAttribute("todoList", tdl);
				model.addAttribute("todoListItems", tdli);
				//model.addAttribute("todoListOwner", email);
				return "share";
			} else {
				model.addAttribute("errorMessage", "This list is not available for view.");
				return "share-error";
			}
		} else {
			model.addAttribute("errorMessage", "No list exists for this link!");
			return "share-error";
		}
	}

	public void sendMail(String accountCreator){

		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress("admin@cloud-todo-221612.appspotmail.com", "COMP41110 Admin"));
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress("ray.wilson.cronelea@gmail.com", "Ray Wilson"));
			msg.setSubject("Account Creation");
			msg.setText(accountCreator + " has created an account!");
			Transport.send(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
