const LOCAL_STORAGE_KEY = 'panaderia_productos';

function obtenerProductosLS() {
    const productos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return productos ? JSON.parse(productos) : [];
}

function guardarProductosLS(productos) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productos));
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-producto');
    let imagenBase64 = ""; 

    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    if (productoId) {
        const tituloPagina = document.querySelector('.page-title');
        const botonGuardar = document.querySelector('.form-actions .btn-primary');
        if (tituloPagina) tituloPagina.textContent = "Editar Producto";
        if (botonGuardar) botonGuardar.textContent = "Guardar Cambios";

        const productos = obtenerProductosLS();
        const data = productos.find(p => p.id == productoId);

        if (data) {
            document.getElementById('nombre').value = data.nombre;
            if (data.descripcion) {
                document.getElementById('descripcion').value = data.descripcion;
            }
            document.getElementById('precio').value = data.precio;
            document.getElementById('categoria').value = data.categoria;

            if (data.sedeAniversario !== undefined) document.getElementById('sede-aniversario').checked = data.sedeAniversario;
            if (data.sedeGarcia !== undefined) document.getElementById('sede-garcia').checked = data.sedeGarcia;
            if (data.sedeMagdalena !== undefined) document.getElementById('sede-magdalena').checked = data.sedeMagdalena;

            if (data.imagen) {
                imagenBase64 = data.imagen; 
                document.getElementById('preview-imagen').src = imagenBase64;
                document.getElementById('preview-container').style.display = 'block';
                document.getElementById('upload-box').style.display = 'none';
            }
        }
    }


    const inputImagen = document.getElementById('imagen');
    if (inputImagen) {
        inputImagen.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagenBase64 = e.target.result; 

                    document.getElementById('preview-imagen').src = imagenBase64;
                    document.getElementById('preview-container').style.display = 'block';

                    document.getElementById('upload-box').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const btnRemoveImagen = document.getElementById('btn-remove-imagen');
    if (btnRemoveImagen) {
        btnRemoveImagen.addEventListener('click', (e) => {
            e.stopPropagation(); 
            e.preventDefault();
            imagenBase64 = null;
            if (inputImagen) inputImagen.value = ""; 
            document.getElementById('preview-container').style.display = 'none';
            document.getElementById('preview-imagen').src = "";
            document.getElementById('upload-box').style.display = 'flex';
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();

            const productoPayload = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                precio: parseFloat(document.getElementById('precio').value),
                categoria: document.getElementById('categoria').value,
                sedeAniversario: document.getElementById('sede-aniversario').checked,
                sedeGarcia: document.getElementById('sede-garcia').checked,
                sedeMagdalena: document.getElementById('sede-magdalena').checked,
                imagen: imagenBase64,
                activo: true
            };

            let productos = obtenerProductosLS();

            if (productoId) {
                productoPayload.id = parseInt(productoId);
                const index = productos.findIndex(p => p.id == productoId);
                if (index !== -1) {
                    productoPayload.activo = productos[index].activo;
                    productos[index] = productoPayload;
                }
            } else {
                productoPayload.id = Date.now();
                productos.push(productoPayload);
            }

            guardarProductosLS(productos);

            alert(`¡Producto ${productoId ? 'actualizado' : 'creado'} exitosamente!`);
            window.location.href = 'productos.html';
        });
    }
});