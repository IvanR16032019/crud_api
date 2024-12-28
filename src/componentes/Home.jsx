import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../hojas-de-estilo/Home.css'; // Importamos el archivo CSS

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="home-container">
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      <div className="home-content">
        <h1 className="animated-title">User Management</h1>
        <h2 className="animated-subtitle">
          Manage all your users' information with all their details, press
          manage users to stay up to date
        </h2>
        <button
          className="manage-users-button"
          onClick={() => navigate('/users')}
        >
          Users Management
        </button>

      </div>
    </div>
  );
};

export default Home;
