# COMP41110-Project-Online-ToDo-List

Online Todo list which allows users to perform the following operations:
* a. Create new tasks
* b. Edit or delete existing tasks
* c. Search for tasks
* d. Time slots booking
* e. Share tasks or the whole list

# Setup of google cloud
`gcloud init`

To create Project:
`gcloud app create`

Set up maven wrapper if jar can't be found
`mvn -N io.takari:maven:wrapper`
`./mvnw clean install`

./mvnw uses the maven wrapper
mvn uses the system version of maven

# Running application

To run locally, first run datastore emulator and then application locally:
`gcloud beta emulators datastore start` and then
`mvn appengine:run`

To deploy to app engine:
`mvn appengine:deploy`

To debug application:
Uncomment debugging section in pom.xml file
Run mvn appengine:run
Create Remote debug configuration if not allready created
Run remote debug and the application should connect to the debugger 
(Ref: https://cloud.google.com/tools/intellij/docs/deploy-local,https://cloud.google.com/eclipse/docs/objectify)

## References
Base application found:
https://github.com/GoogleCloudPlatform/getting-started-java/blob/master/appengine-standard-java8/springboot-appengine-standard/README.md

To use Objectify with Java Spring, and local datastore emulator:
https://github.com/takemikami/spring-boot-objectify-sample