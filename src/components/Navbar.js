import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isLoggedIn = location.pathname === '/dashboard';

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={`${process.env.PUBLIC_URL}/logokeep.png`} alt="Keep Shop Logo" style={styles.logo} />
        <h1 style={styles.title}>KEEP SHOP</h1>
      </div>
      <Link to={isLoggedIn ? '/login' : '/dashboard'} style={styles.link}>
        <div style={styles.sessionContainer}>
          {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          <img src={`${process.env.PUBLIC_URL}/iconlogin.png`} alt="Login Icon" style={styles.icon} />
        </div>
      </Link>
    </nav>
  );
}

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
    fontFamily: '"Lato", sans-serif', // Usar Lato para el texto de sesión
    fontWeight: 'bold',
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
