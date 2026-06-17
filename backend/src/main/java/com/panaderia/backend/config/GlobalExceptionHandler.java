package com.panaderia.backend.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

/**
 * Manejador global de excepciones.
 * Convierte errores internos en respuestas JSON descriptivas
 * en lugar de devolver un 500 genérico sin mensaje.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja el error cuando la imagen supera el tamaño máximo permitido.
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> handleMaxSizeException(MaxUploadSizeExceededException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "La imagen es demasiado grande. El límite es 20MB.");
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(error);
    }

    /**
     * Maneja cualquier otro error inesperado y devuelve el mensaje real
     * en vez de solo el código 500.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        ex.printStackTrace(); // Imprime el stack trace completo en los logs del servidor
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage() != null ? ex.getMessage() : "Error interno del servidor.");
        error.put("tipo", ex.getClass().getSimpleName());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
