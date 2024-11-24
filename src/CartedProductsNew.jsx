import { useState } from "react";
import apiClient from "./config/axios";

export function CartedProductsNew ({ product, onAddToCart }) {
  const [productQuantity, setProductQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const params = {
      product_id: product.id, 
      product_quantity: productQuantity,
    };
    
    apiClient.post("/carted_products.json", params)
    .then((response) => {
      console.log("Product added to cart:", response.data);
      onAddToCart(response.data);
      setProductQuantity(1); // Reset quantity after successful add
    })
  };

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input
        id="quanity"
        type= "number"
        min= "1"
        value={productQuantity}
        onChange={(e) => setProductQuantity(parseInt(e.target.value))} />
      </div>
      <button type="submit">Add to Cart</button>
    </form>
  );
}