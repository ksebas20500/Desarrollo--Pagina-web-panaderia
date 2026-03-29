<<<<<<< HEAD
# 🥖 La Fábrica - Panadería Artesanal
**El arte de hornear con pasión. Un sistema web completo para la gestión y venta de productos artesanales.**
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) 
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) 
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) 
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
---
## 📖 Descripción del Proyecto
**La Fábrica** es una plataforma web integral diseñada específicamente para una panadería artesanal con múltiples sucursales en Cúcuta. El proyecto no solo sirve como una atractiva vitrina digital para que los clientes exploren los deliciosos productos (panes, tortas, postres), sino que también cuenta con un potente **Panel de Administración (Dashboard Público-Privado)**. 
Desde este panel, los administradores pueden gestionar el inventario, subir fotos en alta calidad y controlar en tiempo real en cuáles de las sedes físicas está disponible cada ítem. Todo el flujo de intenciones de compra del cliente está inteligentemente conectado a la API de **WhatsApp Business**, centralizando y cerrando ventas de forma directa, ágil y personalizada dependiendo del lugar que elija el cliente.
---
## ✨ Características Funcionales
* 🛍️ **Catálogo Dinámico**: Visualización de los productos en formato cuadrícula responsiva con filtros por categorías en el nav-bar.
* 🏢 **Sistema Multi-Sucursal (Novedad)**: Posibilidad de asignar disponibilidad de inventario individual por producto. El sistema de la tienda oculta automáticamente aquel número de teléfono correspondiente a las sedes donde el producto haya sido marcado 'Sin Stock'.
* 📱 **Integración de Ventas por WhatsApp**: Transición sin fricciones. Se redirige la intención de compra del usuario al contacto adecuado (Aniversario 2, García Herreros, Magdalena) con un mensaje automático pre-formateado.
* 🔒 **Panel de Gestión de Productos**: Interfaz administrativa ágil y agradable para actualizar catálogos en vivo.
* ✏️ **Editor Complejo (CRUD)**: Creación, lectura, actualización masiva y eliminación de productos utilizando conversiones base64 de imágenes.
* ⚡ **Rendimiento Optimizado**: Backend programado para evitar trasiegos masivos de bytes; ahora responde rápidamente acudiendo a búsquedas filtradas en SQL antes de emitir respuesta.
---
## 🛠️ Tecnologías Usadas
El proyecto está diseñado sobre una sólida y moderna arquitectura Cliente-Servidor:
### Frontend (Interfaz de Usuario)
* **HTML5 & Vanilla CSS3**: Interfaces creadas desde cero aplicando flexbox y grid layout. Paleta de colores Premium cálida que evoca la estética de una panadería acogedora y un diseño UX minimalista.
* **Vanilla JavaScript (ES6)**: Peticiones fluidas e instantáneas apoyadas de `fetch()`, manipulación inteligente de vistas con JSONs y estado de ventanas modales.
### Backend (Lógica y Datos)
* **Java 17**: Lenguaje backend principal compilado, robusto y versátil aportando seguridad y organización.
* **Spring Boot (3.2.4)**: Framework para orquestación de la arquitectura RESTful API de forma rápida, recibiendo cruces de peticiones externas (CORS).
* **Spring Data JPA & Hibernate**: Implementación de mapeo de clases para gobernar las consultas y guardados sin inyección forzada de SQL, modernizando el código.
* **SQLite**: La capa base de datos, escogida por su inmensa ligereza y facilidad de traspaso en el mismo repositorio, residiendo en un simple archivo `web_deria.db`.
---

