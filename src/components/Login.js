import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Login() {
  const [user, setUser] = useState(null);
  const clientId = '1074366058014-ie7i9b8e3i3gv5thd02b38nk3avd1v8b.apps.googleusercontent.com';

  useEffect(() => {
    // Limpiar cualquier estado previo de autenticación
    if (window.google && window.google.accounts) {
      window.google.accounts.id.cancel();
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decodedUser = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
        setUser(decodedUser);
        console.log("Login exitoso:", decodedUser);
      } catch (error) {
        console.error("Error al decodificar credenciales:", error);
      }
    }
  };

  const handleLoginError = (error) => {
    console.error("Error al iniciar sesión:", error);
  };

  const handleLogout = () => {
    setUser(null);
    // Limpiar el estado de autenticación
    if (window.google && window.google.accounts) {
      window.google.accounts.id.revoke(user?.email, () => {
        console.log('Sesión cerrada correctamente');
      });
    }
  };

  return (
    <GoogleOAuthProvider 
      clientId={clientId}
      onScriptLoadError={() => console.error('Error al cargar el script de Google')}
      onScriptLoadSuccess={() => console.log('Script de Google cargado correctamente')}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '20px'
      }}>
        {!user ? (
          <div style={{ padding: '20px' }}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              useOneTap={false}
              text="signin_with"
              shape="rectangular"
              locale="es"
              theme="filled_blue"
              size="large"
              context="signin"
              ux_mode="popup"
              auto_select={false}
              itp_support={true}
              scope="email profile openid"
              cookiePolicy={'single_host_origin'}
            />
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '300px'
          }}>
            <img 
              src={user.picture} 
              alt={user.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                margin: '0 auto 16px'
              }}
            />
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>{user.name}</h1>
            <p style={{
              color: '#666',
              marginBottom: '16px'
            }}>{user.email}</p>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;