import React from "react";

interface EndgameProps {
  text: string;
}

const Endgame: React.FC<EndgameProps> = ({ text }) => (
  <section className="endgame">
    <h2>The Endgame</h2>
    <p>{text}</p>
  </section>
);

export default Endgame;