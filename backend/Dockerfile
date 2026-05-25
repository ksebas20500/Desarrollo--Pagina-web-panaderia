# ==========================================
# Etapa 1: Construcción (Build Stage)
# ==========================================
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copiar archivos del proyecto
COPY pom.xml .
COPY src ./src

# Compilar y empaquetar la aplicación Spring Boot (omitiendo tests)
RUN mvn clean package -DskipTests

# ==========================================
# Etapa 2: Ejecución (Run Stage)
# ==========================================
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar el archivo JAR compilado desde la etapa de construcción
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto por defecto de la aplicación
EXPOSE 8080

# Iniciar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
