// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("El sitio web de La Fábrica está cargado correctamente.");

    // Aquí agregaremos la interactividad más adelante:
    // - Menú desplegable en teléfonos móviles
    // - Lógica para mostrar los productos del catálogo
});
setInterval(() => {
    fetch('https://desarrollo-pagina-web-panaderia.onrender.com/api/productos')
        .catch(() => { }); // silencioso
}, 600000);