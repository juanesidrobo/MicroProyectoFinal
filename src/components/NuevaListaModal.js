import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NuevoProductoModal from './NuevoProductoModal';
import '../styles/ventanasmodales.css';

Modal.setAppElement('#root');

const NuevaListaModal = ({ isOpen, onRequestClose, onGuardar, sitios, onAgregarSitio, listaDuplicada }) => {
  const [productoModalOpen, setProductoModalOpen] = useState(false);
  const [nombreLista, setNombreLista] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (listaDuplicada) {
      setNombreLista(listaDuplicada.nombre);
      setProductos([...listaDuplicada.productos]);
    } else {
      setNombreLista("");
      setProductos([]);
    }
  }, [listaDuplicada, isOpen]);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  const handleGuardar = () => {
    if (nombreLista.trim() !== "") {
      onGuardar({ nombre: nombreLista, productos });
      setNombreLista("");
      setProductos([]);
      onRequestClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Nueva Lista"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <input
            type="text"
            value={nombreLista}
            onChange={(e) => setNombreLista(e.target.value)}
            placeholder="NOMBRE LISTA"
            className="input-nombre-lista"
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant</th>
                <th>Lugar</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.lugar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="button-group">
          <button type="button" className="add-product-button" onClick={() => setProductoModalOpen(true)}>
            Añadir Producto <span className="plus-icon">+</span>
          </button>
        </div>
        
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={onRequestClose}>Cancelar</button>
          <button type="button" className="save-button" onClick={handleGuardar}>Guardar</button>
        </div>
      </Modal>

      <NuevoProductoModal 
        isOpen={productoModalOpen} 
        onRequestClose={() => setProductoModalOpen(false)} 
        onGuardarProducto={agregarProducto} 
        sitios={sitios}
        onAgregarSitio={onAgregarSitio} 
      />
    </>
  );
};

export default NuevaListaModal;
