import React from "react";

interface ModuleSectionProps {
  module: {
    title: string;
    [key: string]: any;
  };
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ module }) => (
  <section className="module-section">
    <h3>{module.title}</h3>
    {Object.entries(module).map(([key, value]) => {
      if (key === "title") return null;
      if (Array.isArray(value)) {
        return (
          <ul key={key}>
            {value.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      if (typeof value === "string") {
        return <p key={key}>{value}</p>;
      }
      return null;
    })}
  </section>
);

export default ModuleSection;