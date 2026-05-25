package com.panaderia.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void inicializarFirebase() throws IOException {

        // Solo inicializa si aún no hay ninguna instancia activa
        if (FirebaseApp.getApps().isEmpty()) {

            // Lee la ruta desde la variable de entorno que Render inyecta
            String credencialesPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");

            FileInputStream serviceAccount = new FileInputStream(credencialesPath);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
        }
    }
}