import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/AdminCreateUser.css';

const AdminCreateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    genero: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    password: '',
    foto: null
  });

  const tiposDocumento = [
    { id: 1, nombre: 'Cédula' },
    { id: 2, nombre: 'Pasaporte' }
  ];

  const generos = [
    { id: 'F', nombre: 'Femenino' },
    { id: 'M', nombre: 'Masculino' }
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (name === 'tipo_documento') {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const dataToSend = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        tipo_documento: parseInt(formData.tipo_documento),
        numero_documento: formData.numero_documento,
        genero: formData.genero,
        email: formData.email,
        telefono: formData.telefono,
        fecha_nacimiento: formData.fecha_nacimiento,
        password: formData.password,
        rol: 'usuario'
      };

      if (formData.foto) {
        const formDataToSend = new FormData();
        formDataToSend.append('foto', formData.foto);
        formDataToSend.append('datos', JSON.stringify(dataToSend));

        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataToSend
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al crear el usuario');
        }
      } else {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al crear el usuario');
        }
      }

      setSuccess('Usuario creado exitosamente');
      setFormData({
        nombres: '',
        apellidos: '',
        tipo_documento: '',
        numero_documento: '',
        genero: '',
        email: '',
        telefono: '',
        fecha_nacimiento: '',
        password: '',
        foto: null
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Registro de Nuevo Usuario</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="form-group">
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tipo de Documento</label>
              <select
                name="tipo_documento"
                value={formData.tipo_documento}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione...</option>
                {tiposDocumento.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Número de Documento</label>
              <input
                type="text"
                name="numero_documento"
                value={formData.numero_documento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione...</option>
                {generos.map(genero => (
                  <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="8"
              />
            </div>
          </div>

          <div className="button-container">
            <button type="button" onClick={() => navigate(-1)} className="button cancel-button">Cancelar</button>
            <button type="submit" disabled={loading} className="button submit-button">
            
              {loading ? 'Creando...' : 'Registrar'}
            </button>
            <button onClick={() => navigate('/editarUsuario')} className="button submit-button">Editar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateUser;
