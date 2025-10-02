const resolveRoutes = (route) => {
  if (route.length <= 3) { // "/", "1", "2"
    return route === '/' ? '/' : '/:id';
  }
  return `/${route}`;
};

export default resolveRoutes;
