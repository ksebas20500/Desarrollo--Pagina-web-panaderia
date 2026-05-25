package com.panaderia.backend.controller;

import com.panaderia.backend.model.Producto;
import com.panaderia.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*") // Para que tu HTML pueda hablar con Java
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // MÉTODO 1: Trae todos los productos de Firestore
    @GetMapping
    public List<Producto> getProductos() throws Exception {
        return productoService.obtenerTodos();
    }

    // MÉTODO NUEVO: Trae productos filtrados por categoría y que estén activos
    @GetMapping("/categoria/{categoria}")
    public List<Producto> getProductosPorCategoria(@PathVariable String categoria) throws Exception {
        return productoService.obtenerPorCategoria(categoria);
    }

    // MÉTODO 1.5: Trae un solo producto por su ID (útil para la página de editar)
    @GetMapping("/{id}")
    public Producto getProductoPorId(@PathVariable String id) throws Exception {
        return productoService.obtenerPorId(id);
    }

    // MÉTODO 2: Recibe un producto del formulario y lo guarda en Firestore
    @PostMapping
    public Producto crearProducto(@RequestBody Producto nuevoProducto) throws Exception {
        return productoService.crear(nuevoProducto);
    }

    // MÉTODO 3: Elimina un producto por su ID permanentemente
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable String id) throws Exception {
        productoService.eliminar(id);
    }

    // MÉTODO 4: Actualiza la información de un producto existente (Editar)
    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable String id, @RequestBody Producto productoActualizado) throws Exception {
        return productoService.actualizar(id, productoActualizado);
    }

    // MÉTODO 5: Cambia únicamente el estado activo/inactivo (Activar/Desactivar)
    @PatchMapping("/{id}/estado")
    public Producto cambiarEstado(@PathVariable String id, @RequestBody Boolean activo) throws Exception {
        productoService.cambiarEstado(id, activo);
        return productoService.obtenerPorId(id);
    }
}