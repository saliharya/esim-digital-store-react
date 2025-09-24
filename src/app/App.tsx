import AppLayout from '@/layouts/AppLayout';
import ListPage from '../features/product-list/pages/ListPage';
import './App.css'
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <ListPage />
      </AppLayout>

    ),
  },
  // {
  //   path: "/detail/:id",
  //   element: <ProductDetailPage />,
  // },
]);
