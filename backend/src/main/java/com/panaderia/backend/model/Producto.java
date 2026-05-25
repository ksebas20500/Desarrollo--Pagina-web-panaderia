package com.panaderia.backend.model;

/**
 * Modelo de datos de un Producto.
 *
 * NOTA: Ya no usamos anotaciones JPA (@Entity, @Table, etc.)
 * porque la base de datos ahora es Cloud Firestore, no SQLite.
 * Esta clase es un POJO simple que representa un documento de Firestore.
 */
public class Producto {

    // En Firestore los IDs son Strings alfanuméricos (ej: "abc123xyz")
    // Antes era Long porque SQLite usaba números autoincrementales
    private String id;

    private String nombre;
    private Double precio;
    private String categoria;
    private String descripcion;

    // Las imágenes se guardan como texto Base64
    private String imagen;

    // Estado del producto (true = visible en el sitio)
    private Boolean activo = true;

    // Disponibilidad por sede
    private Boolean sedeAniversario = true;
    private Boolean sedeGarcia = true;
    private Boolean sedeMagdalena = true;

    // Constructor vacío obligatorio
    public Producto() {}

    // --- Getters y Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public Boolean getSedeAniversario() { return sedeAniversario; }
    public void setSedeAniversario(Boolean sedeAniversario) { this.sedeAniversario = sedeAniversario; }

    public Boolean getSedeGarcia() { return sedeGarcia; }
    public void setSedeGarcia(Boolean sedeGarcia) { this.sedeGarcia = sedeGarcia; }

    public Boolean getSedeMagdalena() { return sedeMagdalena; }
    public void setSedeMagdalena(Boolean sedeMagdalena) { this.sedeMagdalena = sedeMagdalena; }
}