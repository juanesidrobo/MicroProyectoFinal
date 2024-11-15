import React, { useEffect ,useState } from 'react'; 
import { AiOutlinePlus } from 'react-icons/ai';
import { FiBox } from 'react-icons/fi';
import NuevaListaModal from '../components/NuevaListaModal';
import Lista from '../components/Lista';

const Dashboard = () => {
  const [listaModalOpen, setListaModalOpen] = useState(false);
  const [listas, setListas] = useState([]);
  const [sitios, setSitios] = useState(["D1", "Éxito", "Oxxo"]);
  const [listaParaDuplicar, setListaParaDuplicar] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  

  const agregarLista = (nuevaLista) => {
    setListas([nuevaLista, ...listas]);
    setListaModalOpen(false);
    setListaParaDuplicar(null);
  };

  const duplicarLista = (lista) => {
    const listaDuplicada = JSON.parse(JSON.stringify(lista));
    setListaParaDuplicar({ ...listaDuplicada, nombre: `${lista.nombre} (Copia)` });
    setListaModalOpen(true);
  };

  const actualizarLista = (nombreLista, productosActualizados) => {
    setListas(prevListas => 
      prevListas.map(lista => 
        lista.nombre === nombreLista ? { ...lista, productos: productosActualizados } : lista
      )
    );
  };

  const agregarSitio = (nuevoSitio) => {
    if (!sitios.includes(nuevoSitio)) {
      setSitios((prevSitios) => [...prevSitios, nuevoSitio]);
    }
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    setUserId(storedUserId);
    setToken(storedToken);

    // Si necesitas hacer peticiones al backend, puedes utilizar el token :)
  }, []);

  return (
    
    <div style={styles.container} className="dashboard">
      <header style={styles.header}>
        <button style={styles.addButton} onClick={() => setListaModalOpen(true)}>
          <span>Añadir lista</span>
          <AiOutlinePlus style={styles.addIcon} />
        </button>
        <button style={styles.inactiveButton}>
          <span>Productos Inactivos</span>
          <FiBox style={styles.inactiveIcon} />
        </button>
      </header>
      
      <div style={styles.scrollContainer}>
        <div style={styles.listasContainer}>
          {listas.map((lista, index) => (
            <Lista 
              key={index} 
              nombre={lista.nombre} 
              productos={lista.productos} 
              sitios={sitios} 
              onAgregarSitio={agregarSitio} 
              onDuplicarLista={() => duplicarLista(lista)}
              onActualizarProductos={(productosActualizados) => actualizarLista(lista.nombre, productosActualizados)}
            />
          ))}
        </div>
      </div>

      <NuevaListaModal 
        isOpen={listaModalOpen} 
        onRequestClose={() => setListaModalOpen(false)} 
        onGuardar={agregarLista} 
        sitios={sitios} 
        onAgregarSitio={agregarSitio} 
        listaDuplicada={listaParaDuplicar}
      />
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    width: '100%',
  },
  scrollContainer: {
    maxHeight: 'calc(100vh - 150px)', // Altura máxima para el contenedor con desplazamiento
    overflowY: 'auto', // Desplazamiento vertical
    padding: '10px 0',
  },
  listasContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center', // Centra las listas horizontalmente
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#c78c6f',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: '"Lato", sans-serif',
  },
  inactiveButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#c78c6f',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: '"Lato", sans-serif',
    position: 'absolute',
    right: '20px',
  },
  addIcon: {
    fontSize: '24px',
    marginLeft: '400px',
  },
  inactiveIcon: {
    fontSize: '20px',
    marginLeft: '8px',
  },
};

export default Dashboard;
