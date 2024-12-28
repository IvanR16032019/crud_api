import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../hojas-de-estilo/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      navigate('/home');
    } catch (err) {
      setError('Error en el inicio de sesión: ' + err.message);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToMain = () => {
    navigate('/');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico');
    } catch (err) {
      setError('Error al enviar el correo de recuperación: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        <button type="button" onClick={goToRegister} className="register-button">Back to register</button>
        <button type="button" onClick={goToMain} className="main-button">Main page</button>
      </form>
      {error && <p className="login-error">{error}</p>}
      {message && <p className="login-message">{message}</p>}
      <button onClick={handleForgotPassword} className="forgot-password-button">Forgot password</button>
    </div>
  );
};

export default Login;
