import { useLoaderData } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { useState } from "react";
import { useCart } from "./context/CartContext";
import apiClient from "./config/axios";

const Notification = ({ message }) => (
  <div className="mb-4 p-4 rounded-md bg-green-50 text-green-700 border border-green-200 flex items-center gap-2">
    <CheckCircle className="h-4 w-4" />
    <p>{message}</p>
  </div>
);

export function CartedProductIndex() {
  const initialCartItems = useLoaderData();
  const { updateCartItems, fetchCartItems } = useCart();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showNotification, setShowNotification] = useState(false);
  
  const subtotal = cartItems.reduce((sum, cp) => 
    sum + (parseFloat(cp.product.price) * cp.product_quantity), 0
  ).toFixed(2);
  
  const tax = (parseFloat(subtotal) * 0.09).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  const handleQuantityUpdate = async (cp, newQuantity) => {
    try {
      await updateCartItems(cp.product.id, newQuantity);
      if (newQuantity === 0) {
        setCartItems(cartItems.filter(item => item.id !== cp.id));
      } else {
        setCartItems(cartItems.map(item => 
          item.id === cp.id 
            ? { ...item, product_quantity: newQuantity }
            : item
        ));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post("/orders.json");
      setShowNotification(true);
      setCartItems([]);
      await fetchCartItems();
      
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {showNotification && (
        <Notification message="Order placed successfully! Check your orders page for details." />
      )}

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
                        ${parseFloat(cp.product.price).toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleQuantityUpdate(cp, cp.product_quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        
                        <span className="text-gray-900 w-8 text-center">
                          {cp.product_quantity}
                        </span>
                        
                        <button 
                          onClick={() => handleQuantityUpdate(cp, cp.product_quantity + 1)}
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
                        onClick={() => handleQuantityUpdate(cp, 0)}
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
              <div className="space-y-2">
                <div className="flex justify-between text-base text-gray-900">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-base text-gray-900">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <span>Total</span>
                  <span className="text-green-700">${totalAmount}</span>
                </div>
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