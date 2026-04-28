
import { useState, useEffect } from 'react';
import { obtenerPokemones } from '../services/pokemonService';

export const usePokemon = () => {
  const [pokemones, setPokemones] = useState([]); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [pokemonModal, setPokemonModal] = useState(null);

  useEffect(() => {
    obtenerPokemones()
      .then(setPokemones)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);


  const resultadosCompletos = pokemones.filter(poke => 
    poke.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const pokemonesParaMostrar = resultadosCompletos.slice(0, 20);


  const abrirModal = (pokemon) => setPokemonModal(pokemon);
  const cerrarModal = () => setPokemonModal(null);

  return { 
    pokemonesFiltrados: pokemonesParaMostrar, 
    cargando, 
    error,
    busqueda,
    setBusqueda,
    pokemonModal,
    abrirModal,
    cerrarModal
  };
};