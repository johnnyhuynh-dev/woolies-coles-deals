import React from "react";
import ProductsNavigation from "./components/ProductsNavigation";
import ProductsDisplay from "./components/ProductsDisplay";

function App() {
  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>Woolies Coles Deals project</div>
      <ProductsNavigation />
      <ProductsDisplay />
    </div>
  );
}

export default App;
