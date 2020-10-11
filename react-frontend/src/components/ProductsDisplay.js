import React, { useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";

export default function ProductsDisplay() {
  const { loading, error, products } = useFetchProducts();

  return (
    <div>
      <pre>Data: {JSON.stringify(products, null, 4)}</pre>
      <pre>Loading: {JSON.stringify(loading, null, 4)}</pre>
      <pre>Error:{JSON.stringify(error, null, 4)}</pre>
    </div>
  );
}
