import React from "react";

interface NotableFeaturesProps {
  features: string[];
}

const NotableFeatures: React.FC<NotableFeaturesProps> = ({ features }) => (
  <section className="notable-features">
    <h2>Notable Features</h2>
    <ul>
      {features.map((feature, i) => (
        <li key={i}>{feature}</li>
      ))}
    </ul>
  </section>
);

export default NotableFeatures;