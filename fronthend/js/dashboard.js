const db = firebase.firestore();

async function cargarDatosDashboard() {
    try {
        const querySnapshot = await db.collection('productos').orderBy('fechaCreacion', 'desc').get();
        const productos = [];
        querySnapshot.forEach(doc => {
            productos.push({ id: doc.id, ...doc.data() });
        });

        // 1. Contar estadísticas
        const totalProductos = productos.length;
        const panesCount = productos.filter(p => p.categoria && p.categoria.toLowerCase() === 'panes').length;
        const tortasCount = productos.filter(p => p.categoria && (p.categoria.toLowerCase() === 'tortas' || p.categoria.toLowerCase() === 'pasteles')).length;
        const postresCount = productos.filter(p => p.categoria && p.categoria.toLowerCase() === 'postres').length;

        // 2. Actualizar el DOM
        document.getElementById('stat-total-productos').textContent = totalProductos;
        document.getElementById('stat-panes').textContent = panesCount;
        document.getElementById('stat-tortas').textContent = tortasCount;
        document.getElementById('stat-postres').textContent = postresCount;

        // 3. Mostrar productos recientes (tabla)
        const emptyState = document.getElementById('recent-empty-state');
        const recentTableContainer = document.getElementById('recent-table-container');
        const tablaBody = document.getElementById('recent-table-body');

        if (productos.length > 0) {
            emptyState.style.display = 'none';
            recentTableContainer.style.display = 'block';
            tablaBody.innerHTML = '';

            // Tomar los últimos 5 productos
            const productosRecientes = productos.slice(0, 5);

            productosRecientes.forEach(p => {
                const imagenHtml = p.imagen
                    ? `<img src="${p.imagen}" alt="${p.nombre}" class="table-product-img" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">`
                    : `<div class="table-product-placeholder" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #eee; border-radius: 4px; font-size: 10px;">Sin foto</div>`;

                tablaBody.innerHTML += `
                        <tr class="table-row">
                            <td style="padding: 12px 24px;">
                                <div class="table-product-info" style="gap: 12px; display: flex; align-items: center;">
                                    ${imagenHtml}
                                    <div>
                                        <div class="table-product-title" style="font-size: 14px; margin-bottom: 2px; font-weight: 600;">${p.nombre}</div>
                                        <div class="table-product-subtitle" style="font-size: 12px; color: #666;">${p.categoria || 'Sin categoría'}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="table-price" style="text-align: right; padding: 12px 24px; font-weight: 500;">
                                $${p.precio ? p.precio.toFixed(2) : '0.00'}
                            </td>
                        </tr>
                        `;
            });
        } else {
            emptyState.style.display = 'flex';
            recentTableContainer.style.display = 'none';
        }

    } catch (error) {
        console.error("Error conectando con Firestore:", error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosDashboard);
