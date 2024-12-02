import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "./context/CartContext";

export function CartedProductsNew({ product, currentQuantity = 0 }) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateCartItems } = useCart();

  const handleUpdateCart = async (newQuantity) => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      await updateCartItems(product.id, newQuantity);
    } finally {
      setIsLoading(false);
    }
  };

  return currentQuantity === 0 ? (
    <button
      onClick={() => handleUpdateCart(1)}
      disabled={isLoading}
      className="w-full bg-green-700 text-white font-medium px-4 py-2 rounded-md 
                 hover:bg-green-800 transition-colors duration-200 disabled:opacity-50"
    >
      Add
    </button>
  ) : (
    <div className="flex items-center justify-between w-full border border-gray-300 rounded-md">
      <button
        onClick={() => handleUpdateCart(currentQuantity - 1)}
        disabled={isLoading}
        className="p-2 text-green-700 hover:bg-gray-100 rounded-l-md 
                 transition-colors duration-200 disabled:opacity-50"
      >
        <Minus className="w-5 h-5" />
      </button>
      
      <span className="flex-1 text-center font-medium">
        {currentQuantity}
      </span>
      
      <button
        onClick={() => handleUpdateCart(currentQuantity + 1)}
        disabled={isLoading}
        className="p-2 text-green-700 hover:bg-gray-100 rounded-r-md 
                 transition-colors duration-200 disabled:opacity-50"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}