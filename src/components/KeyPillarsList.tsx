import React from "react";
import KeyPillar from "./KeyPillar";

interface KeyPillarsListProps {
  pillars: { title: string; description: string }[];
}

const KeyPillarsList: React.FC<KeyPillarsListProps> = ({ pillars }) => (
  <section className="key-pillars-list">
    <h2>Key Pillars</h2>
    {pillars.map((pillar, index) => (
      <KeyPillar key={index} title={pillar.title} description={pillar.description} />
    ))}
  </section>
);

export default KeyPillarsList;