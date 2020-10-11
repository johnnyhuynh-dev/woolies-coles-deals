import { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";

export default function useFetchProducts() {
  const [products, setProducts] = useState({
    loading: "",
    error: "",
    products: [],
  });

  async function fetchProducts() {
    setProducts({ ...products, loading: true, error: false });
    let fetchedProducts = [];
    await database
      .collection("sampleData")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
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
    fetchProducts();
  }, []);

  return products;
}
