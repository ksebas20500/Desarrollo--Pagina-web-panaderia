# Guía Paso a Paso: Despliegue de Backend Spring Boot en Google Cloud Run

**Google Cloud Run** es una plataforma serverless excelente. Si tu base de datos de Firebase ya está en Google Cloud, desplegar tu backend en Cloud Run es una opción muy elegante y profesional.

---

## ⚠️ Requisito Crítico: Tarjeta de Crédito (Facturación)

Aunque Google Cloud Run tiene una capa gratuita enorme (2 millones de peticiones gratuitas al mes, lo que significa que este proyecto escolar costará **$0.00 USD**), Google exige **asociar una cuenta de facturación con una tarjeta de crédito** para poder activar el servicio. 
* Si ya tienes tu cuenta de facturación activa en Google Cloud, puedes continuar sin coste adicional.
* Si no quieres ingresar una tarjeta de crédito, te recomendamos usar **Render** (según la guía [RENDER_DEPLOY_GUIDE.md](file:///Users/ksebas/Documents/Desarrollo--Pagina-web-panaderia/documentacion/RENDER_DEPLOY_GUIDE.md)).

---

## 🌟 Ventaja de usar Cloud Run: Sin Claves Privadas

Al estar en la misma nube de Google, el backend de Spring Boot no necesita un archivo `serviceAccountKey.json`. Se conecta de forma automática y transparente a Firestore utilizando las credenciales por defecto del servicio (**Application Default Credentials**), lo que elimina el riesgo de filtrar claves de acceso.

---

## 🛠️ Paso a Paso para Desplegar en Cloud Run

### Paso 1: Instalar Google Cloud SDK (gcloud CLI)
Si no tienes la herramienta de comandos de Google Cloud instalada en tu terminal:

#### 🍎 En MacOS (usando Homebrew):
```bash
brew install --cask google-cloud-sdk
```

Una vez instalada, inicializa e inicia sesión en tu cuenta de Google:
```bash
gcloud init
```
*(Sigue las instrucciones en pantalla para iniciar sesión en tu navegador y seleccionar tu proyecto de Firebase)*.

---

### Paso 2: Habilitar las APIs Necesarias
Ejecuta el siguiente comando para activar los servicios de compilación y ejecución en tu proyecto:
```bash
gcloud services enable run.googleapis.com \
                       cloudbuild.googleapis.com \
                       artifactregistry.googleapis.com
```

---

### Paso 3: Desplegar desde la Terminal
Dado que tenemos un `Dockerfile` en la carpeta `backend`, Google Cloud puede compilar y desplegar tu aplicación con un solo comando.

Ejecuta esto desde la **raíz de tu proyecto**:
```bash
gcloud run deploy panaderia-backend \
  --source ./backend \
  --region us-east1 \
  --allow-unauthenticated \
  --set-env-vars FIREBASE_PROJECT_ID=desarrolo-panaderia-la-fabrica
```

#### ¿Qué hace este comando?
1. `--source ./backend`: Envía el código de tu carpeta backend a **Google Cloud Build** para compilar la imagen de Docker en la nube.
2. `--region us-east1`: Despliega el contenedor en el servidor de EE.UU. Este (cerca de tu base de datos).
3. `--allow-unauthenticated`: Hace que tu API sea de acceso público para que tu frontend pueda realizar peticiones.
4. `--set-env-vars`: Define el ID de tu proyecto de Firebase.

Cuando finalice, te dará una URL pública tipo:
`https://panaderia-backend-xxxxxx.a.run.app`

---

### Paso 4: Conectar el Frontend
1. Abre tu archivo [config.js](file:///Users/ksebas/Documents/Desarrollo--Pagina-web-panaderia/fronthend/js/config.js).
2. Reemplaza la URL de producción por tu URL de Cloud Run:
   ```javascript
   const API_BASE_URL = (
       window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       window.location.protocol === 'file:'
   ) 
   ? 'http://localhost:8080' 
   : 'https://panaderia-backend-xxxxxx.a.run.app'; // <--- URL de Cloud Run
   ```
