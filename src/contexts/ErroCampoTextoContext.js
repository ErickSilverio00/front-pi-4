import React, { createContext, useContext, useState } from "react";

const ErroContext = createContext();

export function useErro() {
  return useContext(ErroContext);
}

export function ErroProvider({ children }) {
  const [erroGlobal, setErroGlobal] = useState(false);

  return (
    <ErroContext.Provider value={{ erroGlobal, setErroGlobal }}>
      {children}
    </ErroContext.Provider>
  );
}
