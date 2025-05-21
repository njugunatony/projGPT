import React from "react";

interface TargetUserSectionProps {
  title: string;
  benefits: string[];
}

const TargetUserSection: React.FC<TargetUserSectionProps> = ({ title, benefits }) => (
  <section className="target-user-section">
    <h3>{title}</h3>
    <ul>
      {benefits.map((benefit, i) => (
        <li key={i}>{benefit}</li>
      ))}
    </ul>
  </section>
);

export default TargetUserSection;