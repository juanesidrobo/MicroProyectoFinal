import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

import '../styles/EditUser.css';

const EditUser = () => {
  const navigate = useNavigate();
  const [searchEmail, setSearchEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [editing, setEditing] = useState(false); // State to control form visibility
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
    estado: ''
  });

  const tiposDocumento = [
    { id: 1, nombre: 'Cédula' },
    { id: 2, nombre: 'Pasaporte' }
  ];

  const generos = [
    { id: 'F', nombre: 'Femenino' },
    { id: 'M', nombre: 'Masculino' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserFound(false);
    setEditing(false); // Hide the form if it's visible

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`http://localhost:5000/api/users?email=${searchEmail}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al buscar usuario');
      }

      const userData = await response.json();
      
      if (!userData) {
        throw new Error('Usuario no encontrado');
      }
      console.log(userData.estado);
      setFormData({
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        tipo_documento: userData.tipo_documento,
        numero_documento: userData.numero_documento,
        genero: userData.genero,
        email: userData.email,
        telefono: userData.telefono,
        fecha_nacimiento: userData.fecha_nacimiento,
        password: '',
        estado: userData.estado,
        id: userData.id
      });

      setUserFound(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setEditing(true); // Show the editing form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const dataToSend = { ...formData };
      
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      const response = await fetch(`http://localhost:5000/api/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el usuario');
      }

      alert('Usuario actualizado exitosamente');
      setEditing(false); // Hide the form after saving
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/users/${formData.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al eliminar el usuario');
        }
        alert('Usuario eliminado exitosamente');
        setUserFound(false);
        setEditing(false); // Hide the form after deletion
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Administrador</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Buscar usuarios"
          required
        />
        <Search size={24} className="icon" />
      </form>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* User List */}
      {userFound && (
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th># de Documento</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Correo</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.numero_documento}</td>
                <td>{formData.nombres}</td>
                <td>{formData.estado}</td>
                <td>{formData.email}</td>
                <td><button onClick={handleEditClick}>✏️</button></td>
                <td><button onClick={handleDelete}>🗑️</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Editing Form */}
      {editing && (
        <form onSubmit={handleSubmit} className="space-y-6 edit-form">
          <h2 className="edit-title">Editar Información de Usuario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label>Estado</label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
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
              <label>Nueva Contraseña (opcional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                minLength="8"
              />
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="cancel-button"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="save-button"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
