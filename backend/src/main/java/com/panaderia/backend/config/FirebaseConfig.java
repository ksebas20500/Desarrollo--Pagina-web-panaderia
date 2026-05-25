package com.panaderia.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Configuración de Firebase Admin SDK.
 *
 * Esta clase se ejecuta automáticamente al arrancar Spring Boot (@PostConstruct).
 * Inicializa la conexión con Firebase usando las credenciales de la cuenta de servicio.
 *
 * En LOCAL: Lee el archivo serviceAccountKey.json de resources/
 * En KOYEB: Lee la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
 */
@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.path}")
    private String credentialsPath;

    @Value("${firebase.project.id}")
    private String projectId;

    @PostConstruct
    public void initializeFirebase() throws IOException {
        // Evitar inicializar Firebase dos veces
        if (!FirebaseApp.getApps().isEmpty()) {
            return;
        }

        FirebaseOptions options;
        String envCredentials = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");

        if (envCredentials != null && !envCredentials.isEmpty()) {
            InputStream serviceAccount = new FileInputStream(envCredentials);
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId(projectId)
                    .build();
        } else {
            // Intentar usar las credenciales por defecto de la aplicación (ej: en Google Cloud Run)
            GoogleCredentials credentials;
            try {
                credentials = GoogleCredentials.getApplicationDefault();
                System.out.println("ℹ️ Usando Application Default Credentials (ADC) de Google Cloud.");
            } catch (IOException e) {
                // Fallback para desarrollo local si no se encuentran las de Google Cloud
                System.out.println("ℹ️ No se detectaron credenciales por defecto. Cargando archivo local: " + credentialsPath);
                InputStream serviceAccount = new FileInputStream(credentialsPath);
                credentials = GoogleCredentials.fromStream(serviceAccount);
            }
            options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .setProjectId(projectId)
                    .build();
        }

        FirebaseApp.initializeApp(options);
        System.out.println("✅ Firebase Admin SDK inicializado correctamente para proyecto: " + projectId);
    }
}
