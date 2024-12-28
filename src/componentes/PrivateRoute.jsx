import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);  // Usamos `null` para representar el estado de carga
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga mientras verificamos

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // Usuario autenticado
      } else {
        setIsAuthenticated(false);  // Usuario no autenticado
      }
      setLoading(false);  // Termina la carga una vez que se ha comprobado el estado
    });

    // Limpieza del listener
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Mensaje de carga
  }

  if (isAuthenticated === false) {
    // Si no está autenticado, redirige a login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return children;
};

export default PrivateRoute;
