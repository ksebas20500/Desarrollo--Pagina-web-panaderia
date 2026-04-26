document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener la categoría de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria') || 'todos'; // Por defecto todos

    // 2. Modificar el título de la página (se hace en la función)
    
    // 3. Cargar los productos desde el backend
    cargarProductosPorCategoria(categoria);

    // 4. Marcar botón de categoría activo
    marcarCategoriaActiva(categoria);

    // Event listeners para el modal
    document.getElementById('close-modal').addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic por fuera
    document.getElementById('whatsapp-modal').addEventListener('click', (e) => {
        if (e.target.id === 'whatsapp-modal') {
            cerrarModal();
        }
    });
});

let cacheProductos = {};
let db;

async function cargarProductosPorCategoria(categoria) {
    if (!db) db = firebase.firestore();
    const gridContainer = document.getElementById('products-grid-container');
    
    try {
        let querySnapshot;
        if (categoria === 'todos') {
            document.getElementById('page-title').textContent = 'Todos los Productos';
            querySnapshot = await db.collection('productos').get();
        } else {
            const categoriaFormat = categoria.charAt(0).toUpperCase() + categoria.toLowerCase().slice(1);
            document.getElementById('page-title').textContent = categoriaFormat;
            querySnapshot = await db.collection('productos')
                .where('categoria', '==', categoriaFormat)
                .get();
        }
            
        const productos = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            // Filtrar inactivos (solo mostrar si activo es true o undefined por compatibilidad)
            if (data.activo !== false) {
                productos.push({ id: doc.id, ...data });
            }
        });
        
        // Limpiamos el loader
        gridContainer.innerHTML = '';
        
        if (productos.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <h3>¡Próximamente!</h3>
                    <p>Actualmente no contamos con productos disponibles en la categoría de <strong>${categoria}</strong>. Vuelve más tarde.</p>
                </div>
            `;
            return;
        }

        // Renderizamos cada producto
        productos.forEach(producto => {
            cacheProductos[producto.id] = producto;
            const imgSrc = producto.imagen ? producto.imagen : '../imagen/placeholder.jpg';
            const descripcion = producto.descripcion ? producto.descripcion : 'Delicioso producto elaborado artesanalmente.';
            
            const cardHtml = `
                <div class="product-card">
                    <img src="${imgSrc}" alt="${producto.nombre}" class="product-image">
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <p class="product-desc">${descripcion}</p>
                        
                        <div style="margin-top: auto;">
                            <!-- Precio en negrita y color primario -->
                            <p style="font-size: 20px; font-weight: bold; color: var(--primary-brown); margin-bottom: 15px;">
                                $${producto.precio.toFixed(2)}
                            </p>
                            
                            <!-- Botón para pedir por WP -->
                            <button class="btn-outline" onclick="abrirModalPedido('${producto.id}')">
                                Pedir por WhatsApp 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            gridContainer.innerHTML += cardHtml;
        });

    } catch (error) {
        console.error("Error al cargar productos de Firestore:", error);
        gridContainer.innerHTML = `
            <div class="empty-state">
                <p>Ocurrió un error al cargar los productos. Por favor intenta recargar la página.</p>
            </div>
        `;
    }
}

// Función para resaltar el botón de la categoría actual
function marcarCategoriaActiva(categoria) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === categoria) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Lógica del Modal de WhatsApp

function abrirModalPedido(idProducto) {
    const producto = cacheProductos[idProducto];
    if (!producto) return;
    
    document.getElementById('product-name-modal').textContent = producto.nombre;
    const container = document.getElementById('botones-sedes-container');
    container.innerHTML = ''; // Limpiar botones anteriores

    // Icono genérico de WP
    const wpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;

    // Si sedeAniversario es null/undefined, lo tomamos como true por compatibilidad
    if (producto.sedeAniversario !== false) {
        container.innerHTML += `
            <a href="#" class="whatsapp-btn" onclick="openWhatsApp('Aniversario2', '${producto.nombre}')">
                ${wpIcon} Sede Aniversario 2
            </a>`;
    }
    if (producto.sedeGarcia !== false) {
        container.innerHTML += `
            <a href="#" class="whatsapp-btn" onclick="openWhatsApp('Garcia', '${producto.nombre}')">
                ${wpIcon} Sede García Herreros
            </a>`;
    }
    if (producto.sedeMagdalena !== false) {
        container.innerHTML += `
            <a href="#" class="whatsapp-btn" onclick="openWhatsApp('Magdalena', '${producto.nombre}')">
                ${wpIcon} Sede Magdalena
            </a>`;
    }

    if (container.innerHTML === '') {
        container.innerHTML = '<p style="color:#665b55; margin-bottom: 20px;">Este producto no se encuentra disponible temporalmente en ninguna sede.</p>';
    }

    document.getElementById('whatsapp-modal').classList.add('active');
}

function cerrarModal() {
    document.getElementById('whatsapp-modal').classList.remove('active');
}

function openWhatsApp(idSede, nombreProducto) {
    const productEncoded = encodeURIComponent(nombreProducto);
    let url = "";

    switch(idSede) {
        case 'Aniversario2':
            url = `https://api.whatsapp.com/send?phone=573215540852&text=Hola%2C%20quisiera%20pedir:%20${productEncoded}`;
            break;
        case 'Garcia':
            url = `https://api.whatsapp.com/send?phone=573209231806&text=Hola%2C%20quisiera%20pedir:%20${productEncoded}`;
            break;
        case 'Magdalena':
            url = `https://api.whatsapp.com/send?phone=573215540853&text=Hola%2C%20quisiera%20pedir:%20${productEncoded}`;
            break;
    }
    
    window.open(url, '_blank');
}
