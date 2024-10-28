import React, { useState } from 'react';
import Modal from 'react-modal';
import NuevoSitioModal from './NuevoSitioModal';

Modal.setAppElement('#root');

const NuevoProductoModal = ({ isOpen, onRequestClose, onGuardarProducto, sitios, onAgregarSitio }) => {
  const [sitioModalOpen, setSitioModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [sitioSeleccionado, setSitioSeleccionado] = useState("");
  

  const handleGuardarProducto = () => {
    if (nombre && cantidad > 0 && sitioSeleccionado) {
      onGuardarProducto({ nombre, cantidad, lugar: sitioSeleccionado });
      setNombre("");
      setCantidad(1);
      setSitioSeleccionado("");
      onRequestClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Nuevo Producto"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          NUEVO PRODUCTO
        </div>
        <form className="modal-form">
          <label className="modal-label">NOMBRE:</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} 
          />

          <label className="modal-label">CANTIDAD:</label>
          <input 
            type="number" 
            className="input" 
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(0, e.target.value))} 
          />

          <label className="modal-label">SITIO:</label>
          <div className="sitio-group">
            <select 
              className="input sitio-select"
              value={sitioSeleccionado}
              onChange={(e) => setSitioSeleccionado(e.target.value)}
            >
              <option value="">Seleccione un sitio</option>
              {sitios.map((sitio, index) => (
                <option key={index} value={sitio}>{sitio}</option>
              ))}
            </select>
            <button type="button" className="plus-button" onClick={() => setSitioModalOpen(true)}>+</button>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onRequestClose}>Cancelar</button>
            <button type="button" className="save-button" onClick={handleGuardarProducto}>Guardar</button>
          </div>
        </form>
      </Modal>

      <NuevoSitioModal 
        isOpen={sitioModalOpen} 
        onRequestClose={() => setSitioModalOpen(false)}
        onGuardarSitio={onAgregarSitio} // Usa la función global para agregar sitios
      />
    </>
  );
};

export default NuevoProductoModal;
