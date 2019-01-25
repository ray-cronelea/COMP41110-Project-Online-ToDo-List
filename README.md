# COMP41110-Project-Online-ToDo-List

Check this project out live! Running at: https://todo.raywilson.ie

Online Todo list which allows users to perform the following operations:
* a. Create new tasks
* b. Edit or delete existing tasks
* c. Search for tasks
* d. Time slots booking
* e. Share tasks or the whole list

# Setup of google cloud
Install Google SDK.
To initialise plugin:`gcloud init`

To create Project:
`gcloud app create`

Set up maven wrapper if jar can't be found

`mvn -N io.takari:maven:wrapper`

`./mvnw clean install`

./mvnw uses the maven wrapper
mvn uses the system version of maven

To set active project: `gcloud config set project <projectID>`

For example: `gcloud config set project cloud-todo-221612`

To view current config: `gcloud config list`


# To build frontend
mvn clean install

# Running application

To run locally, first run datastore emulator and then application locally:

`gcloud beta emulators datastore start` 

To run application locally:
`mvn appengine:run`

To deploy to app engine: `mvn appengine:deploy`

To debug application:
Uncomment debugging section in pom.xml file.
Then run `mvn appengine:run`
Create Remote debug configuration if not already created
Run remote debug and the application should connect to the debugger 
(Ref: https://cloud.google.com/tools/intellij/docs/deploy-local,https://cloud.google.com/eclipse/docs/objectify)

## References
Base application found:
https://github.com/GoogleCloudPlatform/getting-started-java/blob/master/appengine-standard-java8/springboot-appengine-standard/README.md

To use Objectify with Java Spring, and local datastore emulator:
https://github.com/takemikami/spring-boot-objectify-sample

Project originally used a self-hosted GitLab server for version control