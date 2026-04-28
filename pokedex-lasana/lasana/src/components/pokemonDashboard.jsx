
import { usePokemon } from '../hooks/usePokemon';
import './PokemonDashboard.css';

export default function PokemonDashboard() {

  const { 
    pokemonesFiltrados, cargando, error, 
    busqueda, setBusqueda, 
    pokemonModal, abrirModal, cerrarModal 
  } = usePokemon();

  if (cargando) return <h2>Cargando Pokédex...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="dashboard-container">
      <h1>Pokédex (Lasaña)</h1>
      
      <input 
        type="text" 
        placeholder="Buscar cualquier Pokémon..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      <div className="pokemon-grid">
        {pokemonesFiltrados.length === 0 ? (
          <p>No se encontraron resultados.</p>
        ) : (
          pokemonesFiltrados.map((poke) => (
            <div key={poke.id} className="tarjeta" onClick={() => abrirModal(poke)}>
              <img src={poke.imagen} alt={poke.nombre} width="120" />
              <p style={{ textTransform: 'capitalize' }}><strong>{poke.nombre}</strong></p>
            </div>
          ))
        )}
      </div>

      {pokemonModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="boton-cerrar" onClick={cerrarModal}>X</button>
            <h2 style={{ textTransform: 'capitalize' }}>{pokemonModal.nombre}</h2>
            <img src={pokemonModal.imagen} alt={pokemonModal.nombre} width="250" />
            <p>Nº en la Pokédex: {pokemonModal.id}</p>
          </div>
        </div>
      )}
    </div>
  );
}