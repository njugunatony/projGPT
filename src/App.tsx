import React from "react";
import { useAppContext } from "./store/AppStateContext";

const App: React.FC = () => {
  const { state, setState } = useAppContext();

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  return (
    <div className={state.theme === "dark" ? "app dark-theme" : "app light-theme"}>
      <h1>Welcome to projGPT!</h1>
      <p>Current language: {state.language}</p>
      <p>Current theme: {state.theme}</p>
      <button onClick={toggleTheme}>
        Switch to {state.theme === "light" ? "dark" : "light"} theme
      </button>
    </div>
  );
};

export default App;
