import React, { useState } from "react";

const GlobalContext = React.createContext();
export { GlobalContext };

export default function ContextWrapper({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <GlobalContext.Provider
      value={{ categorySelectionHook: [selectedCategory, setSelectedCategory] }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
