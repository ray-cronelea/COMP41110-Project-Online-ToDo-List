package ie.raywilson.todo.config;

import com.google.appengine.api.utils.SystemProperty;
import com.google.cloud.datastore.DatastoreOptions;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyFilter;
import com.googlecode.objectify.ObjectifyService;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import ie.raywilson.todo.model.Item;
import ie.raywilson.todo.model.TodoList;
import ie.raywilson.todo.model.User;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObjectifyConfig {

	@Bean
	public FilterRegistrationBean<ObjectifyFilter> objectifyFilterRegistration() {
		final FilterRegistrationBean<ObjectifyFilter> registration = new FilterRegistrationBean<>();
		registration.setFilter(new ObjectifyFilter());
		registration.addUrlPatterns("/*");
		registration.setOrder(1);
		return registration;
	}

	@Bean
	public ServletListenerRegistrationBean<ObjectifyListener> listenerRegistrationBean() {
		ServletListenerRegistrationBean<ObjectifyListener> bean =
				new ServletListenerRegistrationBean<>();
		bean.setListener(new ObjectifyListener());
		return bean;
	}

	@WebListener
	public class ObjectifyListener implements ServletContextListener {

		@Override
		public void contextInitialized(ServletContextEvent sce) {

			Boolean inProduction = false;
			// Check if in Production
			try {
				inProduction = SystemProperty.environment.value() == SystemProperty.Environment.Value.Production;
			} catch (Exception ex){
				System.out.println("Can't detect if in production. Assuming is development environment");
			}

			System.out.println("SYSTEM IS RUNNING IN PRODUCTION STATUS: " + inProduction.toString());

			if (inProduction){
				ObjectifyService.init(new ObjectifyFactory());
			} else {
				// Development Server
				ObjectifyService.init(new ObjectifyFactory(
						DatastoreOptions.newBuilder()
								.setHost("http://localhost:8081")
								.setProjectId("cloud-todo-221612")
								.build()
								.getService()
				));
			}

			ObjectifyService.register(Item.class);
			ObjectifyService.register(TodoList.class);
			ObjectifyService.register(User.class);

		}

		@Override
		public void contextDestroyed(ServletContextEvent sce) {

		}
	}

}