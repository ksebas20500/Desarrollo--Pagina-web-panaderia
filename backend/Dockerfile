# ══════════════════════════════════════════════════
# ETAPA 1: COMPILACIÓN
# ══════════════════════════════════════════════════

# Usamos una imagen que ya tiene Maven y Java 17 instalados.
# "AS build" le pone nombre a esta etapa para referenciarla después.
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Le decimos a Docker que trabaje dentro de la carpeta /app
# dentro del contenedor. Si no existe, la crea.
WORKDIR /app

# Copiamos el pom.xml primero (la lista de dependencias).
# Docker hace esto separado para aprovechar el caché:
# si el pom.xml no cambió, no vuelve a descargar las dependencias.
COPY pom.xml .

# Copiamos todo el código fuente (la carpeta src/).
COPY src ./src

# Ejecutamos Maven para compilar y empaquetar el proyecto.
# -DskipTests significa: no ejecutes los tests automáticos.
# Esto es importante porque en el servidor puede no haber
# acceso a la base de datos durante el build.
RUN mvn clean package -DskipTests


# ══════════════════════════════════════════════════
# ETAPA 2: EJECUCIÓN
# ══════════════════════════════════════════════════

# Ahora usamos una imagen mucho más liviana, solo con Java Runtime.
# No necesitamos Maven ni JDK aquí, solo correr el .jar.
FROM eclipse-temurin:17-jre

# De nuevo, trabajamos en /app dentro del contenedor.
WORKDIR /app

# Copiamos el .jar que se generó en la etapa anterior.
# "build" es el nombre que le pusimos arriba con "AS build".
# El .jar siempre se llama: <artifactId>-<version>.jar
# Revisa tu pom.xml para confirmar el nombre exacto.
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Le decimos a Docker que esta aplicación usa el puerto 8080.
# Esto no abre el puerto, es solo documentación para Render.
EXPOSE 8080

# El comando que se ejecuta cuando el contenedor arranca.
# Equivale a escribir: java -jar app.jar en la terminal.
ENTRYPOINT ["java", "-jar", "app.jar"]