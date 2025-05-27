import React, { createContext, useContext, useState } from "react";

// Type definitions
type Theme = "light" | "dark";
type Language = "en" | "sw";

interface AppState {
  theme: Theme;
  language: Language;
}

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// Default state
const defaultState: AppState = {
  theme: "light",
  language: "en",
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppStateProvider");
  }
  return context;
};
