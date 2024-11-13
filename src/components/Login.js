import React from 'react';

function Login() {
  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#C78C6F',
    color: '#fff',
    border: 'none',
  },
};

export default Login;
