async function cargarDatosDashboard() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/productos');
        const productos = await respuesta.json();

        // 1. Contar estadísticas
        const totalProductos = productos.length;
        const panesCount = productos.filter(p => p.categoria.toLowerCase() === 'panes').length;
        const tortasCount = productos.filter(p => p.categoria.toLowerCase() === 'tortas' || p.categoria.toLowerCase() === 'pasteles').length;
        const postresCount = productos.filter(p => p.categoria.toLowerCase() === 'postres').length;

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

            // Tomar los últimos 5 productos (asumiendo que están en orden, podemos revertirlos)
            const productosRecientes = productos.slice().reverse().slice(0, 5);

            productosRecientes.forEach(p => {
                const imagenHtml = p.imagen
                    ? `<img src="${p.imagen}" alt="${p.nombre}" class="table-product-img" style="width: 40px; height: 40px;">`
                    : `<div class="table-product-placeholder" style="width: 40px; height: 40px;">Sin foto</div>`;

                tablaBody.innerHTML += `
                        <tr class="table-row">
                            <td style="padding: 12px 24px;">
                                <div class="table-product-info" style="gap: 12px;">
                                    ${imagenHtml}
                                    <div>
                                        <div class="table-product-title" style="font-size: 14px; margin-bottom: 2px;">${p.nombre}</div>
                                        <div class="table-product-subtitle" style="font-size: 12px;">${p.categoria}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="table-price" style="text-align: right; padding: 12px 24px;">
                                $${p.precio.toFixed(2)}
                            </td>
                        </tr>
                        `;
            });
        } else {
            emptyState.style.display = 'flex';
            recentTableContainer.style.display = 'none';
        }

    } catch (error) {
        console.error("Error conectando con el backend:", error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosDashboard);
