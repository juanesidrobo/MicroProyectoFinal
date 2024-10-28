import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const NuevoSitioModal = ({ isOpen, onRequestClose, onGuardarSitio }) => {
  const [nombreSitio, setNombreSitio] = useState("");

  const handleGuardar = () => {
    if (nombreSitio.trim() !== "") {
      onGuardarSitio(nombreSitio); // Llama a la función para guardar el sitio en NuevoProductoModal
      setNombreSitio("");
      onRequestClose();
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
