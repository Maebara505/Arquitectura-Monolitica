
import { useState, useEffect } from 'react';
import './App.css'; 

export default function App() {
  const [pokemones, setPokemones] = useState([]); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [pokemonModal, setPokemonModal] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con la PokéAPI');
        return res.json();
      })
      .then((data) => {
        // Extraemos el ID real desde la URL en el mismo bloque
        const dataFormateada = data.results.map((poke) => {
          const partesUrl = poke.url.split('/');
          const id = partesUrl[partesUrl.length - 2]; 
          
          return {
            id: id,
            nombre: poke.name,
            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });
        setPokemones(dataFormateada);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  const resultadosCompletos = pokemones.filter(poke => 
    poke.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const pokemonesParaMostrar = resultadosCompletos.slice(0, 20);

  if (cargando) return <h2>Cargando Pokédex...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="dashboard-container">
      <h1>Pokédex (Espagueti)</h1>
      
      <input 
        type="text" 
        placeholder="Buscar cualquier Pokémon..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      <div className="pokemon-grid">
        {pokemonesParaMostrar.length === 0 ? (
          <p>No se encontraron resultados.</p>
        ) : (
          pokemonesParaMostrar.map((poke) => (
            <div 
              key={poke.id} 
              className="tarjeta" 
              onClick={() => setPokemonModal(poke)}
            >
              <img src={poke.imagen} alt={poke.nombre} width="120" />
              <p style={{ textTransform: 'capitalize' }}><strong>{poke.nombre}</strong></p>
            </div>
          ))
        )}
      </div>

      {/* HTML del Modal incrustado */}
      {pokemonModal && (
        <div className="modal-overlay" onClick={() => setPokemonModal(null)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="boton-cerrar" onClick={() => setPokemonModal(null)}>X</button>
            <h2 style={{ textTransform: 'capitalize' }}>{pokemonModal.nombre}</h2>
            <img src={pokemonModal.imagen} alt={pokemonModal.nombre} width="250" />
            <p>Nº en la Pokédex: {pokemonModal.id}</p>
          </div>
        </div>
      )}
    </div>
  );
}