## 📂 Estructura de Carpetas
>>>>>>> 6a60299f7d66ed0ef1c8fdb96a68c4b97c0fa4f2
```text
pagina_web_panaderia/
│
├── backend/                   # ⚙️ Lógica del Servidor (API REST)
│   ├── src/main/java.../      # Código fuente Java (Controladores, Modelos, Repositorios JPA)
│   ├── src/main/resources/    # Configuración de base de datos (application.properties)
│   ├── pom.xml                # Dependencias de Maven (Instalador principal)
│   └── web_deria.db           # Base de Datos SQLite alojando el stock actual
│
└── fronthend/                 # 🎨 Interfaz de Usuario
    ├── css/                   # Hojas de estilo estructuradas generales y para admin
    ├── imagen/                # Recursos de marca (Logos, banners decorativos)
    ├── js/                    # Scripts de integración dinámica de las páginas
    │   ├── cargar_productos.js
    │   ├── agregar_producto.js
    │   └── productos.js
    └── page/                  # Conjunto de Vistas/Rutas HTML
        ├── index.html         # Landing page / Home de la panadería
        ├── productos.html     # Pizarra dinámica multi-filtro y multi-sucursal
        └── admin/             # 🔒 Zona interna (Gestión Operativa)
            ├── dashboard.html
            ├── productos.html # Vista tipo tabla control de stock
            └── nuevo-producto.html
```
<<<<<<< HEAD
---
## 🖼️ Vistazo al Proyecto
Para embellecer este documento oficial en Github, inserta en los siguientes corchetes las capturas de imagen reales del proyecto tomadas de tu computadora (recuerda que puedes simplemente 'Arrastrarlas' al editor de Github online en estos bloques):
> **1. Página Principal (Index)**  
> *(Arrastra y suelta aquí una foto de la zona principal del Index)*
> **2. Catálogo de Productos y Modal Selector de Sedes para WhatsApp**  
> *(Arrastra y suelta aquí una foto de la galería de tortas con la ventana de WhatsApp abierta)*
> **3. Interfaz de Administración y Multi-Sede**  
> *(Arrastra y suelta aquí una foto tuya rellenando las descripciones y eligiendo Checkboxes al crear la sede)*
---
## 📚 Documentación y Uso Local
Para poner este sistema en marcha en otra computadora y probar sus características, sigue este instructivo de instalación rápida:
### 1. Levantar el Backend
Para desplegar el cerebro de la aplicación es requisito tener instalado **Java JDK** y **Maven**.
=======
---
## 🖼️ Vistazo al Proyecto
Para embellecer este documento oficial en Github, inserta en los siguientes corchetes las capturas de imagen reales del proyecto tomadas de tu computadora (recuerda que puedes simplemente 'Arrastrarlas' al editor de Github online en estos bloques):
> **1. Página Principal (Index)**  
> *(Arrastra aquí una foto de la zona principal del Index)*
> **2. Catálogo de Productos y Modal Selector de Sedes para WhatsApp**  
> *(Arrastra aquí una foto de la galería de tortas con la ventana de WhatsApp abierta)*
> **3. Interfaz de Administración y Multi-Sede**  
> *(Arrastra aquí una foto tuya rellenando las descripciones y eligiendo Checkboxes al crear la sede)*
---
## 📚 Documentación y Uso Local
Para poner este sistema en marcha en otra computadora y probar sus características, sigue este instructivo de instalación rápida:
### 1. Levantar el Backend
Para desplegar el cerebro de la aplicación es requisito tener instalado **Java** JDK y **Maven**.
>>>>>>> 6a60299f7d66ed0ef1c8fdb96a68c4b97c0fa4f2
Abre tu consola de comandos en la carpeta raíz del proyecto y dirígete al backend:
```bash
cd backend
mvn spring-boot:run
```
Tras esto, el servicio rest permanecerá escuchando en el puerto `http://localhost:8080`. Comprobarás cómo JPA detecta y auto-conecta automáticamente con la base local proporcionada `web_deria.db`.
<<<<<<< HEAD
### 2. Levantar el Frontend
Por la estrictez moderna de políticas de CORS del bloque navegador al consumir las fotos Base64, despliega la capa Frontend simulando tu servidor de desarrollo temporal. 
* Puedes usar **Live Server** (extensión sugerida de Microsoft VS Code).
* Da click derecho al archivo `fronthend/page/index.html` → "Open with Live Server". ¡Y a hornear se ha dicho!
---
## 👥 Integrantes del Equipo Creador
Este proyecto universitario/formativo fue ideado, diseñado y llevado desde lo conceptual hasta el despliegue funcional del código por:
* **Kevin Sebastian Medina Nava**
* **Justin Javier Paez Torres**
* **Carlos Sebastian Antolinez Colorado**
---
_Desarrollado con ☕ y 🤎 para ofrecer la mejor experiencia digital en panadería artesanal._
=======
### 2. Levantar el Frontend
Por la estrictez moderna de políticas de CORS del bloque navegador al consumir las fotos Base64, despliega la capa Frontend simulando tu servidor de desarrollo temporal. 
- Puedes usar **Live Server** (extensión sugerida de Microsoft VS Code).
- Click derecho al archivo `/fronthend/page/index.html` → "Open with Live Server". ¡Y a hornear se ha dicho!
---
## 👥 Integrantes del Equipo Creador
Este proyecto universitario y formativo fue ideado, diseñado y llevado desde lo conceptual hasta el despliegue funcional del código por:
* **Kevin Sebastian Medina Nava**
* **Justin Javier Paez Torres**
* **Carlos Sebastian Antolinez Colorado**
---
<div align="center">
  <i>Desarrollado con ☕ y 🤎 para ofrecer la mejor experiencia digital en panadería artesanal.</i>
</div>
>>>>>>> 6a60299f7d66ed0ef1c8fdb96a68c4b97c0fa4f2