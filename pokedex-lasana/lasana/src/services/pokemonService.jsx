
export const obtenerPokemones = async () => {

  const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
  if (!respuesta.ok) throw new Error('Error al conectar con la PokéAPI');
  
  const data = await respuesta.json();
  
  return data.results.map((poke) => {

    const partesUrl = poke.url.split('/');
    const id = partesUrl[partesUrl.length - 2]; 
    
    return {
      id: id,
      nombre: poke.name,
      imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    };
  });
};