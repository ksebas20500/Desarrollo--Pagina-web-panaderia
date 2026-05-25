package com.panaderia.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.panaderia.backend.model.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Servicio que gestiona todas las operaciones CRUD sobre la colección
 * "productos" en Cloud Firestore.
 *
 * Reemplaza al ProductoRepository que antes usaba JPA/SQLite.
 */
@Service
public class ProductoService {

    // Nombre de la colección en Firestore (debe coincidir exactamente)
    private static final String COLECCION = "productos";

    /**
     * Obtiene la instancia de Firestore.
     * FirebaseConfig ya la inicializó al arrancar, así que solo la usamos.
     */
    private Firestore getDb() {
        return FirestoreClient.getFirestore();
    }

    // ─────────────────────────────────────────
    // LEER: Obtener todos los productos
    // ─────────────────────────────────────────
    public List<Producto> obtenerTodos() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = getDb()
                .collection(COLECCION)
                .orderBy("nombre")
                .get();

        List<Producto> productos = new ArrayList<>();
        for (DocumentSnapshot documento : future.get().getDocuments()) {
            Producto p = documentoAProducto(documento);
            productos.add(p);
        }
        return productos;
    }

    // ─────────────────────────────────────────
    // LEER: Obtener por categoría (solo activos)
    // ─────────────────────────────────────────
    public List<Producto> obtenerPorCategoria(String categoria) throws ExecutionException, InterruptedException {
        // Capitalizamos para coincidir con el formato guardado (ej: "Panes")
        String categoriaFormateada = categoria.substring(0, 1).toUpperCase() + categoria.substring(1).toLowerCase();

        ApiFuture<QuerySnapshot> future = getDb()
                .collection(COLECCION)
                .whereEqualTo("categoria", categoriaFormateada)
                .whereEqualTo("activo", true)
                .get();

        List<Producto> productos = new ArrayList<>();
        for (DocumentSnapshot documento : future.get().getDocuments()) {
            productos.add(documentoAProducto(documento));
        }
        return productos;
    }

    // ─────────────────────────────────────────
    // LEER: Obtener un producto por ID
    // ─────────────────────────────────────────
    public Producto obtenerPorId(String id) throws ExecutionException, InterruptedException {
        DocumentSnapshot documento = getDb()
                .collection(COLECCION)
                .document(id)
                .get()
                .get();

        if (!documento.exists()) {
            throw new RuntimeException("Producto no encontrado con id: " + id);
        }
        return documentoAProducto(documento);
    }

    // ─────────────────────────────────────────
    // CREAR: Agregar un nuevo producto
    // ─────────────────────────────────────────
    public Producto crear(Producto producto) throws ExecutionException, InterruptedException {
        Map<String, Object> datos = productoAMapa(producto);
        datos.put("fechaCreacion", FieldValue.serverTimestamp());

        // Firestore genera el ID automáticamente
        DocumentReference referencia = getDb().collection(COLECCION).document();
        referencia.set(datos).get();

        producto.setId(referencia.getId());
        return producto;
    }

    // ─────────────────────────────────────────
    // ACTUALIZAR: Editar un producto existente
    // ─────────────────────────────────────────
    public Producto actualizar(String id, Producto producto) throws ExecutionException, InterruptedException {
        // Verificar que existe
        obtenerPorId(id);

        Map<String, Object> datos = productoAMapa(producto);
        getDb().collection(COLECCION).document(id).set(datos, SetOptions.merge()).get();

        producto.setId(id);
        return producto;
    }

    // ─────────────────────────────────────────
    // CAMBIAR ESTADO: Activar / Desactivar
    // ─────────────────────────────────────────
    public void cambiarEstado(String id, Boolean activo) throws ExecutionException, InterruptedException {
        getDb().collection(COLECCION)
                .document(id)
                .update("activo", activo)
                .get();
    }

    // ─────────────────────────────────────────
    // ELIMINAR: Borrar un producto
    // ─────────────────────────────────────────
    public void eliminar(String id) throws ExecutionException, InterruptedException {
        getDb().collection(COLECCION).document(id).delete().get();
    }

    // ─────────────────────────────────────────
    // UTILIDADES: Conversión entre Firestore y Java
    // ─────────────────────────────────────────

    /**
     * Convierte un DocumentSnapshot de Firestore a un objeto Producto Java.
     */
    private Producto documentoAProducto(DocumentSnapshot doc) {
        Producto p = new Producto();
        p.setId(doc.getId());
        p.setNombre(doc.getString("nombre"));
        p.setDescripcion(doc.getString("descripcion"));
        p.setImagen(doc.getString("imagen"));
        p.setCategoria(doc.getString("categoria"));

        Double precio = doc.getDouble("precio");
        p.setPrecio(precio != null ? precio : 0.0);

        Boolean activo = doc.getBoolean("activo");
        p.setActivo(activo != null ? activo : true);

        Boolean sedeAniversario = doc.getBoolean("sedeAniversario");
        p.setSedeAniversario(sedeAniversario != null ? sedeAniversario : true);

        Boolean sedeGarcia = doc.getBoolean("sedeGarcia");
        p.setSedeGarcia(sedeGarcia != null ? sedeGarcia : true);

        Boolean sedeMagdalena = doc.getBoolean("sedeMagdalena");
        p.setSedeMagdalena(sedeMagdalena != null ? sedeMagdalena : true);

        return p;
    }

    /**
     * Convierte un objeto Producto Java a un Map para guardarlo en Firestore.
     */
    private Map<String, Object> productoAMapa(Producto p) {
        Map<String, Object> datos = new HashMap<>();
        datos.put("nombre", p.getNombre());
        datos.put("descripcion", p.getDescripcion());
        datos.put("precio", p.getPrecio());
        datos.put("categoria", p.getCategoria());
        datos.put("imagen", p.getImagen());
        datos.put("activo", p.getActivo() != null ? p.getActivo() : true);
        datos.put("sedeAniversario", p.getSedeAniversario() != null ? p.getSedeAniversario() : true);
        datos.put("sedeGarcia", p.getSedeGarcia() != null ? p.getSedeGarcia() : true);
        datos.put("sedeMagdalena", p.getSedeMagdalena() != null ? p.getSedeMagdalena() : true);
        return datos;
    }
}
