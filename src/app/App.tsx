import AppLayout from '@/layouts/AppLayout';
import ListPage from '../features/product-list/pages/ListPage';
import './App.css'
import { createBrowserRouter } from 'react-router-dom';
import DetailPage from '@/features/product-list/pages/DetailPage';
import OrderDetailPage from '@/features/order/pages/OrderDetailPage';
import PaymentMethodPage from '@/features/order/pages/PaymentMethodPage';
import InvoicePage from '@/components/order/InvoicePage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <ListPage />
      </AppLayout>

    ),
  },
  {
    path: "/products/:id",
    element: <DetailPage />,
  },
  {
    path: "/products/:id/order",
    element: <OrderDetailPage />,
  },
  {
    path: "/products/:id/paymentmethod",
    element: <PaymentMethodPage />,
  },
  {
    path: "/checkout/:id/invoice",
    element: <InvoicePage />,
  },
]);
