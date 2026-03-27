package com.panaderia.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos") // Asegúrate que este nombre sea igual al del script SQL
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precio;
    private String categoria;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    // Campo que permite guardar imágenes grandes en texto (Base64)
    @Column(columnDefinition = "TEXT")
    private String imagen; 
    
    // Campo para saber si el producto está en venta (true) o inactivo (false)
    private Boolean activo = true;

    // Constructores vacíos obligatorios de Hibernate

    public Producto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    // Getters y Setters para el nuevo campo "activo"
    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}