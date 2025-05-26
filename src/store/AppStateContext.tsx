// import React, { createContext, useState, useContext } from "react";

// interface AppState {
//   theme: "light" | "dark";
//   language: string;
//   // Add other global state properties here
// }

// interface AppContextProps {
//   state: AppState;
//   setState: React.Dispatch<React.SetStateAction<AppState>>;
// }

// const AppContext = createContext<AppContextProps>({
//   state: {
//     theme: "light",
//     language: "en",
//   },
//   setState: () => {},
// });

// interface AppProviderProps {
//   children: React.ReactNode;
// }

// export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   const [state, setState] = useState<AppState>({
//     theme: "light",
//     language: "en",
//   });

//   return (
//     <AppContext.Provider value={{ state, setState }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);

import React, { createContext, useState, useContext } from "react";

interface AppState {
  theme: "light" | "dark";
  language: string;
  // Add other global state properties here
}

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps>({
  state: {
    theme: "light",
    language: "en",
  },
  setState: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    theme: "light",
    language: "en",
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
