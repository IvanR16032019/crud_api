import React from 'react';
import Register from './componentes/Register';
import Login from './componentes/Login';
import Home from './componentes/Home';
import MainPage from './componentes/MainPage';
import Users from './componentes/Users';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Cambiar a HashRouter
import PrivateRoute from './componentes/PrivateRoute'; // Importar el componente de protección de ruta
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />

          {/* Ruta protegida para Home */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home /> {/* Solo se renderiza si el usuario está autenticado */}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
