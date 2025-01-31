import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TutoriaPageTutora from './TutoriaPageTutora.jsx';
import TutoriaPageAluna from './TutoriaPageAluna.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './AdminDashboard.jsx';
import LoginAdmin from './LoginAdm.jsx';
import LoginTutora from './LoginTutora.jsx';
import LoginAluna from './LoginAluna.jsx';
import RegisterAluna from './RegisterAluna.jsx';
import RegisterTutora from './RegisterTutora.jsx';
import Sobre from './sobre.jsx';
import EncontrosAluna from './EncontrosAluna.jsx';
import EncontrosTutora from './EncontrosTutora.jsx';
import MinhaConta from './MinhaConta.jsx';
import Section from './Section.jsx';

const router = createBrowserRouter([
  {
    path: 'sobre',
    element: <Sobre />,
  },
  {
    path: 'minhaConta',
    element: <MinhaConta/>,
  },
  {
    path: 'section',
    element:<Section/>, 
  },
  {
    path: '',
    element: <App />,
  },
  {
    path: 'tutoriaTutora',
    element: <TutoriaPageTutora />,
  },
  {
    path: 'tutoriaAluna',
    element: <TutoriaPageAluna />,
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
  {
    path: 'registerTutora',
    element: <RegisterTutora />,
  },
  {
    path: 'registerAluna',
    element: <RegisterAluna />,
  },
  {
    path: 'encontrosAluna',
    element: <EncontrosAluna />,
  },
  {
    path: 'encontrosTutora',
    element: <EncontrosTutora />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
