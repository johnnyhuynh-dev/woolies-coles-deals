import React, { useContext, useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import { GlobalContext } from "./ContextWrapper";

export default function ProductsDisplay() {
  const state = useContext(GlobalContext);
  const [selectedCategory] = state.categorySelectionHook;
  const { loading, error, products } = useFetchProducts(selectedCategory, 5);

  return (
    <div>
      <pre>Data: {JSON.stringify(products, null, 4)}</pre>
      <pre>Loading: {JSON.stringify(loading, null, 4)}</pre>
      <pre>Error:{JSON.stringify(error, null, 4)}</pre>
    </div>
  );
}
