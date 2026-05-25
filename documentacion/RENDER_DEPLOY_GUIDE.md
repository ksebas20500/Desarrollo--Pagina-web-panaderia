# Guía Paso a Paso: Despliegue de Backend Spring Boot en Render con Firebase

Esta guía explica cómo desplegar tu aplicación backend de **Java con Spring Boot** y conectarla de forma segura a **Google Cloud Firestore (Firebase)** utilizando **Render**, que ofrece un plan gratuito y **no requiere ingresar tarjeta de crédito**.

---

## 1. ¿Por qué usamos Render?
* **100% Gratis sin Tarjeta**: Puedes registrarte e iniciar tu servicio sin dar ningún dato bancario.
* **Soporte Docker**: Render lee el `Dockerfile` de tu proyecto y lo compila automáticamente.
* **Fácil configuración de Secretos**: Permite subir el archivo `serviceAccountKey.json` de forma segura mediante un "Secret File".

> [!NOTE]
> **Limitación del Plan Gratuito**: Los servicios gratuitos de Render se "duermen" tras 15 minutos de inactividad. La primera petición después de este periodo tardará unos 50-60 segundos en responder mientras el contenedor se despierta. Para proyectos de clase o portafolios esto es perfectamente aceptable.

---

## 2. Requisitos Previos

Asegúrate de tener:
1. **Cuenta en GitHub** con el código de tu proyecto subido.
2. **Cuenta gratuita en Render** (regístrate usando tu cuenta de GitHub para facilitar la conexión).
3. **Archivo de Credenciales Privadas** (`serviceAccountKey.json`) de tu proyecto Firebase.

---

## 3. Paso a Paso para el Despliegue en Render

### Paso 3.1: Crear el Servicio Web en Render
1. Ve al dashboard de [Render](https://dashboard.render.com/) e inicia sesión.
2. Haz clic en el botón **New +** (arriba a la derecha) y selecciona **Web Service**.
3. Selecciona **Build and deploy from a Git repository** y haz clic en **Next**.
4. Conecta tu cuenta de GitHub (si no lo has hecho) y selecciona tu repositorio `Desarrollo--Pagina-web-panaderia`.

---

### Paso 3.2: Configurar los Parámetros del Servicio
En el formulario de creación, configura los siguientes campos:

1. **Name**: Dale un nombre a tu backend (ej. `panaderia-backend-la-fabrica`).
2. **Region**: Elige la más cercana a ti (ej. `Ohio (US East)` o `Oregon (US West)`).
3. **Branch**: `main` (o la rama donde tengas tu código actualizado).
4. **Root Directory**: Escribe `backend` (esto es **muy importante** porque allí se encuentran el `Dockerfile` y el código de Spring Boot).
5. **Runtime**: Selecciona **Docker** (Render detectará automáticamente el `Dockerfile` dentro de la carpeta `backend`).
6. **Instance Type**: Asegúrate de seleccionar el plan **Free** ($0/month).

---

### Paso 3.3: Configurar Secretos y Variables de Entorno
No hagas clic en crear todavía. Desplázate hacia abajo hasta la sección **Advanced** (o haz clic en ella para expandirla):

#### A. Crear el archivo Secreto (Secret File)
Dado que el archivo `serviceAccountKey.json` no está en GitHub, lo subiremos directamente a Render:
1. Haz clic en **Add Secret File**.
2. **Filename**: escribe exactamente `serviceAccountKey.json`.
3. **Contents**: abre tu archivo `serviceAccountKey.json` local con un editor de texto, copia **todo el texto (JSON)** y pégalo aquí.

> [!IMPORTANT]
> Render guardará este archivo de forma segura en el servidor en la ruta: `/etc/secrets/serviceAccountKey.json`.

#### B. Agregar Variables de Entorno
Haz clic en **Add Environment Variable** para agregar estas dos:

1. **`FIREBASE_PROJECT_ID`**:
   * *Key*: `FIREBASE_PROJECT_ID`
   * *Value*: El ID de tu proyecto de Firebase (ej. `desarrolo-panaderia-la-fabrica`).
2. **`GOOGLE_APPLICATION_CREDENTIALS`**:
   * *Key*: `GOOGLE_APPLICATION_CREDENTIALS`
   * *Value*: `/etc/secrets/serviceAccountKey.json` *(esta es la ruta donde Render monta el archivo secreto).*

---

### Paso 3.4: Crear y Desplegar
1. Desplázate al final del formulario y haz clic en **Create Web Service**.
2. Render comenzará a compilar tu aplicación usando Maven y Docker. Este primer despliegue puede tardar de 3 a 5 minutos.
3. Cuando el estado cambie a **Live** (en verde), tu backend estará listo y en línea.
4. En la parte superior izquierda verás la URL pública de tu backend, algo como: `https://panaderia-backend-la-fabrica.onrender.com`.

---

## 4. Conectar el Frontend a Render

Una vez que tengas la URL de Render:
1. Abre el archivo [config.js](file:///Users/ksebas/Documents/Desarrollo--Pagina-web-panaderia/fronthend/js/config.js) en tu editor.
2. Actualiza la última línea con tu URL de Render:
   ```javascript
   const API_BASE_URL = (
       window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       window.location.protocol === 'file:'
   ) 
   ? 'http://localhost:8080' 
   : 'https://panaderia-backend-la-fabrica.onrender.com'; // <--- Cambia esto por tu URL de Render
   ```

¡Listo! Cuando subas tu frontend a internet, se comunicará automáticamente con tu backend en Render.
