import React from "react";

interface KeyPillarProps {
  title: string;
  description: string;
}

const KeyPillar: React.FC<KeyPillarProps> = ({ title, description }) => (
  <div className="key-pillar">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default KeyPillar;