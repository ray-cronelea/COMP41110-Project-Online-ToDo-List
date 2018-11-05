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
To run locally:
`mvn appengine:run`

To deploy to app engine:
`mvn appengine:deploy`


## References
Base application found:
https://github.com/GoogleCloudPlatform/getting-started-java/blob/master/appengine-standard-java8/springboot-appengine-standard/README.md
