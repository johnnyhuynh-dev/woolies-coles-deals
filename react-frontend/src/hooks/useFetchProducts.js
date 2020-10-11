import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";

export default function useFetchProducts() {
  const [products, setProducts] = useState({
    loading: false,
    error: false,
    productsArray: [],
  });

  async function fetchProducts() {
    let fetchedProducts = [];
    await database
      .collection("sampleData")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((product) => {
          fetchedProducts.push(product.data());
        });
        setProducts({ ...products, productsArray: fetchedProducts });
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return products;
}
