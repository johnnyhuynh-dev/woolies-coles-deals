import React from "react";

const GlobalContext = React.createContext();

export { GlobalContext };

export default function ContextWrapper({ children }) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
