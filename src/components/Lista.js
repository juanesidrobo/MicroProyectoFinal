import React, { useState, useEffect } from 'react';
import { FiCopy, FiEdit3 } from 'react-icons/fi';
import EditarProductoModal from './EditarProductoModal';
import NuevoProductoModal from './NuevoProductoModal';

const Lista = ({ nombre, productos, sitios, onAgregarSitio, onDuplicarLista, onActualizarProductos }) => {
  const [productosEstado, setProductosEstado] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalEditarAbierta, setModalEditarAbierta] = useState(false);
  const [modalAgregarAbierta, setModalAgregarAbierta] = useState(false);

  useEffect(() => {
    // Solo actualiza el estado si los productos cambian
    if (
      productos.length !== productosEstado.length ||
      !productos.every((p, i) => p.nombre === productosEstado[i]?.nombre)
    ) {
      setProductosEstado(productos.map((producto) => ({ ...producto, activo: true })));
    }
  }, [productos, productosEstado]);

  const handleCheckboxChange = (index) => {
    setProductosEstado((prevProductos) => {
      const newProductos = prevProductos.map((producto, i) =>
        i === index ? { ...producto, activo: !producto.activo } : producto
      );
      onActualizarProductos(newProductos); // Notificar al padre
      return newProductos;
    });
  };

  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModalEditarAbierta(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierta(false);
    setProductoSeleccionado(null);
  };

  const handleGuardarProducto = (productoEditado) => {
    const productosActualizados = productosEstado.map((producto) =>
      producto.nombre === productoSeleccionado.nombre
        ? { ...productoEditado, activo: producto.activo }
        : producto
    );
    setProductosEstado(productosActualizados);
    onActualizarProductos(productosActualizados);
    cerrarModalEditar();
  };

  const handleAgregarProducto = (nuevoProducto) => {
    const productosActualizados = [{ ...nuevoProducto, activo: true }, ...productosEstado];
    setProductosEstado(productosActualizados);
    onActualizarProductos(productosActualizados);
    setModalAgregarAbierta(false);
  };
  return (
    <div style={styles.listaContainer}>
      <div style={styles.listaHeader}>
        <h3 style={styles.listaTitulo}>{nombre}</h3>
        <button style={styles.iconoDuplicar}>
          <FiCopy />
        </button>
      </div>
      <table style={styles.tabla}>
        <thead>
          <tr>
            <th style={{ width: '45%' }}>Producto</th>
            <th style={{ width: '5%', textAlign: 'center' }}>Cant</th>
            <th style={{ width: '45%' }}>Lugar</th>
          </tr>
        </thead>
        <tbody>
          {productosEstado.map((producto, index) => (
            <tr key={index} style={!producto.activo ? styles.productoInactivo : {}}>
              <td style={styles.productoCell}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={!producto.activo}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span
                  style={{
                    ...styles.productoTexto,
                    textDecoration: producto.activo ? 'none' : 'line-through',
                    color: producto.activo ? '#c78c6f' : '#c78c6f',
                  }}
                >
                  {producto.nombre}
                </span>
              </td>
              <td style={styles.cantidadCell}>
                <span
                  style={{
                    textDecoration: producto.activo ? 'none' : 'line-through',
                    color: producto.activo ? '#c78c6f' : '#c78c6f',
                  }}
                >
                  {producto.cantidad}
                </span>
              </td>
              <td style={styles.lugarIconoCell}>
                <span
                  style={{
                    textDecoration: producto.activo ? 'none' : 'line-through',
                    color: producto.activo ? '#c78c6f' : '#c78c6f',
                    wordBreak: 'break-word',
                  }}
                >
                  {producto.lugar}
                </span>
                {producto.activo && (
                  <FiEdit3 style={styles.iconoEditar} onClick={() => abrirModalEditar(producto)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={styles.addProductoButton} onClick={() => setModalAgregarAbierta(true)}>
        Añadir Producto <span style={styles.plusIcon}>+</span>
      </button>

      {modalEditarAbierta && (
        <EditarProductoModal
          isOpen={modalEditarAbierta}
          onRequestClose={cerrarModalEditar}
          onGuardarProducto={handleGuardarProducto}
          producto={productoSeleccionado}
          sitios={sitios} // Enviar lista de sitios global
          onAgregarSitio={onAgregarSitio} // Enviar función para agregar sitios
        />
      )}

      {modalAgregarAbierta && (
        <NuevoProductoModal
          isOpen={modalAgregarAbierta}
          onRequestClose={() => setModalAgregarAbierta(false)}
          onGuardarProducto={handleAgregarProducto} // Pasar la función para agregar producto
          sitios={sitios} // Enviar lista de sitios global
          onAgregarSitio={onAgregarSitio} // Enviar función para agregar sitios
        />
      )}
    </div>
  );
};

const styles = {
  listaContainer: {
    border: '1px solid #c78c6f',
    borderRadius: '8px',
    padding: '10px',
    minWidth: '350px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  listaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c78c6f',
    padding: '10px',
    borderRadius: '8px 8px 0 0',
  },
  listaTitulo: {
    color: 'white',
    fontSize: '20px',
  },
  iconoDuplicar: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  productoCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  cantidadCell: {
    textAlign: 'center',
  },
  lugarIconoCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    wordBreak: 'break-word',
  },
  productoTexto: {
    maxWidth: '100px',
    wordBreak: 'break-word',
  },
  checkbox: {
    cursor: 'pointer',
    border: '1px solid #c78c6f',
    accentColor: '#c78c6f',
    marginRight: '5px',
  },
  productoInactivo: {
    textDecoration: 'line-through',
    color: '#aaa',
  },
  iconoEditar: {
    cursor: 'pointer',
    color: '#c78c6f',
    flexShrink: 0,
  },
  addProductoButton: {
    backgroundColor: '#c78c6f',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    width: '100%',
  },
  plusIcon: {
    marginLeft: '8px',
  },
};
export default Lista;