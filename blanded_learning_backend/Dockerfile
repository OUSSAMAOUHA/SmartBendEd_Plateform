FROM openjdk:19-jdk-slim

ARG JAR_FILE=target/ensaj-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ensaj-0.0.1-SNAPSHOT.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "/ensaj-0.0.1-SNAPSHOT.jar"]
