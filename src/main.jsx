import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TutoriaPage from './TutoriaPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './AdminDashboard.jsx';
import LoginAdmin from './LoginAdm.jsx';
import LoginTutora from './LoginTutora.jsx';
import LoginAluna from './LoginAluna.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
  },
  {
    path: 'tutoria',
    element: <TutoriaPage />,
  },
  {
    path: 'adminDashboard',
    element: <AdminDashboard />,
  },
  {
    path: 'loginAdmin',
    element: <LoginAdmin />,
  },
  {
    path: 'loginTutora',
    element: <LoginTutora />,
  },
  {
    path: 'loginAluna',
    element: <LoginAluna />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
