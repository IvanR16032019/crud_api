import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import '../hojas-de-estilo/Register.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToMain = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Resetear el formulario
      setFormData({
        name: '',
        lastname: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Mostrar SweetAlert y redirigir a login
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado correctamente',
        showConfirmButton: false,
        timer: 2000 // Mostrar durante 2 segundos
      }).then(() => {
        navigate('/login'); // Redirigir a login después del SweetAlert
      });
    } catch (err) {
      setError('Error en el registro: ' + err.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="text"
          name="lastname"
          placeholder="Apellido"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button className="register-button" type="submit">Register</button>
      </form>
      <button className="login-button" onClick={goToLogin}>Go to login</button>
      <button type="button" onClick={goToMain} className="main-button">Main page</button>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;
