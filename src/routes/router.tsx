import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import { loader as homeLoader } from './Home';
import Root from './Root';
import NotFound from './NotFound';
import Loader from '../components/Loader';

const Cart = lazy(() => import('./Cart'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
