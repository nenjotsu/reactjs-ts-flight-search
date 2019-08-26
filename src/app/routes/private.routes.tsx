import { lazy } from 'react';

// const Test = lazy(() => import('views/Test'));
const Home = lazy(() => import('views/Home'));

// const privateRoutesList = [
// {
//   component: Test,
//   exact: true,
//   id: 'test-id',
//   path: '/test',
// },
// {
//   component: Home,
//   exact: true,
//   id: 'home-id',
//   path: '/home',
// },
// ];

const PrivateRoutes = (isLoggedIn: boolean) => {
  let privateRoutes: any[] = [];
  // let privateRoutes = privateRoutesList;

  if (isLoggedIn) {
    privateRoutes = [
      // ...privateRoutesList,
      {
        component: Home,
        exact: true,
        id: 'home-id',
        path: '/',
      },
    ];
  }

  return privateRoutes;
};

export default PrivateRoutes;
