import React, { createContext, useContext, useState, ReactNode } from "react";

type AppState = {
  theme: "light" | "dark";
  language: "en" | "fr";
};

type AppStateContextType = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
};

const defaultState: AppState = {
  theme: "light",
  language: "en",
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);
  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppContext must be used within AppStateProvider");
  return context;
};