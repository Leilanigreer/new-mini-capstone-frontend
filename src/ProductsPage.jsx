import axios from "axios"
import { useState, useEffect } from "react"
import { ProductsIndex } from "./ProductsIndex"

export function ProductsPage() {
  const [products, setProducts] = useState([]); 
  
  const handleIndex = () => {
    // console.log("handleIndex")
    axios.get("http://localhost:3000/products.json").then((response) => {
      // console.log(response.data)
      setProducts(response.data)
    })
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <h1>Welcome to React!</h1>
      < ProductsIndex products={products}/>
    </main>
  )
}