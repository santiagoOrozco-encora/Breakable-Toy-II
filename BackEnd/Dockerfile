FROM openjdk:21-slim

WORKDIR /appBack

COPY build/libs/BackEnd-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9090

# Define the command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]