// Configuración global del API
// Si el frontend se ejecuta localmente (o desde archivos locales), apunta a localhost:8080.
// Si se despliega en producción, apunta a la URL del backend alojado en Koyeb.
const API_BASE_URL = (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:'
)
    ? 'http://localhost:8080'
    : 'https://desarrollo-pagina-web-panaderia.onrender.com'; // ← URL correcta de Render