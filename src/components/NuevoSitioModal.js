import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const NuevoSitioModal = ({ isOpen, onRequestClose, onGuardarSitio }) => {
  const [nombreSitio, setNombreSitio] = useState("");

  const handleGuardar = async () => {
    if (nombreSitio.trim() !== "") {
      try {
        // Obtener el token desde localStorage
        const token = localStorage.getItem('token');

        // Enviar el nombre del sitio al backend
        const response = await axios.post(
          'http://localhost:5000/api/sitio',
          { nombre: nombreSitio },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Crear el objeto nuevoSitio con el ID y nombre retornado
        const nuevoSitio = { id: response.data.sitioId, nombre: nombreSitio };
        onGuardarSitio(nuevoSitio); // Actualiza el estado en el componente padre (Dashboard)
        
        // Limpiar el campo y cerrar el modal
        setNombreSitio("");
        onRequestClose();
      } catch (error) {
        console.error("Error al guardar el sitio:", error);
      }
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Nuevo Sitio" 
      className="modal" 
      overlayClassName="overlay"
    >
      <div className="modal-header">
        NUEVO SITIO
      </div>
      <form className="modal-form">
        <label className="modal-label">NOMBRE:</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Nombre del sitio"
          value={nombreSitio}
          onChange={(e) => setNombreSitio(e.target.value)} 
        />
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={onRequestClose}>Cancelar</button>
          <button type="button" className="save-button" onClick={handleGuardar}>Guardar</button>
        </div>
      </form>
    </Modal>
  );
};

export default NuevoSitioModal;
