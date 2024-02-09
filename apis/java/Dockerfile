#
# Build stage
#
FROM maven:3.8.1-openjdk-17-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml install

#
# Package stage
#
FROM openjdk:17.0.1-jdk-slim
ENV SPRING_PROFILES_ACTIVE docker
ENV SPRING_SERVER_PORT=8080
COPY --from=build /home/app/target/api1-0.0.1-SNAPSHOT.jar /usr/local/lib/out.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/out.jar"]
