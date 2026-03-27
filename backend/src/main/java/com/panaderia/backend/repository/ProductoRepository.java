package com.panaderia.backend.repository;

import com.panaderia.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Esto hereda automáticamente todos los métodos para leer la base de datos
}