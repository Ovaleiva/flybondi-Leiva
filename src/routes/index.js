// Importamos los templates y páginas
import Header from '../templates/Header';
import Home from '../pages/Home';
import Launch from '../pages/Launch';
import Error404 from '../pages/Error404';

// Importamos utilidades para manejar rutas
import getHash from '../utils/getHash';
import resolveRoutes from '../utils/resolveRoutes';

// Definimos el mapa de rutas de la SPA
const routes = {
  '/': Home,       // Página principal → lista lanzamientos
  '/:id': Launch,  // Página de detalle → un lanzamiento específico
};

// Función principal del router
const router = async () => {
  const header = document.getElementById('header');
  const content = document.getElementById('content');

  // Renderizamos el header siempre
  header.innerHTML = await Header();

  // Obtenemos la ruta actual según el hash de la URL
  const hash = getHash();             // ej: "1" o "/"
  const route = resolveRoutes(hash);  // "/" o "/:id"

  // Determinamos qué vista renderizar
  const render = routes[route] || Error404;

  // Renderizamos el contenido dinámico
  content.innerHTML = await render();

  
};

export default router;
