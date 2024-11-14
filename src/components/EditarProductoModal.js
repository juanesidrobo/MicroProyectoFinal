import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NuevoSitioModal from './NuevoSitioModal';

Modal.setAppElement('#root');

const EditarProductoModal = ({ isOpen, onRequestClose, onGuardarProducto, producto, sitios = [], onAgregarSitio }) => {
  const [sitioModalOpen, setSitioModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [sitioSeleccionado, setSitioSeleccionado] = useState("");

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setCantidad(producto.cantidad);
      setSitioSeleccionado(producto.lugar || ""); // Establece el sitio del producto al abrir el modal
    }
  }, [producto]);

  const handleGuardarProducto = () => {
    if (nombre && cantidad > 0 && sitioSeleccionado) {
      onGuardarProducto({ nombre, cantidad, lugar: sitioSeleccionado });
      onRequestClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Editar Producto"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          EDITAR PRODUCTO
        </div>
        <form className="modal-form">
          <label className="modal-label">NOMBRE:</label>
          <input 
            type="text" 
            className="input" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} 
          />

          <label className="modal-label">CANTIDAD:</label>
          <input 
            type="number" 
            className="input" 
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

export default EditarProductoModal;
