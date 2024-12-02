import { useState, useEffect } from "react";
import apiClient from "./config/axios";
import { ShoppingCart, Trash2, ChevronDown } from 'lucide-react';

export function CartedProductsNew ({ product, onAddToCart, currentQuantity = 0 }) {
  const [productQuantity, setProductQuantity] = useState(currentQuantity || 1);
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    if (currentQuantity > 0) {
      apiClient.get("/carted_products.json")
        .then(response => {
          const cartItem = response.data.find(item => 
            item.product.id === product.id && item.status === "carted"
          );
          if (cartItem) {
            setCartItemId(cartItem.id);
          }
        })
        .catch(error => console.error("Error fetching cart item:", error));
    }
  }, [product.id, currentQuantity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (cartItemId) {
      apiClient.patch(`/carted_products/${cartItemId}.json`, {
        product_quantity: productQuantity
      }).then(response => {
        if (productQuantity === 0) {
          setCartItemId(null);
          setProductQuantity(1);
        }
        onAddToCart(response.data);
      });
    } else {
      apiClient.post("/carted_products.json", {
        product_id: product.id,
        product_quantity: productQuantity
      })
      .then((response) => {
        setCartItemId(response.data.id);
        onAddToCart(response.data);
      });
    }
  };

  return(
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <select
            id={`quantity-${product.id}`}
            value={productQuantity}
            onChange={(e) => setProductQuantity(parseInt(e.target.value) || 0)}
            className="block w-full text-center pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 text-sm focus:ring-1 focus:ring-green-700 focus:border-green-700 appearance-none"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <button 
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-colors duration-200"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {currentQuantity > 0 ? "Update Cart" : "Add to Cart"}
        </button>

        {currentQuantity > 0 && cartItemId && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e, 0);
            }}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove from Cart
          </button>
        )}
      </div>
    </form>
  );
}