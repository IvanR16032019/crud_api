import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../hojas-de-estilo/MainPage.css';
import imga from '../imagenes/imga.jpg';
import imgb from '../imagenes/imgb.png';
import imgc from '../imagenes/imgc.png';
import ircdev from '../imagenes/ircdev.png';

const MainPage = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main-container">
      {/* Logo animado en la parte superior izquierda */}
      <div className="logo-container">
        <img src={ircdev} alt="Company Logo" className="logo" />
      </div>

      {/* Botones para registro e inicio de sesión */}
      <div className="top-buttons-container">
        <button onClick={goToRegister} className="button register-button">Register</button>
        <button onClick={goToLogin} className="button login-button">Login</button>
      </div>

      {/* Título principal con animación */}
      <h1 className="animated-title">Welcome to IRC-ADMIN</h1>

      {/* Subtítulos y descripciones */}
      <div className="subtitles">
        <h2 className="animated-subtitle">Your Trusted Employee Management Solution</h2>
        <p>Streamline your employee records with ease, efficiency, and accuracy.</p>
        <h2 className="animated-subtitle">Effortless employee's management</h2>
        <p>Easily add, update, delete, and search employee records with our intuitive interface.</p>
        <h2 className="animated-subtitle">Secure and Scalable</h2>
        <p>Powered by cutting-edge technology to ensure your data is safe and accessible.</p>
      </div>

      {/* Imágenes y detalles adicionales */}
      <div className="images-section">
        <div className="image-card">
          <img src={imga} alt="Teamwork" className="image" />
          <p>Collaborate effectively with advanced team management tools.</p>
        </div>
        <div className="image-card">
          <img src={imgb} alt="Analytics" className="image" />
          <p>Gain insights into employee performance and productivity.</p>
        </div>
        <div className="image-card">
          <img src={imgc} alt="Security" className="image" />
          <p>Your data is protected with industry-leading security protocols.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
