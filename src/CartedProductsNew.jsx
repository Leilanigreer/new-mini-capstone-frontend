import { useState } from "react";
import apiClient from "./config/axios";
import { ShoppingCart } from 'lucide-react';

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
      setProductQuantity(1); 
    })
  };

  return(
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center space-x-3">
        <label 
          htmlFor="quantity"
          className="text-sm font-medium text-gray-700"
        >
          Quantity: 
        </label>
        <div className="relative flex-1">
          <input
          id="quanity"
          type= "number"
          min= "1"
          value={productQuantity}
          onChange={(e) => setProductQuantity(parseInt(e.target.value))} 
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 text-sm focus:ring-1 focus:ring-green-700 focus:border-green-700"
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-colors duration-200"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
        </button>
    </form>
  );
}