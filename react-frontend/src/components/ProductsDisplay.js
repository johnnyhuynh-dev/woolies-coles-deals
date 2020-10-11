import React, { useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";

export default function ProductsDisplay() {
  const products = useFetchProducts();

  useEffect(() => {
    console.log(products);
  });

  return (
    <div>
      <pre>{JSON.stringify(null, 2, products)}</pre>
    </div>
  );
}
