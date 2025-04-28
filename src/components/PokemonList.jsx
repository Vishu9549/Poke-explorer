import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemon }) {
  if (pokemon.length === 0) {
    return <div className="center">No Pokémon found.</div>;
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}

export default PokemonList;
