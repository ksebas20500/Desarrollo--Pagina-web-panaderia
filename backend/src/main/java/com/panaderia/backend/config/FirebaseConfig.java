package com.panaderia.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.path:src/main/resources/serviceAccountKey.json}")
    private String credencialesPath;

    @PostConstruct
    public void inicializarFirebase() throws IOException {

        // Solo inicializa si aún no hay ninguna instancia activa
        if (FirebaseApp.getApps().isEmpty()) {

            // Primero intenta con la variable de entorno GOOGLE_APPLICATION_CREDENTIALS,
            // si no existe, usa el path del application.properties
            String envPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
            String pathFinal = (envPath != null && !envPath.isEmpty()) ? envPath : credencialesPath;

            InputStream serviceAccount = new FileInputStream(pathFinal);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
        }
    }
}