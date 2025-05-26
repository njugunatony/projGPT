// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { AppProvider } from "./store/AppStateContext";

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <React.StrictMode>
//     <AppProvider>
//       <App />
//     </AppProvider>
//   </React.StrictMode>
// );

// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppStateProvider } from "./store/AppStateContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
