import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return await res.json();
          })
        );
        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Pokémon");
        setLoading(false);
      }
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemon;
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">{error}</div>;

  return (
    <div className="container">
      <Header />
      <div className="controls">
        <SearchBar setSearchTerm={setSearchTerm} />
        <TypeFilter setSelectedType={setSelectedType} />
      </div>
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
}

export default App;
