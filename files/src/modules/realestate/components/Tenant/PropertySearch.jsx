import React, { useState, useEffect } from "react";
import { searchProperties } from "../../services/propertyService";
import PropertyDetail from "./PropertyDetail";

export default function PropertySearch() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState({ location: "", type: "", minPrice: "", maxPrice: "" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    searchProperties(query).then(setResults);
  }, [query]);

  if (selected) {
    return <PropertyDetail property={selected} onClose={() => setSelected(null)} />;
  }

  return (
    <div>
      <h2>Find Your Next Home or Office</h2>
      {/* ...search fields setQuery... */}
      <ul>
        {results.map((prop) => (
          <li key={prop.id}>
            <b>{prop.title}</b> - {prop.location} - {prop.type} - ${prop.price}
            <button onClick={() => setSelected(prop)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}