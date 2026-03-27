async function cargarProductos() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/productos');
        const productos = await respuesta.json();

        const tablaBody = document.getElementById('cuerpo-tabla');
        const contenedorTabla = document.getElementById('products-table-container');
        const mensajeVacio = document.getElementById('empty-products-msg');

        if (productos.length > 0) {
            mensajeVacio.style.display = 'none';
            contenedorTabla.style.display = 'block';
            tablaBody.innerHTML = '';

            productos.forEach(p => {
                // AQUÍ ESTÁ LA LÓGICA DE LA IMAGEN
                const imagenHtml = p.imagen
                    ? `<img src="${p.imagen}" alt="${p.nombre}" style="width:50px; height:50px; border-radius:8px; object-fit:cover; object-position:center; display:block;">`
                    : `<div class="table-product-placeholder">Sin foto</div>`;

                // Lógica del estado (Activo/Inactivo)
                // Si p.activo no está definido o es nulo, asumimos true por defecto (para productos viejos)
                const isActivo = p.activo !== false;
                
                const pillHtml = isActivo 
                    ? `<span class="pill-status" style="cursor:pointer;" onclick="cambiarEstado(${p.id}, false)" title="Haz clic para Desactivar">
                           <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"></circle></svg>
                           Activo
                       </span>`
                    : `<span class="pill-status" style="background-color:#fee2e2; color:#b91c1c; cursor:pointer;" onclick="cambiarEstado(${p.id}, true)" title="Haz clic para Activar">
                           <svg width="8" height="8" viewBox="0 0 24 24" fill="#b91c1c" stroke="none"><circle cx="12" cy="12" r="10"></circle></svg>
                           Inactivo
                       </span>`;

                tablaBody.innerHTML += `
                        <tr class="table-row">
                            <td>
                                <div class="table-product-info">
                                    ${imagenHtml}
                                    <div>
                                        <div class="table-product-title">${p.nombre}</div>
                                        <div class="table-product-subtitle">${p.descripcion ? p.descripcion : 'Categoría: ' + p.categoria}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="pill-category">${p.categoria}</span>
                            </td>
                            <td class="table-price">
                                $${p.precio.toFixed(2)}
                            </td>
                            <td>
                                ${pillHtml}
                            </td>
                            <td style="text-align: right;">
                                <div class="acciones-container">
                                    <button onclick="verProducto(${p.id})" class="btn-action view" title="Ver">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                    <button onclick="editarProducto(${p.id})" class="btn-action edit" title="Editar">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                    </button>
                                    <button onclick="eliminarProducto(${p.id})" class="btn-action delete" title="Eliminar">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        `;
            });
        } else {
            mensajeVacio.style.display = 'flex';
            contenedorTabla.style.display = 'none';
        }
    } catch (error) {
        console.error("Error conectando con el backend:", error);
    }
}

// LÓGICA DE ACTIONS (EDITAR, ELIMINAR, ESTADO)

// Función para Redirigir a Editar
function editarProducto(id) {
    // Redirigimos a la página del formulario enviando el ID por la URL
    window.location.href = `nuevo-producto.html?id=${id}`;
}

// Función para Eliminar Permanentemente
async function eliminarProducto(id) {
    const confirmacion = confirm("¿Estás seguro que deseas eliminar este producto permanentemente?");
    if (!confirmacion) return;

    try {
        const respuesta = await fetch(`http://localhost:8080/api/productos/${id}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            alert("Producto eliminado correctamente.");
            cargarProductos(); // Recargamos la tabla
        } else {
            alert("Hubo un error al intentar eliminar el producto.");
        }
    } catch (error) {
        console.error("Error eliminando:", error);
    }
}

// Función para Activar o Desactivar (Cambiar Estado)
async function cambiarEstado(id, nuevoEstado) {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/productos/${id}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEstado)
        });

        if (respuesta.ok) {
            cargarProductos(); // Recargamos para ver el cambio visual
        } else {
            alert("Error al cambiar el estado del producto.");
        }
    } catch (error) {
        console.error("Error cambiando estado:", error);
    }
}

// Función para VER producto en Modal Flotante
async function verProducto(id) {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/productos/${id}`);
        if(respuesta.ok){
            const data = await respuesta.json();
            
            // Llenar datos en el Modal HTML
            document.getElementById('modal-title').innerText = data.nombre;
            document.getElementById('modal-desc').innerText = data.descripcion ? data.descripcion : "Este producto no tiene una descripción detallada provista.";
            document.getElementById('modal-category').innerText = data.categoria;
            document.getElementById('modal-price').innerText = `$${data.precio.toFixed(2)}`;
            
            const imgEl = document.getElementById('modal-img');
            if(data.imagen){
                imgEl.src = data.imagen;
                imgEl.style.display = 'block';
            } else {
                imgEl.style.display = 'none'; // o cargar una imagen placeholder por defecto
            }

            // Mostrar el Modal
            document.getElementById('modal-ver').classList.add('active');
        } else {
            alert("Error al cargar los detalles del producto.");
        }
    } catch (error) {
         console.error("Error cargando detalles a ver:", error);
    }
}

// Cerrar Modal
function cerrarModal() {
    document.getElementById('modal-ver').classList.remove('active');
}

// Ejecutar la función principal cuando el documento cargue
document.addEventListener('DOMContentLoaded', cargarProductos);