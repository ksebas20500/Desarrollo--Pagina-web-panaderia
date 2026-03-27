document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-producto');
    let imagenBase64 = ""; // Aquí guardaremos la imagen convertida a texto

    // LEER PARÁMETRO ID PARA SABER SI ESTAMOS EDITANDO
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    // SI HAY ID, ES MODO EDICIÓN: CAMBIAR TÍTULOS Y RELLENAR DATOS
    if (productoId) {
        // Cambiar títulos visuales para que el usuario sepa que está editando
        const tituloPagina = document.querySelector('.page-title');
        const botonGuardar = document.querySelector('.form-actions .btn-primary');
        if (tituloPagina) tituloPagina.textContent = "Editar Producto";
        if (botonGuardar) botonGuardar.textContent = "Guardar Cambios";

        // Obtener datos del producto desde el backend
        fetch(`http://localhost:8080/api/productos/${productoId}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('nombre').value = data.nombre;
                if (data.descripcion) {
                    document.getElementById('descripcion').value = data.descripcion;
                }
                document.getElementById('precio').value = data.precio;
                document.getElementById('categoria').value = data.categoria;

                if (data.imagen) {
                    imagenBase64 = data.imagen; // Guardar la imagen original por si no sube otra
                    document.getElementById('preview-imagen').src = imagenBase64;
                    document.getElementById('preview-container').style.display = 'block';
                    document.getElementById('upload-box').style.display = 'none';
                }
            })
            .catch(err => console.error("Error cargando producto para edición:", err));
    }


    // 1. LÓGICA PARA LEER LA NUEVA IMAGEN Y MOSTRAR VISTA PREVIA
    const inputImagen = document.getElementById('imagen');
    if (inputImagen) {
        inputImagen.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {

                // Usamos FileReader para convertir la imagen a Base64
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagenBase64 = e.target.result; // Listo, ya es texto

                    // Mostramos la foto en el cuadrito
                    document.getElementById('preview-imagen').src = imagenBase64;
                    document.getElementById('preview-container').style.display = 'block';

                    // Ocultamos el ícono SVG y el texto para que se vea más limpio
                    document.getElementById('upload-box').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // BOTÓN PARA QUITAR IMAGEN
    const btnRemoveImagen = document.getElementById('btn-remove-imagen');
    if (btnRemoveImagen) {
        btnRemoveImagen.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se dispare el click del label/upload box
            e.preventDefault();
            imagenBase64 = null;
            if (inputImagen) inputImagen.value = ""; // Limpiar input file
            document.getElementById('preview-container').style.display = 'none';
            document.getElementById('preview-imagen').src = "";
            document.getElementById('upload-box').style.display = 'flex';
        });
    }

    // 2. LÓGICA PARA ENVIAR AL BACKEND (CREAR O ACTUALIZAR)
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Incluimos la variable imagenBase64 en nuestro JSON
            const productoPayload = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                precio: parseFloat(document.getElementById('precio').value),
                categoria: document.getElementById('categoria').value,
                imagen: imagenBase64
            };

            // Determinar la URL y el Método
            // Si hay productoId, hacemos PUT a /api/productos/{id}
            // Si NO hay productoId, hacemos POST a /api/productos/
            const url = productoId
                ? `http://localhost:8080/api/productos/${productoId}`
                : 'http://localhost:8080/api/productos';
            const metodoFetch = productoId ? 'PUT' : 'POST';

            try {
                const respuesta = await fetch(url, {
                    method: metodoFetch,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productoPayload)
                });

                if (respuesta.ok) {
                    alert(`¡Producto ${productoId ? 'actualizado' : 'creado'} exitosamente!`);
                    // Siempre redirige a productos.html al guardar
                    window.location.href = 'productos.html';
                } else {
                    alert("Error al guardar el producto.");
                }
            } catch (error) {
                console.error("Error conectando con Java:", error);
            }
        });
    }
});