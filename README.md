# ✈️ FLYBONDI-LEIVA

Este es un proyecto de Node.js configurado con Webpack.

## 📁 Estructura del Proyecto

El proyecto sigue una estructura modular estándar para una aplicación front-end:

* `dist/`: Contiene los archivos de salida generados por Webpack, listos para producción (no subir al repositorio).
* `node_modules/`: Dependencias del proyecto instaladas vía npm (no subir al repositorio).
* `public/`: Archivos estáticos, como el `index.html` principal y `dataset.json`.
* `src/`: **Código fuente** principal de la aplicación.
    * `src/pages`, `src/routes`, `src/styles`, `src/templates`, `src/utils`: Organización del código.
* `.babelrc`: Configuración de Babel para la transpilación de JavaScript.
* `.gitignore`: Archivos y carpetas que Git debe ignorar (`node_modules/`, `dist/`, etc.).
* `package.json` / `package-lock.json`: Metadata del proyecto y lista de dependencias.
* `webpack.config.js`: Configuración del empaquetador de módulos Webpack.

## ⚙️ Requisitos

tener instalado [**Node.js** y **npm**](https://nodejs.org/es/).

## ▶️ Cómo Levantar el Proyecto

Sigue estos sencillos pasos para poner en marcha el entorno de desarrollo:

### 1. Clonar el Repositorio (si aplica)

```bash
git clone [URL_DEL_REPOSITORIO]
cd FLYBONDI-LEIVA

### 2. Instalar dependencias

npm install

### 3. Iniciar el desarrollo definido en el package.json

npm run dev
