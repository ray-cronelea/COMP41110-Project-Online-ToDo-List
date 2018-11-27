package ie.raywilson.todo.model;

import com.googlecode.objectify.Key;

import java.text.SimpleDateFormat;
import java.util.Date;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class HelperFunctions {

	public static void createDemoDataForNewUser(Account currentAccount){

		// Get account key
		Key<Account> accountKey = Key.create(Account.class, currentAccount.getId());

		// Create a default list for this user
		TodoList tdl = new TodoList(
				"Application Evaluation",
				"This list was created to help check all the operations that this todo list application is capable of performing. Please mark the items done as you complete them!");
		tdl.addAccount(accountKey);
		ofy().save().entity(tdl).now();

		// Add the example list items
		Key<TodoList> listKey = Key.create(TodoList.class, tdl.getId());
		Date date = new Date();
		String today = new SimpleDateFormat("yyyy-MM-dd").format(date);

		// Create example list items
		createItem(listKey,"View this list","This task has been completed for you!", "2018-11-20", true);
		createItem(listKey,"Edit this todo list","Make changes to the name and description", today, false);
		createItem(listKey,"Create a new todo list","Use the add list button in the drawer", today, false);
		createItem(listKey,"Add some new items to the todo list","Use the add button located on the table header", today, false);
		createItem(listKey,"Edit an item","Use the edit button in the table view", "2019-01-05", false);
		createItem(listKey,"Delete an item","Use the delete button in the table view", "2019-01-05", false);
		createItem(listKey,"Share the list","Use the share button located above", "2019-01-06", false);
		createItem(listKey,"Disable Sharing for this list","Access will be denied to the list", "2019-02-06", false);
		createItem(listKey,"Perform a search on the todo list","Use the search text field on the left", "2019-03-07", false);

		// Create another list for this user
		TodoList tdl1 = new TodoList(
				"Example List",
				"This list was created as another example list during the the account creation process.");
		tdl1.addAccount(accountKey);
		ofy().save().entity(tdl1).now();

		// Add the example list items
		Key<TodoList> listKey1 = Key.create(TodoList.class, tdl1.getId());

		// Populate some test data
		createItem(listKey1,"Task 1","Description 1", "2018-11-20", true);
		createItem(listKey1,"Task 2","Description 2", "2018-11-21", true);
		createItem(listKey1,"Task 3","Description 3", "2018-11-22", true);
		createItem(listKey1,"Task 4","Description 4", "2018-11-23", false);
		createItem(listKey1,"Task 5","Description 5", "2018-11-26", false);
		createItem(listKey1,"Task 6","Description 6", today, false);
		createItem(listKey1,"Task 7","Description 7", "2018-11-05", false);
		createItem(listKey1,"Task 8","Description 8", "2018-11-04", false);

	}

	public static void createItem(Key<TodoList> listKey, String name, String desc, String date, Boolean completed){
		TodoListItem tdli = new TodoListItem(name,desc, date, completed);
		tdli.addList(listKey);
		ofy().save().entity(tdli).now();
	}
}
