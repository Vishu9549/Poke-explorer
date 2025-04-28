import React, { useEffect, useState } from "react";

function TypeFilter({ setSelectedType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results.map((type) => type.name));
    }
    fetchTypes();
  }, []);

  return (
    <select className="type-filter" onChange={(e) => setSelectedType(e.target.value)}>
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
