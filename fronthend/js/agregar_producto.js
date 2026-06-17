document.addEventListener('DOMContentLoaded', async () => {
    const formulario = document.getElementById('form-producto');
    let imagenBase64 = ""; 

    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    // ─────────────────────────────────────────
    // Utilidad: Comprimir imagen antes de Base64
    // ─────────────────────────────────────────
    function comprimirImagen(file, maxWidth = 900, calidad = 0.75) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    resolve(canvas.toDataURL('image/jpeg', calidad));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    if (productoId) {
        const tituloPagina = document.querySelector('.page-title');
        const botonGuardar = document.querySelector('.form-actions .btn-primary');
        if (tituloPagina) tituloPagina.textContent = "Editar Producto";
        if (botonGuardar) botonGuardar.textContent = "Guardar Cambios";

        try {
            const response = await fetch(`${API_BASE_URL}/api/productos/${productoId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
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
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            alert("No se pudo cargar la información del producto.");
        }
    }

    const inputImagen = document.getElementById('imagen');
    if (inputImagen) {
        inputImagen.addEventListener('change', async function (event) {
            const file = event.target.files[0];
            if (file) {
                // Comprimir la imagen antes de guardarla como Base64
                imagenBase64 = await comprimirImagen(file);

                document.getElementById('preview-imagen').src = imagenBase64;
                document.getElementById('preview-container').style.display = 'block';
                document.getElementById('upload-box').style.display = 'none';
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

            const activoToggle = document.getElementById('activo');
            const productoPayload = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                precio: parseFloat(document.getElementById('precio').value),
                categoria: document.getElementById('categoria').value,
                sedeAniversario: document.getElementById('sede-aniversario').checked,
                sedeGarcia: document.getElementById('sede-garcia').checked,
                sedeMagdalena: document.getElementById('sede-magdalena').checked,
                imagen: imagenBase64,
                activo: activoToggle ? activoToggle.checked : true
            };

            try {
                let response;
                if (productoId) {
                    response = await fetch(`${API_BASE_URL}/api/productos/${productoId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productoPayload)
                    });
                } else {
                    response = await fetch(`${API_BASE_URL}/api/productos`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productoPayload)
                    });
                }

                if (!response.ok) {
                    // Intentar leer el mensaje de error real del servidor
                    let mensajeServidor = `Error del servidor (${response.status})`;
                    try {
                        const errorData = await response.json();
                        mensajeServidor = errorData.error || errorData.message || mensajeServidor;
                    } catch (_) { /* el cuerpo no es JSON, ignorar */ }
                    throw new Error(mensajeServidor);
                }

                alert(productoId ? '¡Producto actualizado exitosamente!' : '¡Producto creado exitosamente!');
                window.location.href = 'productos.html';
            } catch (error) {
                console.error("Error al guardar en el backend Java:", error);
                alert(`Error al guardar el producto:\n${error.message}`);
            }
        });
    }
});