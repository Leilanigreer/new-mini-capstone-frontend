import { useLoaderData } from "react-router-dom";
import apiClient from "./config/axios";
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useState } from "react";

export function CartedProductIndex() {
  const carted_products = useLoaderData();
  const [cartItems, setCartItems] = useState(carted_products);
  
  const totalAmount = cartItems.reduce((sum, cp) => 
    sum + (cp.product.price * cp.product_quantity), 0
  );

  const handleQuantityUpdate = (id, newQuantity) => {
    apiClient.patch(`/carted_products/${id}.json`, {
      product_quantity: newQuantity
    }).then(response => {
      if (newQuantity === 0) {
        setCartItems(cartItems.filter(item => item.id !== id));
      } else {
        setCartItems(cartItems.map(item => 
          item.id === id ? response.data : item
        ));
      }
    });
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    apiClient.post("/orders.json");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <ShoppingCart className="h-6 w-6 text-green-700 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {cartItems.map(cp => (
                <div key={cp.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{cp.product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        ${cp.product.price} each
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleQuantityUpdate(cp.id, cp.product_quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        
                        <span className="text-gray-900 w-8 text-center">
                          {cp.product_quantity}
                        </span>
                        
                        <button 
                          onClick={() => handleQuantityUpdate(cp.id, cp.product_quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <p className="text-lg font-medium text-green-700">
                          ${(cp.product.price * cp.product_quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleQuantityUpdate(cp.id, 0)}
                        className="p-1 rounded-full hover:bg-red-100"
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span className="text-green-700">${totalAmount.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-green-700 text-white px-4 py-3 rounded-md 
                         hover:bg-green-800 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}