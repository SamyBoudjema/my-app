import React, { useState, useEffect } from 'react';
import './pokeAPI.css';

const PokeAPI = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [pokemonParPage, setPokemonParPage] = useState(20);

  const fetchPokemon = async (page, perPage) => {
    const offset = (page - 1) * perPage;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`);
    if (res.ok) {
      const data = await res.json();
      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonRes = await fetch(pokemon.url);
          return await pokemonRes.json();
        })
      );
      setPokemonList(detailedPokemonList);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage, pokemonParPage);
  }, [currentPage, pokemonParPage]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const Change = (event) => {
    setPokemonParPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h2>Todos los pokemones</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <button className="pokemon-button">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
              <span className="pokemon-name">{pokemon.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={!prevPageUrl}>
          Page précédente
        </button>
        Page {currentPage}
        <button onClick={handleNextPage} disabled={!nextPageUrl}>
          Page suivante
        </button>
      </div>

      <select value={pokemonParPage} onChange={Change}>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default PokeAPI;
