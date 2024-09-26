import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductsIndex } from './ProductsIndex';
import { ProductsNew } from './ProductsNew';

export function ProductsPage() {
  const [products, setProducts] = useState([]);

  const handleIndex = () => {
    axios.get("http://localhost:3000/products.json").then((response) => {
      setProducts(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
    console.log("handleCreate");

    // Log the form data
    console.log("Form data:");
    for (let [key, value] of params.entries()) {
      console.log(key + ': ' + value);
    }

    // Convert FormData to a plain object
    const formDataObject = Object.fromEntries(params.entries());
    console.log("Form data as object:", formDataObject);

    // Uncomment the following lines when ready to send to the API
    // axios.post("http://localhost:3000/products.json", params).then((response) => {
    //   setProducts([...products, response.data]);
    //   successCallback();
    // });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate} />
      <ProductsIndex products={products} />
    </main>
  );
}