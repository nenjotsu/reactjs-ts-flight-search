import { lazy } from 'react';

const About = lazy(() => import('views/About'));

const publicRoutesList = [
  {
    component: About,
    exact: true,
    id: 'about-id',
    path: '/about',
  },
];

const PublicRoutes = (isLoggedIn: boolean) => {
  let publicRoutes = publicRoutesList;

  if (!isLoggedIn) {
    publicRoutes = [
      ...publicRoutesList,
      {
        component: About,
        exact: true,
        id: 'about-id',
        path: '/',
      },
    ];
  }

  return publicRoutes;
};

export default PublicRoutes;
