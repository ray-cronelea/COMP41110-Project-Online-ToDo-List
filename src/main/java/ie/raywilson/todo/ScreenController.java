package ie.raywilson.todo;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

		// Decide on what key to use here


		// Check if user has profile and create if no profile exists
		// Return user interface which will communicate with backend and use session to retrieve data

		model.addAttribute("logoutURL", logoutURL);
		return "app";
	}

}
