import { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";

export default function useFetchProducts(category, limit) {
  const [products, setProducts] = useState({
    loading: "",
    error: "",
    products: [],
  });

  async function fetchProducts(category, limit) {
    setProducts({ ...products, loading: true, error: false });
    let fetchedProducts = [];
    let categoryRef;
    const productsRef = database.collection("sampleData");

    // query products based on category
    if (category === "All Specials") {
      categoryRef = productsRef;
    } else {
      categoryRef = productsRef.where("category", "==", category);
    }

    const categoryRefWithLimit = categoryRef.limit(limit);

    await categoryRefWithLimit
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        setProducts({
          loading: false,
          error: false,
          products: fetchedProducts,
        });
      })
      .catch((err) => {
        setProducts({ ...products, loading: false, error: true });
        console.log(err);
      });
  }

  useEffect(() => {
    fetchProducts(category, limit);
  }, [category, limit]);

  return products;
}
