package ie.raywilson.todo.security;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebFilter(filterName = "authFilter", urlPatterns = {"/api/*","/app","/search"})
public class authFilter implements Filter {

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

		// REF: https://cloud.google.com/appengine/docs/standard/java/users/

		HttpServletRequest req = (HttpServletRequest) servletRequest;
		HttpServletResponse resp = (HttpServletResponse) servletResponse;

		String url = req.getRequestURL().toString();
		String uri = req.getRequestURI();

		System.out.println("Authentication filter has been triggered, URL: " + url + ", URI: " + uri);

		// Google Account API userService
		UserService userService = UserServiceFactory.getUserService();
		String thisUrl = req.getRequestURI();

		Boolean userLoggedIn = userService.isUserLoggedIn();

		if (userLoggedIn) {
			// Continue to required destination
			filterChain.doFilter(req, resp);
		} else {
			System.out.println("Sending user to login page!");
			resp.sendRedirect("/");
		}

	}

	@Override
	public void destroy() {}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {}

}
