# Use the official JDK 21 image from Docker Hub
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Ensure Maven Wrapper script has executable permissions
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# List contents of the target directory for debugging
RUN ls -l target

# Set the entry point for the application
ENTRYPOINT ["java", "-jar", "target/lakesidehotel-0.0.1-SNAPSHOT.jar"]

# Expose the port that the application will run on (adjust if necessary)
EXPOSE 9192