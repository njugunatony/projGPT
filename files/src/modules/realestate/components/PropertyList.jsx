import React, { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService";
import PropertyDetail from "./PropertyDetail";

const PropertyList = ({ filter }) => {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getProperties(filter).then(setProperties);
  }, [filter]);

  if (selected) {
    return <PropertyDetail property={selected} onClose={() => setSelected(null)} />;
  }

  return (
    <div>
      <h3>Available Properties</h3>
      <ul>
        {properties.map((p) => (
          <li key={p.id}>
            <b>{p.title}</b> ({p.type}, {p.location}) - ${p.price}
            <button onClick={() => setSelected(p)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;