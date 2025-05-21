import React from "react";

interface VisionStatementProps {
  vision: string;
}

const VisionStatement: React.FC<VisionStatementProps> = ({ vision }) => (
  <section className="vision-statement">
    <h2>Our Vision</h2>
    <p>{vision}</p>
  </section>
);

export default VisionStatement;