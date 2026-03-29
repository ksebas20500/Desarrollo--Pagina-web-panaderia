package com.panaderia.backend.repository;

import com.panaderia.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Método para filtrar rápidamente por categoría y que el producto esté activo
    List<Producto> findByCategoriaIgnoreCaseAndActivoTrue(String categoria);
}