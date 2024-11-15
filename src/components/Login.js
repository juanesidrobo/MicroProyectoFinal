import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

import '../styles/Login.css'; // Update this path with the actual location
import cabezaImg from './cab.png'; // Update this path with the actual location
//import listaImg from './izq.png'; // Update this path

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const clientId = '1074366058014-ie7i9b8e3i3gv5thd02b38nk3avd1v8b.apps.googleusercontent.com';

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.cancel();
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTraditionalLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }
      login(data.token, data.user.id);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      
      if (data.user.role === 'SUPER_ADMIN') {
        navigate('/admin');
      } else {
        if(data.user.estado === 1){
          navigate('/dashboard');
        }
        else{
          setError('Usuario bloqueado, contacte al administrador');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decodedUser = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
        
        const response = await fetch('http://localhost:5000/api/auth/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: decodedUser.email,
            name: decodedUser.name,
            googleId: decodedUser.sub,
            picture: decodedUser.picture
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error en el inicio de sesión con Google');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        
        if (data.user.role === 'SUPER_ADMIN') {
          navigate('/admin');
        } else {
          if(data.user.estado === 1){
            navigate('/dashboard');
          }
          else{
            setError('Usuario bloqueado, contacte al administrador');
          }
        }
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (window.google && window.google.accounts) {
      window.google.accounts.id.revoke(user?.email, () => {
        console.log('Sesión cerrada correctamente');
      });
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <div className="login-box">
          <img src={cabezaImg} alt="Avatar" className="login-avatar" />
          <h2 className="login-title">Bienvenido a Keep Shop!</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleTraditionalLogin}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                name="email"
                required
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                maxLength={40}
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                maxLength={250}
              />
            </div>

            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>

          <div className="divider">
            <span>O continúa con</span>
          </div>

          <div>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setError('Error al iniciar sesión con Google')}
              useOneTap={false}
              className="google-login-button"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
