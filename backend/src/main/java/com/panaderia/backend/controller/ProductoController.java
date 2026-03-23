package com.panaderia.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @GetMapping
    public List<Map<String, Object>> getProductos() {
        List<Map<String, Object>> productos = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("id", 1);
        p1.put("nombre", "Pan Francés");
        p1.put("precio", 0.50);
        p1.put("categoria", "Panes");

        Map<String, Object> p2 = new HashMap<>();
        p2.put("id", 2);
        p2.put("nombre", "Croissant");
        p2.put("precio", 1.50);
        p2.put("categoria", "Bollería");

        Map<String, Object> p3 = new HashMap<>();
        p3.put("id", 3);
        p3.put("nombre", "Torta de Chocolate");
        p3.put("precio", 15.00);
        p3.put("categoria", "Tortas");

        productos.add(p1);
        productos.add(p2);
        productos.add(p3);

        return productos;
    }
}
