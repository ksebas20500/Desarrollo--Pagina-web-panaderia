package com.panaderia.backend.controller;

import com.panaderia.backend.model.Producto;
import com.panaderia.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*") // Para que tu HTML pueda hablar con Java
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // MÉTODO 1: Trae todos los productos de la base de datos web_deria.db
    @GetMapping
    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }

    // MÉTODO 1.5: Trae un solo producto por su ID (útil para la página de editar)
    @GetMapping("/{id}")
    public Producto getProductoPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id " + id));
    }

    // MÉTODO 2: Recibe un producto del formulario y lo guarda en la base de datos
    @PostMapping
    public Producto crearProducto(@RequestBody Producto nuevoProducto) {
        return productoRepository.save(nuevoProducto);
    }

    // MÉTODO 3: Elimina un producto por su ID permanentemente
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }

    // MÉTODO 4: Actualiza la información de un producto existente (Editar)
    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        // Busca en la base de datos el producto con ese ID, si lo encuentra modifica sus datos.
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setCategoria(productoActualizado.getCategoria());
            if (productoActualizado.getImagen() != null) {
                producto.setImagen(productoActualizado.getImagen());
            }
            return productoRepository.save(producto);
        }).orElseThrow(() -> new RuntimeException("Producto no encontrado con id " + id)); // Error si el ID no existe
    }

    // MÉTODO 5: Cambia únicamente el estado activo/inactivo (Activar/Desactivar)
    @PatchMapping("/{id}/estado")
    public Producto cambiarEstado(@PathVariable Long id, @RequestBody Boolean activo) {
        return productoRepository.findById(id).map(producto -> {
            producto.setActivo(activo);
            return productoRepository.save(producto);
        }).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }
}