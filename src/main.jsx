import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import ManageSlider from './pages/Admin/ManageSlider.jsx';
import ManageBlog from './pages/Admin/ManageBlog.jsx';
import ManageProducts from './pages/Admin/ManageProducts.jsx';
import ManageCategories from './pages/Admin/ManageCategories.jsx';
import ManageContactDetails from './pages/Admin/ManageContactDetails.jsx';
import ViewContactSubmissions from './pages/Admin/ViewContactSubmissions.jsx';
import ProductListPage from './pages/Products/ProductListPage.jsx';
import ProductDetailPage from './pages/Products/ProductDetailPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '/category/:categoryName',
        element: <ProductListPage />,
      },
      {
        path: '/category/:categoryName/:subCategoryName',
        element: <ProductListPage />,
      },
      {
        path: '/product/:slug',
        element: <ProductDetailPage />,
      },
      {
        path: '/products',
        element: <ProductListPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'sliders',
        element: <ManageSlider />,
      },
      {
        path: 'blogs',
        element: <ManageBlog />,
      },
      {
        path: 'products',
        element: <ManageProducts />,
      },
      {
        path: 'categories',
        element: <ManageCategories />,
      },
      {
        path: 'contact-details',
        element: <ManageContactDetails />,
      },
      {
        path: 'contact-submissions',
        element: <ViewContactSubmissions />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
