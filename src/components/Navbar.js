import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      {/* ...resto del código */}
      {isAuthenticated ? (
        <button onClick={handleLogout} style={styles.link}>
          <div style={styles.sessionContainer}>
            Cerrar Sesión
            <img src={`${process.env.PUBLIC_URL}/iconlogin.png`} alt="Logout Icon" style={styles.icon} />
          </div>
        </button>
      ) : (
        <Link to="/login" style={styles.link}>
          <div style={styles.sessionContainer}>
            Iniciar Sesión
            <img src={`${process.env.PUBLIC_URL}/iconlogin.png`} alt="Login Icon" style={styles.icon} />
          </div>
        </Link>
      )}
    </nav>
  );
}

// ...estilos y exportación


const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    borderBottom: '3px solid #c78c6f', // Línea inferior de color
    height: '60px',
    overflow: 'hidden',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  title: {
    fontSize: '44px',
    fontWeight: '800', // Extra Bold
    color: '#C78C6F',
    fontFamily: '"Open Sans", sans-serif', // Usar Open Sans Extra Bold para "KEEP SHOP"
  },
  link: {
    textDecoration: 'none',
    fontSize: '16px',
    color: '#C78C6F',
    fontFamily: '"Lato", sans-serif',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  sessionContainer: {
    display: 'flex',
    alignItems: 'center', // Alinea el texto y el ícono verticalmente centrados
  },
  icon: {
    width: '20px',
    height: '20px',
    marginLeft: '8px', // Espacio entre el texto y el ícono
  },
};

export default Navbar;
