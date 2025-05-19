
FROM eclipse-temurin:21-jre-focal AS builder
LABEL authors="santiago.guerra"

# Set the working directory inside the container
WORKDIR /appBack

# Copy only the necessary Gradle wrapper files first to leverage Docker layer caching
COPY gradle/ ./gradle/
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .

# Download Gradle dependencies (this will be cached if build files don't change)
RUN chmod +x ./gradlew
RUN ./gradlew dependencies --stacktrace --info

# Copy the application source code
COPY src ./src

# Build the application using Gradle
RUN ./gradlew bootJar --stacktrace --info

# Stage the built JAR for the final image
FROM eclipse-temurin:21-jre-focal AS runner

# Set the working directory
WORKDIR /appBack

# Copy the built JAR from the builder stage
COPY --from=builder /appBack/build/libs/*.jar app.jar

# Expose the port your Spring Boot application runs on (default is 8080)
EXPOSE 8080

# Define the command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]